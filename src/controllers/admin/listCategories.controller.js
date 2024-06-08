const db = require("../../dataBase/models");
module.exports = (req, res) => {
  
  db.category.findAll()
  .then((categories) => {
    res.render(
      "admin/listCategories",
      {
        categories,
      }
    );
  })
};