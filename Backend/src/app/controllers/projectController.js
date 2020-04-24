const express = require('express');
const Code = require('../models/code');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');


const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) =>{
    res.send({ userId: req.userId })
});

router.post('/code', async(req,res) =>{

    const { trackingCode } = req.body;

    try{
        
        if( !await User.findOne({ _id : req.userId }) )
            return res.status(400).send({ error: "User not exist"})

        if( await Code.findOne({ trackingCode }))
            return res.status(400).send({ error: "TrackingCode already exist" })

        const code = await Code.create({ ...req.body, user: req.userId });
        
        return res.send({ code })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error registering code'});
    }

});

router.get('/code', async(req,res) =>{

    try{
        const code = await Code.find({ user : req.userId });
        return res.send({ code })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading codes'});
    }
})

router.get('/code/:codeId', async(req,res) =>{
    try{
        const code = await Code.findById(req.params.codeId);
        return res.send({ code })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading code'});
    }
})

router.put('/code/:codeId', async(req,res) =>{
    
    const { name } = req.body;
    
    try{
        const code = await Code.findByIdAndUpdate(req.params.codeId, {
            name
        });
        return res.send({ code })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error editing code'});
    }
})

router.delete('/code/:codeId', async(req,res) =>{
    try{
        await Code.findByIdAndRemove(req.params.codeId);
        return res.send({ message: 'deleted' })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error deleting code'});
    }
});

module.exports = app => app.use('/projects', router);