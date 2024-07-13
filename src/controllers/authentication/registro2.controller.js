const db = require('../../dataBase/models');

module.exports = (req, res) => {
    db.user.findOne({
        order: [['id', 'DESC']] // Ordenar por ID en orden descendente
    })
    .then((u) => {
        if (!u) {
            return res.status(404).send('No se encontraron usuarios');
        }
        
        // Almacenar un valor en la sesión para indicar que se ha cargado la página
        if (!req.session.pageReloaded) {
            req.session.pageReloaded = true;
            // Redirigir a la misma página para simular una recarga
            return res.redirect(req.originalUrl);
        } else {
            // Eliminar el valor de la sesión para futuras visitas
            delete req.session.pageReloaded;
            // Renderizar la vista y pasar el objeto `user`
            res.render("authentication/registro-2", { user: u });
        }
    })
    .catch((error) => {
        console.error('Error al buscar usuario:', error);
        res.status(500).send('Error interno del servidor');
    });
};
