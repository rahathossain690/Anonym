import React from 'react';
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
            cpass: "",
            loading: false
        }
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.signin = this.signin.bind(this)
    }

    setEmail(event){
        this.setState({email: event.target.value})
    }

    setPassword(event){
        this.setState({pass: event.target.value})

    }

    signin(){
        this.setState({loading: true})
        const data = {
            email: this.state.email,
            password: this.state.pass
        } 
        fetch(BACKEND + '/signin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: "include",
            mode: "cors"
          }).then(res => res.json())
          .then(res => {
            this.setState({loading: false})
            if(res.invalid){
                this.setState({error: res.invalid})
            }
            if(res.no){
                this.setState({error: "invalid credentials"})
            }
            else{
                this.setState({loading: false})
                history.push('/')
            }
          }).catch(err => {
               this.setState({loading: false})
              this.setState({error: "Error encountered"})
          })
    }
    
    render(){
        return (
            <div className="container" style={{textAlign: "center"}}>
                <h1>Signin</h1>
                <div style={{marginLeft: "auto", marginRight: "auto"}}>
                    <div className="input-field inline">
                        <input id="email_inline" type="email" value={this.state.email} className="validate" onChange={this.setEmail}/>
                        <label htmlFor="email_inline">Email</label>
                    </div><br/>
                    <div className="input-field inline">
                        <input id="pass_inline" type="password" className="validate" value={this.state.pass} onChange={this.setPassword}/>
                        <label htmlFor="pass_inline">Password</label>
                    </div><br/>
                    <span className="btn" onClick={this.signin}>Sign in</span>
                    <br/>
                    {this.state.error && <h6 className="red-text">{this.state.error}</h6>}

                    {this.state.loading && <div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                        </div>
                    </div>}
                </div>
                
            </div>
          );
    }
}

export default Signup;