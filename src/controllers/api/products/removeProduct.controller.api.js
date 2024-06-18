const db = require("../../../dataBase/models");

module.exports = (req, res) => {
  const { id } = req.params;
  db.secondaryimage
    .destroy({
      where: {
        id,
      },
    })
    .then(() => {
      db.product
        .destroy({
          where: {
            id,
          },
        })
        .then(() => {
          res.status(200).json({
            ok: true,
            msg: "Producto eliminado con éxito",
          });
        })
        .catch((err) => {
          res.status(500).json({
            ok: false,
            msg: err.message,
          });
        });
    });
};
