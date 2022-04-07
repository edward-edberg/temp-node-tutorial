const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const uploadProductImage = async (req, res) => {
  // check if the file exist
  // check format
  // check size
  console.log(req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Uploaded Image");
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please Uploaded Image Smaller than 1KB"
    );
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  console.log(imagePath);
  await productImage.mv(imagePath);
  // res.send("upload product image");
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
