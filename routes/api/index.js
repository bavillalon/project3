const router = require("express").Router();
const bookRoutes = require("./books");
const auth = require("../auth");

// Book routes
router.use("/books", bookRoutes);
router.use('/auth', auth);

module.exports = router;
