/*global chrome*/

import React,{Component} from 'react';
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
class Login extends Component{
    constructor(props){
        super(props)
        this.presion = this.presion.bind(this);
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
                    <h3 className="text-center mb-4">Logeate</h3>
                    <form onSubmit={this.presion}>
                        <div className="form-group has-error">
                            <input className="form-control input-lg" placeholder="E-mail Address" name="email" type="text"></input>
                        </div>
                        <div className="form-group has-success">
                            <input className="form-control input-lg" placeholder="Password" name="password"  type="password"></input>
                        </div>
                        <input  className="btn btn-lg btn-primary btn-block" value="Subir" type="submit" ></input>
                    </form>
                        <a className="custom-control-description small text-dark">No tengo una cuenta</a>
                </div>
        </div>
    </div>
</div>

            
        );
    }
    presion(e){
        e.preventDefault();
        var email = e.target.email.value;
        var pass = e.target.password.value;
        alert('Se intento subir' + e.target.email.value); 
        request
        .get(`http://localhost:6200/login/${email}/${pass}`)
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
export default Login;