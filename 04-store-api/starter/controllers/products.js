const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async error");

  const products = await Product.find({}).select("name price");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  let sortList = "";
  let fieldsList = "";

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (sort) {
    sortList = sort.split(",").join(" ");
    console.log(sortList);
  }

  if (fields) {
    fieldsList = fields.split(",").join(" ");
    console.log(fieldsList);
  }

  const products = await Product.find(queryObject)
    .sort(`${sortList}`)
    .select(`${fieldsList}`);

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
