import React from 'react'
import history from '../history'

const BACKEND = "https://anonym-rahat.herokuapp.com/api"

class Signout extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        fetch(BACKEND + '/signout', {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: "include",
            mode: "cors"
          }).then(res => res.json())
          .then(res => {
              console.log(res)
              if(res.ok){
                  this.props.setUser(null);
                  history.push('/')
              }
          }).catch(err => {
              console.log(err)
          })
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default Signout;