const express = require('express');
const Category = require('../models/category')
const Client = require('../models/client')


const router = express.Router();

router.post('/category', async(req,res) =>{

    const { name } = req.body;

    try{
        
        if( await Category.findOne({ name }))
            return res.status(400).send({ error: "Category already exist" + name})

        const category = await Category.create(req.body);
        
        return res.send({ category })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Registration failed'});
    }

});

router.get('/category', async(req,res) =>{
    try{
        const category = await Category.find();
        return res.send({ category })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading categories'});
    }
})

router.get('/category/:categoryId', async(req,res) =>{
    try{
        const category = await Category.findById(req.params.categoryId);
        return res.send({ category })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading categories'});
    }
})

router.put('/category/:categoryId', async(req,res) =>{
    
    const { name } = req.body;
    
    try{
        const category = await Category.findByIdAndUpdate(req.params.categoryId, {
            name
        });
        return res.send({ category })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading categories'});
    }
})

router.delete('/category/:categoryId', async(req,res) =>{
    try{
        await Category.findByIdAndRemove(req.params.categoryId);
        return res.send({ message: 'deleted' })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading categories'});
    }
})


router.post('/client', async(req,res) =>{

    const { categoryId } = req.body;

    const validate = await Category.findOne({ categoryId })
    console.log(validate)

    try{
        
        if( !validate )
            return res.status(400).send({ error: "Category not exist" + value})

        const client = await Client.create(req.body);
        
        return res.send({ client })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Registration failed'});
    }

});

module.exports = app => app.use('', router)