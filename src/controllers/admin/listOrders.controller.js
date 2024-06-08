const db = require("../../dataBase/models");
module.exports = (req, res) => {
  
  db.order.findAll()
  .then((orders) => {
    res.render(
      "admin/listOrders",
      {
        orders,
      }
    );
  })
};