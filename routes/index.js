const { Router } = require("express");
const router = Router();
router.use("/", require("./drugs"));
module.exports = router;
