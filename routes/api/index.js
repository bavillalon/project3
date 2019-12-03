const router = require("express").Router();
const bookRoutes = require("./books");
const auth = require("../auth");
const runsheetRoutes = require("./runsheet");

// Book routes
router.use("/books", bookRoutes);
router.use('/auth', auth);
router.use("/runsheet",runsheetRoutes)

module.exports = router;
