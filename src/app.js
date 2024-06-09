// ************ Require's ************
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//const partials = require("express-partials");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");

const checkSession = require("./middlewares/checkSession");
//const checkCookie = require("./middlewares/checkCookie");
const dataLocal = require("./middlewares/validations/dataLocal");
const saveSession = require("./middlewares/saveSession");
const userId = require("./middlewares/validations/userId");

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../public"))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({ secret: "Secreto", resave: false, saveUninitialized: false })); //CRPG
//app.use(checkCookie);
app.use(saveSession);
app.use(checkSession);

app.use(dataLocal);

app.use(userId);

// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "/views"),
  path.join(__dirname, "/views/admin"),
  path.join(__dirname, "/views/autentication"),
  path.join(__dirname, "/views/cart"),
  path.join(__dirname, "/views/other"),
  path.join(__dirname, "/views/products"),
  path.join(__dirname, "/views/users"),
]); // Define la ubicación de la carpeta de las Vistas

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************

/*** RUTAS ***/
const authRouter = require("./routes/authentication.routes"); // Rutas autentication
const cartRouter = require("./routes/cart.routes");
const otherRouter = require("./routes/other.routes"); // Rutas main
const adminRouter = require("./routes/admin.routes"); // Rutas admin
const prodRouter = require("./routes/products.routes"); // Rutas products
const userRouter = require("./routes/users.routes");

/*** MIDDLEWARE ***/

const { check } = require("express-validator");

const apiOtherRoutes = require("./routes/api/other.api");
const apiProductRoutes = require("./routes/api/products.api");
const apiCategoryRoutes = require("./routes/api/category.api");
const apiAuthRoutes = require("./routes/api/authentication.api");
const apiCartRoutes = require("./routes/api/cart.api");
const apiAdminRoutes = require("./routes/api/admin.api");
const apiUserRoutes = require("./routes/api/users.api");




/* ENRUTADORES */
// Los que se visualizan en el navegador van en español
app.use("/", otherRouter);
app.use("/autenticacion", authRouter);
app.use("/carrito-compra", cartRouter);
app.use("/productos", prodRouter);
app.use("/admin", adminRouter);
app.use("/", userRouter); //revisar

// Los que interactúan con otro programador van en ingles
app.use("/api", apiOtherRoutes);
app.use("/api/authentication", apiAuthRoutes);
app.use("/api/cart", apiCartRoutes);
app.use("/api/products", apiProductRoutes);
app.use("/api/category", apiCategoryRoutes);
app.use("/api/admin", apiAdminRoutes);
app.use("/api/users", apiUserRoutes);


app.use((req, res, next) => {
  res.status(404).render("other/notFound");
});

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("other/error");
});

// ************ exports app - dont'touch ************
module.exports = app;
