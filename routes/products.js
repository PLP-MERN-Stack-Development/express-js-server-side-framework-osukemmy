const express = require("express");
const router = express.Router();

const validateProduct = require("../middleware/validateProduct");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getStats,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/stats", getStats);
router.get("/:id", getProductById);
router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
