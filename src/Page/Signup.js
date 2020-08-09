import React from 'react';
import {Link} from 'react-router-dom'
import history from '../history'

const BACKEND = "https://anonym-rahat.herokuapp.com/api"

class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: null,
            username: "",
            email: "",
            pass: "",
            cpass: ""
        }
        this.setUsername = this.setUsername.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.setCpass = this.setCpass.bind(this)
        this.signup = this.signup.bind(this)
    }

    setUsername(event){
        this.setState({username: event.target.value, error: null})
    }

    setEmail(event){
        this.setState({email: event.target.value, error: null})
    }

    setPassword(event){
        this.setState({pass: event.target.value, error: null})

    }

    setCpass(event){
        this.setState({cpass: event.target.value, error: null})
    }

    signup(){
        if(this.state.pass != this.state.cpass){
            this.setState({error: "passwords don't match"})
            return;
        }
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.pass
        } 
        console.log(JSON.stringify(data))
        fetch(BACKEND + '/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: "include",
            mode: "cors"
          }).then(res => res.json())
          .then(res => {
              console.log(res)
            if(res.invalid){
                this.setState({error: res.invalid})
            } else{
                history.push('/')
                console.log('logged in')
            }
          }).catch(err => {
              console.log(err)
              this.setState({error: "Error encountered"})
          })
    }
    
    render(){
        return (
            <div className="container" style={{textAlign: "center"}}>
                <h1>Signup</h1>
                <div style={{marginLeft: "auto", marginRight: "auto"}}>
                    <div className="input-field inline">
                        <input id="username_inline" type="email" value={this.state.username} className="validate" onChange={this.setUsername}/>
                        <label htmlFor="username_inline">Username</label>
                    </div><br/>
                    <div className="input-field inline">
                        <input id="email_inline" type="email" value={this.state.email} className="validate" onChange={this.setEmail}/>
                        <label htmlFor="email_inline">Email</label>
                    </div><br/>
                    <div className="input-field inline">
                        <input id="pass_inline" type="password" className="validate" value={this.state.pass} onChange={this.setPassword}/>
                        <label htmlFor="pass_inline">Password</label>
                    </div><br/>
                    <div className="input-field inline">
                        <input id="cpass_inline" type="password" className="validate" value={this.state.cpass} onChange={this.setCpass}/>
                        <label htmlFor="cpass_inline">Confirm password</label>
                    </div><br/>
                    <span className="btn" onClick={this.signup}>Sign up</span>
                    <br/>
                    {this.state.error && <h6 className="red-text">{this.state.error}</h6>}
                </div>
                
            </div>
          );
    }
}

export default Signup;