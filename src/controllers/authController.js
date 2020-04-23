const express = require('express');
const User = require('../models/user')
const Code = require('../models/code')


const router = express.Router();

router.post('/user', async(req,res) =>{

    const { email } = req.body;

    try{
        
        if( await User.findOne({ email }))
            return res.status(400).send({ error: "User already exist"})

        const user = await User.create(req.body);
        
        user.password = undefined;
    
        return res.send({ user })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Registration failed'});
    }

});

router.get('/user', async(req,res) =>{
    try{
        const user = await User.find();
        return res.send({ user })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading categories'});
    }
})

router.get('/user/:userId', async(req,res) =>{
    try{
        const user = await User.findById(req.params.userId);
        return res.send({ user })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading categories'});
    }
})

router.put('/user/:userId', async(req,res) =>{
    
    const { name } = req.body;
    
    try{
        const user = await User.findByIdAndUpdate(req.params.userId, {
            name
        });
        return res.send({ user })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading categories'});
    }
})

router.delete('/user/:userId', async(req,res) =>{
    try{
        await User.findByIdAndRemove(req.params.userId);
        return res.send({ message: 'deleted' })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading categories'});
    }
})


router.post('/code', async(req,res) =>{

    const { userId } = req.body;

    const validate = await User.findOne({ userId })
    console.log(validate)

    try{
        
        if( !validate )
            return res.status(400).send({ error: "User not exist" + value})

        const code = await Code.create(req.body);
        
        return res.send({ code })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Registration failed'});
    }

});

module.exports = app => app.use('', router)