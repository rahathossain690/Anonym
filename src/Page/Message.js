import React from 'react'
import {Link} from 'react-router-dom'
import history from '../history'

const BACKEND = "https://anonym-rahat.herokuapp.com/api"

class Message extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            page: 1,
            array: []
        }
        this.goBackward = this.goBackward.bind(this)
        this.goForward = this.goForward.bind(this)
        this.getMessage = this.getMessage.bind(this)
    }

    componentDidMount(){
        this.setState({loading: true})
        this.getMessage()
    }

    goForward(){
        if(this.state.array.length == 0 || this.state.loading){
            return;
        }
        this.setState({page: this.state.page + 1, loading: true}, () => this.getMessage())
    }

    goBackward(){
        if(this.state.page == 1  || this.state.loading){
            return;
        }
        this.setState({page: this.state.page - 1, loading: true}, () => this.getMessage());
    }

    getMessage(){
        console.log(BACKEND + '/message/' + this.state.page);
        fetch(BACKEND + '/message/' + this.state.page, {
            method: 'GET',
            credentials: "include",
            mode: "cors"
          }).then(res => res.json())
          .then(res => {
              if(res.ok){
                  history.push('/')
              }
              else {
                  this.setState({array: res, loading: false})
                  console.log(this.state)
              }
          }).catch(err => {
              console.log('uiuiui', err)
          })
    }

    render(){
        return (
            <div className="container"  style={{padding:"10px 10px", textAlign: "center"}}>
                <h3>Message</h3>
                <div style={{margin: "20px 20px"}}>
                    <span className="btn" onClick={this.goBackward}>&larr;</span>
                    <input style={{width: "40px", textAlign:"center", margin:"0px 10px"}} disabled value={this.state.page}/>
                    <span className="btn" onClick={this.goForward}>&rarr;</span>
                </div>
                { this.state.loading &&
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>}
                { 
                    Array.from(this.state.array).map((item) => {
                        return <div className="container red accent-2" style={{padding: "20px 20px", marginTop: "10px", borderRadius:"5px", color: "white", border: "2px solid black"}}>
                            <h6>{item.body}</h6>
                            <b>- {item.date.substring(0, 10)} {item.date.substring(11, 19)}</b>
                        </div>
                    })
                }
                { this.state.array.length == 0 &&
                    <React.Fragment>
                    <p>This page is seemingly empty!</p>
                        <div className="container red accent-4" style={{padding: "20px 20px", marginTop: "10px", borderRadius:"5px", color: "white", border: "2px solid black"}}>
                            <h6>Lots of love and affection for you! Have a nice day!</h6>
                            <b> - Anonym!</b>
                        </div>
                    </React.Fragment>
                }
                <br/>
                <Link to="/"><span className="btn">Main Page</span></Link>
            </div>
        );
    }
}

export default Message;