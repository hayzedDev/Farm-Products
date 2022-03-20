module.exports = function (tempCard, cur) {
  let output = tempCard.replace(/{%IMAGE%}/g, cur.image);
  output = output.replace(/{%PRODUCTNAME%}/g, cur.productName);
  output = output.replace(/{%QUANTITY%}/g, cur.quantity);
  output = output.replace(/{%PRICE%}/g, cur.price);
  output = output.replace(/{%ID%}/g, cur.id);
  output = output.replace(/{%FROM%}/g, cur.from);
  output = output.replace(/{%NUTRIENTS%}/g, cur.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, cur.description);
  //   console.log(output);
  if (!cur.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
