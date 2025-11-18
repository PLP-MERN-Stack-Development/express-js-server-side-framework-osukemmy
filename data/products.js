const { v4: uuidv4 } = require("uuid");

let products = [
  {
    id: uuidv4(),
    name: "Laptop",
    description: "High performance laptop",
    price: 1200,
    category: "electronics",
    inStock: true,
  }
];

module.exports = products;
