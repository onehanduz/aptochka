const { Router } = require("express");
const router = Router();
const {
  getAll,
  add,
  update,
  deleteById,
  addRender,
  editRender,
} = require("../controller/drugs");
router.get("/", getAll);
router.get("/create", addRender);
router.get("/edit/:id", editRender);
router.post("/add", add);
router.post("/update/:id", update);
router.get("/delete/:id", deleteById);

module.exports = router;
