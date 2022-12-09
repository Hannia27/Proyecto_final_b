const auxiliar = {};

auxiliar.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

auxiliar.isAdmin = (req, res, next) => {
    if (req.user.is_admin) {
        return next();
    }
    req.flash('mensajeError', 'No esta autorizado')
    res.redirect('/products')
}


module.exports = auxiliar;

