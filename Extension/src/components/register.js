/*global chrome*/

import React,{Component} from 'react';
import ReactDom from 'react-dom';
import request from 'superagent';
import {getTabs} from "../modulos/Utils";


let enviar = (user,pass) =>{
    
    request
        .get('http://localhost:6200/')
        .end(function (err, res){
            if(err){
                console.log('Error');
                
            }else{
            console.log(res);
            console.log(JSON.parse(res.text));
            let response = JSON.parse(res.text);
            
            
            //let {api} = response;
            let {api} = response;
            console.log(api);
            alert(api);
            }
        });
}
class Register extends Component{
    constructor(props){
        super(props)
        this.presion = this.presion.bind(this);
        this.state ={
            boton: false,
            respuesta: false,
            cambiar: false,
            
        }
    }

    componentDidMount(){
        

        getTabs((tabs) =>{
            console.log(tabs.lenght);
            
        });
        chrome.tabs.query({}, function(foundTabs) {
            var tabsCount = foundTabs.length;
            for(var i = 0; i< tabsCount; i++){
                var titulo = foundTabs[i].title.substr(0,13);
                console.info('Titulo: ' + foundTabs[i].title + ' Url: ' + foundTabs[i].url + ' Id: ' + foundTabs[i].id);
            }
            console.info("tabsCount = " + tabsCount);
        });
    }
    
    render(){
        return(
            
            <div className="container-fluid bg-light py-3">
    <div className="row">
        <div className="col-md-6 mx-auto">
                <div className="card card-body">
                    <h3 className="text-center mb-4">Registrate</h3>
                    <form onSubmit = {this.presion}>
                        <div className="form-group has-error">
                            <input className="form-control input-lg" placeholder="E-mail Address" name="email" type="text" required="true"></input>
                        </div>
                        <div className="form-group has-success">
                            <input className="form-control input-lg" placeholder="Password" name="password1"  type="password" required="true"></input>
                        </div>
                        <div className="form-group has-success">
                            <input className="form-control input-lg" placeholder="Confirm Password" name="password2"  type="password" required="true"></input>
                        </div>
                        <button  className="btn btn-lg btn-primary btn-block" >Subir</button>
                        <a  className="custom-control-description small text-dark">Ya tengo una cuenta</a>
                        </form>
                </div>
        </div>
    </div>
</div>

        );
    }
    presion(e){
        e.preventDefault();
        var email = e.target.email.value;
        var pass1 = e.target.password1.value;
        var pass2 = e.target.password1.value;
        alert('Se intento subir' + e.target.email.value); 
        if(pass1 == pass2){
            request
        .get(`http://localhost:6200/register/${email}/${pass1}`)
        .end(function (err, res){
            if(err){
                console.log('Error');
                
            }else{
            console.log(res);
            console.log(JSON.parse(res.text));
            let response = JSON.parse(res.text);
            
            
            //let {api} = response;
            let {status} = response;
            console.log(status);
            alert(status);
            }
        }); 
        }
              
    }
}
export default Register;