// core modules
const fs = require(`fs`);
const http = require("http");

const slugify = require("slugify");
const url = require("url");

// my own modules
const replaceTemplate = require(`${__dirname}/modules/replaceTemplate`);

// FILE

////////////////////////////

// SERVER

let tempApi, tempCard, tempProduct, tempOverview;

fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
  tempApi = JSON.parse(data);
  //   console.log(JSON.parse(tempApi));
});

fs.readFile(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
  (err, data) => {
    tempOverview = data;
    // console.log(JSON.parse(tempOverview));
  }
);

fs.readFile(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
  (err, data) => {
    tempCard = data;
    // console.log(JSON.parse(tempCard));
  }
);

fs.readFile(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
  (err, data) => {
    tempProduct = data;
    //   console.log(JSON.parse(tempProduct));
  }
);

// To be fired off everytime the server is being accessed
const server = http.createServer((req, res) => {
  //   let pathName = req.url;
  const slug = tempApi.map((cur, _) =>
    slugify(cur.productName, { lower: true })
  );
  console.log(slug);
  //   console.log(url.parse(req.url, true));
  const { pathname: pathName, query } = url.parse(req.url, true);
  //   Overview
  if (pathName === "/overview" || pathName === "/") {
    const cardsHTML = tempApi
      .map((cur, i) => {
        return replaceTemplate(tempCard, cur);
      })
      .join("");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML));

    // PRoduct page
  } else if (pathName == "/product") {
    const product = [tempApi.at(query.id)]
      .map((cur) => {
        return replaceTemplate(tempProduct, cur);
      })
      .join("");
    // console.log(product);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(product);

    // APi page
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(tempApi);

    // Not found page
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "Hello-world",
    });
    res.end(`<h1>The page could not be found</h1>`);
  }
  //   console.log(req.url);
  //   res.end("Hello from the  server!");
});
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Listening to request on port ${port}`);
});
