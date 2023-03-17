// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

//QUESTION: why is product returning the tagid and productid after i define foreignkey and otherkey

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  // foreignKey: "typeId",
  // otherKey: "productId",
  // as: "tags",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  // foreignKey: "type_Id",
  // otherKey: "object_Id",
  // as: "products",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
