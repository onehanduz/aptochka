const { Router } = require("express");
const pool = require("../config/db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let page = req.query.page || 0;
    if (page > 0) page--;
    let limit = 100;
    let offset = page * limit;
    const drugs = await pool.query("SELECT * FROM drugs LIMIT $1 OFFSET $2", [
      limit,
      offset,
    ]);
    res.status(200).json(drugs.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const drugs = await pool.query("SELECT * FROM drugs WHERE id=$1", [id]);
    res.status(200).json(drugs.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newDrugs = await pool.query(
      `
    INSERT INTO drugs(spot, name, company, price, count, date_to, given_price, companent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        req.body.spot,
        req.body.name,
        req.body.company,
        req.body.price,
        req.body.count,
        req.body.date_to,
        req.body.given_price,
        req.body.companent,
      ]
    );
    res.status(201).json(newDrugs.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oldDrugs = await pool.query("SELECT * FROM drugs WHERE id=$1", [id]);
    const updateDrugs = await pool.query(
      `
    UPDATE drugs SET spot=$1, name=$2, company=$3, price=$4, count=$5, date_to=$6, given_price=$7, companent=$8 WHERE id=$9 RETURNING *`,
      [
        req.body.spot ? req.body.spot : oldDrugs.rows[0].spot,
        req.body.name ? req.body.name : oldDrugs.rows[0].name,
        req.body.company ? req.body.company : oldDrugs.rows[0].company,
        req.body.price ? req.body.price : oldDrugs.rows[0].price,
        req.body.count ? req.body.count : oldDrugs.rows[0].count,
        req.body.date_to ? req.body.date_to : oldDrugs.rows[0].date_to,
        req.body.given_price
          ? req.body.given_price
          : oldDrugs.rows[0].given_price,
        req.body.companent ? req.body.companent : oldDrugs.rows[0].companent,
        id,
      ]
    );
    res.status(201).json(updateDrugs.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDrugs = await pool.query("DELETE FROM drugs WHERE id = $1", [
      id,
    ]);
    res.status(200).json({ massage: "DRUG DELETED" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
