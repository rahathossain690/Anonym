import React from 'react';
import './App.css';
import Nav from './Component/Nav';
import Index from './Page/Index';
import Footer from './Component/Footer';
import Signup from './Page/Signup'
import Signin from './Page/Signin'
import Signout from './Page/Signout'
import {Router, Switch, Route} from 'react-router-dom';
import history from './history'
import SendMessage from './Page/SendMessage'
import Message from './Page/Message'

const BACKEND = "https://anonym-rahat.herokuapp.com/api"

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      user: null
    }
    this.setUser = this.setUser.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  componentDidMount(){
    //this.getUser()
  }

  setUser(user){
    this.setState({user: user});
  }

  getUser(){
    fetch(BACKEND + '/', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
      credentials: "include",
      mode: "cors"
    }).then(res => res.json())
    .then(res => {
      this.setUser(res)
    }).catch(err => {
      console.log(err)
    })
  }

  render(){
    return (
      <Router history={history}>
          <Nav/>
          <Switch>
            <Route path="/Anonym/" component={() => <Index user={this.state.user} setUser={this.setUser}/>} exact></Route>
            <Route path="/Anonym/signup" component={() => <Signup setUser={this.setUser}/>}/>
            <Route path="/Anonym/signin" component={() => <Signin setUser={this.setUser}/>}/>
            <Route path="/Anonym/signout" component={() => <Signout setUser={this.setUser}/>}/>
            <Route path="/Anonym/message" component={Message}/>
            <Route path="/Anonym/:username" component={SendMessage}/>
          </Switch>
          {/* <Footer/> */}
      </Router>
    );
  }
}

export default App;
