//Se usará para crear una nueva ruta, eliminarla...
const express = require('express');
const router = express.Router();


//Note es la variable con la que voy a realizar el CRUD.
const Note = require('../models/Note');
router.get('/notes/add', (req,res) =>{
    res.render('notes/newnote');
});
router.post('/notes/newnote', async(req, res)=>{
   const {title, description} = req.body;
   const errors = [];
   if(!title){
    errors.push({text: 'Por favor inserte un titulo'});
   }
   if(!description){
    errors.push({text: 'Por favor inserte una descripción'});
   }
   if(errors.length > 0){
    res.render('notes/newnote', {
        errors,
        title,
        description 
    });
    }else {
        const newNote = new Note({title, description});
        await newNote.save();
        res.redirect('/notes');
        }
});
router.get('/notes', async(req, res) => {
    const notes = await Note.find().lean().sort({date: 'desc'}); //.sort({}) -> Organiza las notas de manera descendente
    res.render('notes/all-notes', {notes});
});

module.exports = router;
