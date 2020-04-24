const express = require('express');
const authMiddleware = require('../middlewares/auth');


const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) =>{
    res.send({ userId: req.userId })
});

router.post('/code', async(req,res) =>{

    const { user } = req.body;

    const validate = await User.findOne({ user })
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

router.get('/code', async(req,res) =>{
    try{
        const code = await Code.find();
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
        return res.status(400).send({ error: 'Error loading codes'});
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
        return res.status(400).send({ error: 'Error loading codes'});
    }
})

router.delete('/code/:codeId', async(req,res) =>{
    try{
        await Code.findByIdAndRemove(req.params.codeId);
        return res.send({ message: 'deleted' })
    
    } catch(err){
        console.log(err)
        return res.status(400).send({ error: 'Error loading codes'});
    }
});

module.exports = app => app.use('/projects', router);