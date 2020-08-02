'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs'); 
var jwt = require('../services/jwt');

/* app.get('/', (req, res)=>{

    res.status(200).send({
        message: 'hola mundo'
    });

}); */

function home(req, res){
    res.status(200).send({
        message:'hola mundo'
    });
}
function prueba(req, res){
    res.status(200).send({
        message:'pruebas'
    });
}

function saveUser(req, res){
    var params = req.body;
    var user = new User();

    console.log(''+params.name + params.surname + params.nick+ params.email + params.password);

    if(params.name && params.surname && params.nick && params.email && params.password){

        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.find(
            {$or: [
                {email:user.email.toLowerCase()},
                {nick:user.nick.toLowerCase()}
            ]}
        ).exec( (err, users) =>{
            if(err) return res.status(500).send({message: 'Error en la peticion'});

            if(users && users.length >=1 ) 
                 return res.status(200).send({message: 'El usuario ya existe'});
            else  //if don´t exits register usr
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
        
                    user.save((err, userStored) => {
                    
                        if(err) return res.status(500).send({message:'Error al guardar el usuario'});
                    
                        if(userStored)
                            res.status(200).send({user:userStored});
                        else
                            res.status(404).send({message:'No se ha registrado el usuario'});
        
                    });
                });
        });
    }else
        res.status(200).send({
            message: 'Es necesario enviar todos los datos'
        });

}

function loginUser(req, res){

    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email:email}, (err, user)=>{


        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(user)
            bcrypt.compare(password, user.password, (err, check)=>{
                if(check){

                    if(params.gettoken){
                        return res.status(200).send({token: jwt.crearToken(user) });
                    }else{
                        user.password = undefined;
                        return res.status(200).send({user});
                    }
                }else
                    return res.status(404).sen({message:'El usuario no se ha podido identificar'});
            });

    });

}


module.exports = {
    prueba,
    
    home, 
    saveUser,
    loginUser,

}