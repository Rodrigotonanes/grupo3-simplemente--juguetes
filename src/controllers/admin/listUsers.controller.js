const db = require("../../dataBase/models");
module.exports = (req, res) => {
  
  db.user.findAll()
  .then((users) => {
    res.render(
      "admin/listUsers",
      {
        users,
      }
    );
  })
};