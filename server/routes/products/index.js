const express = require("express");
const router = express.Router();
const {
  postProduct,
  getProducts,
  modifyProduct,
  deleteProduct,
  getActiveProducts
} = require("./controller");
const checkToken = require("../../middleware/check-token");

router
  .route("/")
  .post(checkToken, postProduct)
  .get(checkToken, getProducts);

router
  .route("/:productId")
  .patch(checkToken, modifyProduct)
  .delete(checkToken, deleteProduct);

router.route("/active").get(getActiveProducts);

module.exports = router;
