const express = require('express');

const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const app = express();

// Get


app.get('/usuario', (req, res) => {
    // res.json('Get Usuario');
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);
    Usuario.find({ stado: true }, 'nombre,email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            }

            Usuario.count({ stado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            })

        });



});


//post
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        //usuarioDB.password = null;


        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});


//put



app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'email', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            usuario: usuarioDB

        });
    });

});



//delete
app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {

            stado: false
        }
        //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        };

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            });

        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })


});

module.exports = app;