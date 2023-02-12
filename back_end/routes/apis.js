var express = require('express');
const dbmodel = require('../config/model');
var router = express.Router();

router.get('/menu',async (req,res)=>{
    const data = await dbmodel.getMenus();
    res.send(data)
})
router.delete('/menu',async (req,res)=>{
    res.send(await dbmodel.deleteMenu(req.query.key))
})
router.patch('/menu',async(req,res)=>{
    res.send(await dbmodel.updateMenu(req.query.key,req.body.pagepermission))
})
router.get('/role',async(req,res)=>{
    const data = await dbmodel.getRoles();
    res.send(data)
})
router.delete('/role/:id',async(req,res)=>{
    res.send(await dbmodel.deleteRole(req.params.id))
})
router.patch('/role/:id',async(req,res)=>{
    res.send(await dbmodel.updateRole(req.params.id,req.body))
})

router.get('/user',async(req,res)=>{
    if(req.query){
        res.send(await dbmodel.checkUser(req.query))
    }else{
        const data = await dbmodel.getUsers();
        res.send(data)
    }
})
router.delete('/user/:id',async(req,res)=>{
    res.send(await dbmodel.deleteUser(req.params.id))
})
router.patch('/user/:id',async(req,res)=>{
    res.send(await dbmodel.updateUser(req.params.id,req.body))
})
router.post('/user',async(req,res)=>{
    res.send(await dbmodel.addUser(req.body))
})
router.get('/region',async(req,res)=>{
    res.send(await dbmodel.getRegions());
})

module.exports = router