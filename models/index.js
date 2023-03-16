// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "myFooId",
  onDelete: "CASCADE",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "myFooId",
  onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Product.belongToMany(ProductTag, {
  foreignKey: "productTag_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongToMany(ProductTag, {
  foreignKey: "product_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
