const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: "No product with that id found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      res.status(404).json({ message: "No product with that id found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Delete all the child products
    // do we want these to be set to null instead?
    await ProductTag.destroy({
      where: {
        product_id: req.params.id,
      },
    });

    // Delete the product
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(product);
    if (!product) {
      res.status(404).json({ message: "no product with that id found" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
