//Se usará para crear una nueva ruta, eliminarla...
const express = require('express');
const router = express.Router();


//Note es la variable con la que voy a realizar el CRUD.
const Product = require('../models/Product');
router.get('/products/add', (req,res) =>{
    res.render('products/newproduct');
});
router.post('/products/newproduct', async(req, res)=>{
   const {name, description, category, composition} = req.body;
   const errors = [];
   if(!name){
    errors.push({text: 'Nombre del producto'});
   }
   if(!description){
    errors.push({text: 'Descripción del producto'});
   }
   if(!category){
    errors.push({text: 'Categoria del producto'});
   }
   if(!composition){
    errors.push({text: 'Composición del producto'});
   }
   if(errors.length > 0){
    res.render('products/newproduct', {
        errors,
        name,
        description,
        category,
        composition
    });
    }else {
        const newproduct = new Product({name, description,category, composition});
        await newproduct.save();
        req.flash('success_msg', 'Producto agregado.');
        res.redirect('/products');
        }
});
router.get('/products', async(req, res) => {
    const products = await Product.find().lean().sort({date: 'desc'}); //.sort({}) -> Organiza las notas de manera descendente
    res.render('products/all-products', {products});
});

router.get('/products/edit/:id', async(req, res) => {
    const product = await Product.findById(req.params.id).lean();
    res.render('products/edit-products', {product});
});

router.put('/products/edit-products/:id', async(req, res) => {
    const {name, description, category, composition} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {name, description, category,composition}).lean();
    req.flash('success_msg', 'Producto actualizado.');
    res.redirect('/products')
});

router.delete('/products/delete/:id', async(req, res)=>{
    await Product.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Producto eliminado.');
    res.redirect('/products');
});

router.get('/products/users-products', async(req, res) => {
    const products = await Product.find().lean().sort({date: 'desc'}); //.sort({}) -> Organiza las notas de manera descendente
    res.render('products/users-products', {products});
});

module.exports = router;
