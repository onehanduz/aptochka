const { Router } = require("express");
const pool = require("../config/db");
const router = Router();

router.get("/spot", async (req, res) => {
  try {
    let page = req.query.page || 0;
    if (page > 0) page--;
    let limit = 1000;
    let offset = page * limit;
    const byId = await pool.query(
      "SELECT * FROM drugs ORDER BY spot OFFSET $1 LIMIT $2",
      [offset, limit]
    );
    res.status(200).json(byId.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/dspot", async (req, res) => {
  try {
    let page = req.query.page || 0;
    if (page > 0) page--;
    let limit = 1000;
    let offset = page * limit;
    const dspot = await pool.query(
      "SELECT * FROM drugs ORDER BY spot DESC OFFSET $1 LIMIT $2",
      [offset, limit]
    );
    res.status(200).json(dspot.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/date", async (req, res) => {
  try {
    let page = req.query.page || 0;
    if (page > 0) page--;
    let limit = 1000;
    let offset = page * limit;
    const date = await pool.query(
      "SELECT * FROM drugs ORDER BY date_to OFFSET $1 LIMIT $2",
      [offset, limit]
    );
    res.status(200).json(date.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/ddate", async (req, res) => {
  try {
    let page = req.query.page || 0;
    if (page > 0) page--;
    let limit = 1000;
    let offset = page * limit;
    const ddate = await pool.query(
      "SELECT * FROM drugs ORDER BY date_to DESC OFFSET $1 LIMIT $2",
      [offset, limit]
    );
    res.status(200).json(ddate.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
