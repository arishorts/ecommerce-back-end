const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.json({ message: "Wrong route!" });
});

module.exports = router;
