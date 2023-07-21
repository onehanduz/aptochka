const pool = require("../config/db");

const getAll = async (req, res) => {
  try {
    let queryOrder = "SELECT * FROM drugs ORDER BY id";
    let orderType = req.query.order;
    if (orderType == "spot") {
      queryOrder = "SELECT * FROM drugs ORDER BY spot";
    }
    if (orderType == "dspot") {
      queryOrder = "SELECT * FROM drugs ORDER BY spot DESC";
    }
    if (orderType == "date") {
      queryOrder = "SELECT * FROM drugs ORDER BY date_to";
    }
    if (orderType == "ddate") {
      queryOrder = "SELECT * FROM drugs ORDER BY date_to DESC";
    }
    const drugs = await pool.query(queryOrder);
    res.render("main", { jami: drugs.rowCount, drugs: drugs.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addRender = (req, res) => {
  res.render("create", { drug: null, action: "/add" });
};

const editRender = async (req, res) => {
  const { id } = req.params;
  res.render("create", { action: `/update/${id}` });
};

const add = async (req, res) => {
  try {
    const newDrugs = await pool.query(
      `
      INSERT INTO drugs(spot, name, company, price, count, date_to, given_price, companent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
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
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const oldDrugs = await pool.query("SELECT * FROM drugs WHERE id=$1", [id]);
    const updateDrugs = await pool.query(
      `
      UPDATE drugs SET spot=$1, name=$2, company=$3, price=$4, count=$5, date_to=$6, given_price=$7, companent=$8 WHERE id=$9`,
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
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDrugs = await pool.query("DELETE FROM drugs WHERE id = $1", [
      id,
    ]);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAll,
  add,
  update,
  addRender,
  deleteById,
  editRender,
};
