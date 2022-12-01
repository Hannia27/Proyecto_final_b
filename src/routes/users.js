//Autenticación de los usuarios.
//Podemo registrar y autenticarlos.
const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

module.exports = router;

