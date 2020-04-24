const express = require('express');
const User = require('../models/user');
const Code = require('../models/code');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');


const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign( params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/user', async(req,res) =>{

    const { email } = req.body;

    try{
        
        if( await User.findOne({ email }))
            return res.status(400).send({ error: "User already exist"})

        const user = await User.create(req.body);
        
        user.password = undefined;
    
        return res.send({ user, token:generateToken({ id: user.id }) })
    
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
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'User not found'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password'});

    user.password = undefined;

    res.send({ user, token: generateToken({ id: user.id }), });
})

module.exports = app => app.use('', router)