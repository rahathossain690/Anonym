import React from 'react';
import Sad from '../sad.jpg'
import {Link} from 'react-router-dom'

const BACKEND = "https://anonym-rahat.herokuapp.com/api"

class Send extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            char : 0,
            exists: true,
            sent: false,
            body: "",
            error: null
        }
        this.setBody = this.setBody.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount(){
        fetch(BACKEND + '/' + this.props.match.params.username + '/exists', {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: "include",
            mode: "cors"
          }).then(res => res.json())
          .then(res => {
              this.setState({exists: res.exists})
          }).catch(err => {
            console.log(err)
          })
    }

    setBody(event){
        if(event.target.value.length > 200){
            event.target.value = event.target.value.substring(0, 200);
        }
        this.setState({char: event.target.value.length, body: event.target.value, sent: false, error: null})
    }

    sendMessage(){
        const data = {
            body: this.state.body
        } 
        this.setState({sent: true, body: ""})
        fetch(BACKEND + '/' + this.props.match.params.username + '/message', {
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
              if(res.ok){
                  this.setState({sent: true, body: ""})
              } if(res.invalid) {
                  this.setState({error: res.invalid})
              }
          }).catch(err => {
            this.setState({error: "error encountered"})
          })
    }

    render(){
        return (
            <div className="container" style={{padding:"10px 10px", textAlign: "center"}}>
            { this.state.exists &&
                <div>
                    <h3>Send message to {this.props.match.params.username}</h3>
                    <i>{this.state.char}/200</i>
                    <textarea placeholder="write something" value={this.state.body} style={{height: "200px",margin: "10px 10px", padding: "20px 20px"}} onChange={this.setBody}></textarea>
            <span className="btn" onClick={this.sendMessage}>{this.state.sent? "send again?" : "send"}</span><br/>
                    {this.state.error && <b className="red-text">{this.state.error}</b>}
                    <br/>
                    <h6>Let's take a moment and appreciate our near and dear ones.</h6><br/>
                </div>
            }{!this.state.exists &&
                <div> 
                    <h3>Anonym is sad</h3>
                    <img src={Sad} style={{width: "80%"}}></img>
                    <h6>This page doesn't exist or the owner is not expecting any message now!</h6>
                </div>
            }
                <br/>
                <Link to="/"><span className="btn">Goto home Page</span></Link>
            </div>
        );
    }
}

export default Send;