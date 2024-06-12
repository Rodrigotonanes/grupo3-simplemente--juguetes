// const jwt = require("jsonwebtoken");
// const jwtKeys = require("../controllers/utils/jwtKeys");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization;
//   console.log(`token ${token}`)
//   if (!token) {
//     /*return res.status(401).json({ message: "Acceso no autorizado. Token no proporcionado." });*/
//     return res.status(401).send("Acceso no autorizado");
//   }

//   try {
//     const decoded = jwt.verify(token, jwtKeys.key);
//     console.log(`decoded ${decoded}`)
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     /* return res.status(401).json({ message: "Acceso no autorizado. Token inválido." });*/
//     return res.status(403).send("Token inválido");
//   }
// };

const jwt = require("jsonwebtoken");
const jwtKeys = require("../controllers/utils/jwtKeys");

const jwtAuthentication = (req, res, next) => {
  //const token = req.headers.authorization;
  //const token = req.cookies.jwtToken;
  const token = req.cookies.userLogin || req.headers.authorization;
  console.log(`token ${token}`)
  if (!token) {
    /*return res.status(401).json({ message: "Acceso no autorizado. Token no proporcionado." });*/
    return res.status(401).send("Acceso no autorizado");
  }

  try {
    const decoded = jwt.verify(token, jwtKeys.key);
    console.log(`decoded ${decoded}`)
    req.userData = decoded;
    next();
  } catch (error) {
    /* return res.status(401).json({ message: "Acceso no autorizado. Token inválido." });*/
    return res.status(403).send("Token inválido");
  }
}
  module.exports = {jwtAuthentication};