const express = require("express");
const path = require("path");
const app = express();
const port = 3030;

/*CONFIGS*/
app.set("view engine","ejs");
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/users'),
    path.join(__dirname, 'views/products')
]);

/* MIDDLEWARE */
app.use(express.static('public'));

/* ROUTERS */
const otherRoutes = require("./routes/other.routes");
const authRoutes = require("./routes/authentication.routes");
const cartRoutes = require("./routes/cart.routes");
const prodRoutes = require("./routes/products.routes");

/* ROUTES */
app.use("/",otherRoutes);
app.use("/",authRoutes);
app.use("/",cartRoutes);
app.use("/",prodRoutes);
app.use("/",otherRoutes);

/* EXTENSIONES
carrito
detalle
login
registro
registro-segunda-parte
registro-tercera-parte
registro-producto
*/

/* SERVER */
app.listen(port,()=>{console.log(`http://localhost:${port}`)})
