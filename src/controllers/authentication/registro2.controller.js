const db = require('../../dataBase/models');

module.exports = (req, res) => {
    db.user.findOne({
        order: [['id', 'DESC']] // Ordenar por ID en orden descendente
    })
    .then((u) => {
        if (!u) {
            return res.status(404).send('No se encontraron usuarios');
        }
        
        // Renderizar la vista y pasar el objeto `user`
        res.render("authentication/registro-2", { user: u });
    })
    .catch((error) => {
        console.error('Error al buscar usuario:', error);
        res.status(500).send('Error interno del servidor');
    });

};
