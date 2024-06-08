// const { loadData } = require("../../dataBase");
const db = require('../../dataBase/models')
module.exports = (req, res) => {
  const { id } = req.params;
  // const users = loadData("usuarios");
  // const loadProvince = loadData("province");
  // const userFind = users.find((u) => u.id === +id);

const userPromise = db.user.findByPk(id);
const provincePromise = db.province.findAll();
const rolePromise = db.role.findAll();

Promise.all([userPromise, provincePromise, rolePromise]).then(
  ([user, province, role]) => {
    res.render("profile", {
      user,
      province,
      role,
      userId:id      
    });
  }
);



//   db.user.findByPk(id)

// .then((u)=>{
//   res.render("profile", {
//     user: u,
//     province: u.province,
//     userId: id,
//   });

// })
};
