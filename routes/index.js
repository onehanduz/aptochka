const { Router } = require("express");
const router = Router();
router.use("/drugs", require("./drugs"));
router.use("/order", require("./order"));
router.use("/search", require("./search"));
module.exports = router;
