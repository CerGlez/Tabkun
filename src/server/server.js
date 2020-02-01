import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack.config';

const { Client } = require('pg');
let mysql = require('mysql');
let body_parser = require('body-parser');


const DATABASE_URL = 'postgres://apmuokmqoigcpp:56ba0b6ccb7764b261a3ef1b36e0ed59ebc03e034fca7eca8363b97c78f53d78@ec2-54-83-204-230.compute-1.amazonaws.com:5432/d1382stjqggrv3';
const client = new Client({
    connectionString: DATABASE_URL,
    ssl: true
});
if(client){
    console.log('si existe conexion');
    
}
//process.env.DATABASE_URL,
//Declaracion de valores para conexion
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tabkun'
});
client.connect();

//Funciones para consultas
function login(name,pass){
    return new Promise((resolve, reject)=> {
        client.query("SELECT email,password FROM users WHERE email = '" + name + "' AND password = '" + pass + "'", (err, res) => {
            if (err){
                console.log(`Ocurrio el siguiente error: ${err}`);
                resolve(false);
            }else{
                console.log('Query creada');
                //console.log(res.rows.email);
                resolve(true);
            }
        });
    })
}
function register(name,pass){
    let estado = false;
    return new Promise((resolve,reject) => {
    client.query("SELECT email FROM users WHERE email != '" + name + "'", (err, res) => {
        if (err){
            console.log(`Ocurrio el siguiente error: ${err}`);
            resolve(false);
            
        }else{
            console.log('Query creada');
            resolve(crearU(name,pass));
            
        }
      });
    })
}
function crearU(name,pass){
        return new Promise((resolve,reject) =>{
            client.query("insert into users(email,password) values ('"+ name +"','"+ pass +"');", (err, res) => {
                if (err){
                    console.log(`Ocurrio el siguiente error: ${err}`);
                    resolve(false);
                    
                }else{
                    console.log('Sub Query creada');
                    resolve(true);
                    
                }
        });
})
}
function eliminarColl(user,coll){
    return new Promise((resolve,reject)=>{
        client.query("delete from collections WHERE usuario = '"+user+"'AND nombre = '"+coll+"'", (err, res) => {
            if (err){
                console.log(`Ocurrio el siguiente error: ${err}`);
                resolve(false);
                
            }else{
                console.log('Query creada');
                resolve(true);
                
            }
    });
})
}
function agregarColl(user,coll){
    return new Promise((resolve,reject)=>{
        client.query("INSERT INTO collections(nombre,id,usuario) values('"+coll+"',NUL,'"+user+"') WHERE nombre != '"+coll+"'", (err, res) => {
            if (err){
                console.log(`Ocurrio el siguiente error: ${err}`);
                resolve(false);
                
            }else{
                console.log('Query creada');
                resolve(true);
                
            }
    });
})
}
function agregarTab(user,coll,tab){
    return new Promise((resolve,reject)=>{
        client.query("INSERT INTO tabs(id_tab,url,title,tag,nombre_collection) values('"+user+"','"+tab.url+"','"+NULL+"','"+coll+"') WHERE title != '"+tab.title+"'", (err, res) => {
            if (err){
                console.log(`Ocurrio el siguiente error: ${err}`);
                resolve(false);
                
            }else{
                console.log('Query creada');
                resolve(true);
                
            }
    });
})
}
function eliminarTab(tab){
    return new Promise((resolve,reject)=>{
        client.query("delete form tabs WHERE title != '"+tab.title+"'", (err, res) => {
            if (err){
                console.log(`Ocurrio el siguiente error: ${err}`);
                resolve(false);
                
            }else{
                console.log('Query creada');
                resolve(true);
            }
    });
})
}
//Supuesta tabla
var user = {
    email : ["jose@ucol.mx","aherrera11@ucol.mx"],
    password: ["ejemplo","1234"],
    collections: [{
        deportes: ['google.com',"facebook.com","twiter.com"],
        tecnologia: ['w3school.com','hackingjs.io']
    },
    {
        botanica: ['jardin.com',"plantitas.com","arboles.com"],
        noticias: ['afnomedios.com','elnoticiero.io']
    }]
};
//
//Inicio de App
let app = express();

//Routers
app.get('/', (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('***Principal page');
    res.json({api: 'funciona'});
});
app.get('/create/:name', (req,res) =>{
    console.log('****Llegaron los datos')
    console.log(req.params.name);
    
    var name = req.params.name;
    if(name != user.email[0]){
        res.json({status: true});
    }else{
        res.json({status: false});
    }
    //var password = req.body.password;
    user.email[user.email.length + 1] = name;
    
});
app.get('/login/:name/:pass',async (req,res) =>{
    let name = req.params.name;
    let pass = req.params.pass;
    console.log(`esto llego: ${name} ${pass}`);
    
    let resultado = await login(name,pass);
    if(resultado == true){
        res.json({status: true});
    }else{
        res.json({status: false});
    }
});
app.get('/register/:name/:pass',async(req,res) =>{
    var b=false;
        let name = req.params.name;
        let pass = req.params.pass;
        b = await register(name,pass);
        res.json({status:b});
});
app.get('/:user/delete/:collection',async(req,resp) => {
    let usuario = req.params.user;
    let colection = req.params.colection;
    let b;
    b = await eliminarColl(usuario,colection);
    res.json({status: b});
});
app.get('/:user/create/:collection', async(req,resp) => {
    let usuario = req.params.user;
    let colection = req.params.colection;
    let b ;
    b = await agregarColl(usuario,colection);
    res.json({status: b});
});
app.get('/new/table/clasification', async(req,res) => {
    crearClas();
    res.send('Se accedio');
});
app.get('/window/change/:tab', async(req,res) =>{
    res.json({result: true});
});
app.get('/:user/add/:collection/:tab',async(req,resp) => {
    let usuario = req.params.user;
    let colection = req.params.colection;
    let pestana = req.params.tab;
    let b ;
    b = await agregarTab(usuario,colection,pestana);
    res.json({status: b});
});
app.get('/delete/:tab',async(req,resp) => {
    let pestana = req.params.tab;
    let b ;
    b = await agregarTab(usuario,colection,pestana);
    res.json({status: b});
});

//Middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

//Asignacion de puertos
app.set('port',process.env.PORT || 6200);


//Listen
app.listen(app.get('port'),() =>{
    console.log('Server port', app.get('port'));
});



