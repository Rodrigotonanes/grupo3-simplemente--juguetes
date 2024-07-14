const db = require('../../dataBase/models');
const { validationResult } = require("express-validator");
const bc = require('bcryptjs');

module.exports = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        // Extraer datos del formulario
        const { userName, name, email, password, province, locality, postal, street, streetNumber, floor, betweenSt1, betweenSt2, phoneNumber, indications } = req.body;
        
        // Crear nuevo usuario en la base de datos
        db.user.create({
            userName: userName.trim(),
            name: name ? name.trim() : null,
            email: email.trim(),
            password: bc.hashSync(password.trim(), 10),
            province: province ? +province : null,
            locality: locality ? locality.trim() : null,
            postal: postal ? +postal : null,
            street: street ? street.trim() : null,
            streetNumber: streetNumber ? +streetNumber : null,
            floor: floor ? +floor : null,
            betweenSt1: betweenSt1 ? betweenSt1.trim() : null,
            betweenSt2: betweenSt2 ? betweenSt2.trim() : null,
            phoneNumber: phoneNumber ? +phoneNumber : null,
            indications: indications ? indications.trim() : null,
            userPicture: req.files.userPicture?.length ? req.files.userPicture[0]?.filename : "default.png",
            role: 1
        })
        .then(() => {
            // Redirigir después de un registro exitoso
            res.redirect("/autenticacion/registro-completado");
        })
        .catch(error => {
            // Manejo de errores en la base de datos
            console.error(error);
            res.render("./authentication/errorAuth", {
                message: "Error al registrar el usuario. Por favor, intente nuevamente.",
                boton: "Intente nuevamente",
                redireccion: "/autenticacion/registro"
            });
        });
    } else {
        // Mapeo de errores y datos anteriores del formulario
        const mapeoErroes = errors.mapped();
        const old = req.body;

        // Renderizar vista con errores y datos anteriores
        res.render("./authentication/registro", {
            errors: mapeoErroes,
            old: old,
        });
    }
};
