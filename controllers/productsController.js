const { v4: uuidv4 } = require("uuid");
let products = require("../data/products");
const NotFoundError = require("../errors/NotFoundError");

// GET ALL PRODUCTS + FILTER + PAGINATION
exports.getProducts = (req, res) => {
  let result = [...products];

  // Filter by category
  if (req.query.category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = page * limit;

  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginated,
  });
};

// GET PRODUCT BY ID
exports.getProductById = (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) return next(new NotFoundError("Product not found"));

  res.json(product);
};

// SEARCH PRODUCTS BY NAME
exports.searchProducts = (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const result = products.filter((p) =>
    p.name.toLowerCase().includes(q)
  );

  res.json(result);
};

// CREATE PRODUCT
exports.createProduct = (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// UPDATE PRODUCT
exports.updateProduct = (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) return next(new NotFoundError("Product not found"));

  products[index] = {
    ...products[index],
    ...req.body,
  };

  res.json(products[index]);
};

// DELETE PRODUCT
exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) return next(new NotFoundError("Product not found"));

  products.splice(index, 1);

  res.json({ message: "Product deleted successfully" });
};

// GET STATS (COUNT BY CATEGORY)
exports.getStats = (req, res) => {
  const stats = {};

  products.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json(stats);
};
