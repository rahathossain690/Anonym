import React from 'react';
import {Link} from 'react-router-dom'
// import {createHashHistory} from 'history'

// TODO add site name
const site_url = "https://rahathossain690.github.io/Anonym/"
const BACKEND = "https://anonym-rahat.herokuapp.com/api"

class IndexComponent extends React.Component{
  constructor(props){
    super(props); 
    let user = {
      username: null,
      email: null,
      date_of_creation: null,
      is_active: null,
      total_message: null
    }
    this.state = {
      sharable_url : site_url + user.username,
      facebook_share_url : "https://www.facebook.com/sharer.php?u=" + site_url + user.username,
      twitter_share_url : "https://twitter.com/share?url=" + site_url + user.username,
      linkedin_share_url : "https://www.linkedin.com/shareArticle?mini=true&amp;url=" + site_url + user.username,
      whatsapp_share_url : "https://api.whatsapp.com/send?text=" + site_url + user.username, 
      mail_share_url : "mailto:?&amp;body=" + site_url + user.username,
      username: user.username,
      email: user.email,
      date_of_creation: user.date_of_creation,
      is_active: user.is_active,
      total_message: user.total_message,
      loading: true
    }
    this.toogle_active = this.toogle_active.bind(this)
  }

  componentDidMount(){
    let user = {
      username: null,
      email: null,
      date_of_creation: null,
      is_active: null,
      total_message: null
    }
    fetch(BACKEND + '/', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
      credentials: "include",
      mode: "cors"
    }).then(res => res.json())
    .then(res => {
      this.setState({
        sharable_url : site_url + res.username,
        facebook_share_url : "https://www.facebook.com/sharer.php?u=" + site_url + res.username,
        twitter_share_url : "https://twitter.com/share?url=" + site_url + res.username,
        linkedin_share_url : "https://www.linkedin.com/shareArticle?mini=true&amp;url=" + site_url + res.username,
        whatsapp_share_url : "https://api.whatsapp.com/send?text=" + site_url + res.username, 
        mail_share_url : "mailto:?&amp;body=" + site_url + res.username,
        username: res.username,
        email: res.email,
        date_of_creation: res.date_of_creation.substring(0, 10),
        is_active: res.is_active,
        total_message: res.total_message,
        loading: false
      })
    }).catch(err => {
      this.setState({loading: false})
      console.log(err)
    })
  }

  toogle_active = () => {
    fetch(BACKEND + '/toggle', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
      credentials: "include",
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      if(res.ok){
        this.setState({is_active: !this.state.is_active})
      } else {
        this.setState({is_active: this.state.is_active})
      }
    })
  }

  render(){
    return(
          <div>
            {!this.state.username && 
                  <div className="container" style={{textAlign: "center"}}> 
                <h1>Anonym</h1>
                <img src="https://img.icons8.com/dusk/64/000000/like-message.png" alt="Anonym"/>
                <h4>Safe, Secure, Special</h4>
                <h6><Link to="/signin"><span className="btn waves-effect waves-light">Signin</span></Link> or <Link to="/signup"><span className="waves-effect waves-light btn">Signup</span></Link><br/><br/> Give it a try!</h6>


                {this.state.loading === true && <div className="preloader-wrapper active">
                  <div className="spinner-layer spinner-red-only">
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
          } { this.state.username && 
                <div className="container" style={{textAlign: "center"}}> 
                <h3>{this.state.username}</h3>


                <div className="container" style={{alignSelf: "center", alignContent:"center", textAlign: "center", padding: "10px 10px"}}>
                  <blockquote><pre><code style={{backgroundColor: "#2d2d2d", color: "white", padding: "10px 10px"}}>{this.state.sharable_url}</code></pre></blockquote>
                  <h6 style={{textAlign: "center"}}>Share Link</h6><br/>
                  <a className="share-btn pinterest" onClick={() => navigator.clipboard.writeText(this.state.sharable_url)}>Copy</a>
                  <a className="share-btn facebook" href={this.state.facebook_share_url} target="_blank" rel="noopener noreferrer" data-placement="top" data-title="Facebook" data-toggle="tooltip" title="" data-original-title="Facebook">Facebook</a>
                  <a className="share-btn twitter" href={this.state.twitter_share_url} target="_blank" rel="noopener noreferrer" data-placement="top" data-title="Twitter" data-toggle="tooltip" title="" data-original-title="Twitter">Twitter</a>
                  <a className="share-btn linkedin" href={this.state.linkedin_share_url} target="_blank" rel="noopener noreferrer" data-placement="top" data-title="LinkedIn" data-toggle="tooltip" title="" data-original-title="LinkedIn">LinkedIn</a>
                  {/* <a className="share-btn reddit"  href="https://reddit.com/submit?url={{share_link}}" target="_blank" rel="noopener noreferrer" data-placement="top" data-title="Reddit" data-toggle="tooltip" title="" data-original-title="Reddit">Reddit</a> */}
                  <a className="share-btn whatsapp" href={this.state.whatsapp_share_url} target="_blank" rel="noopener noreferrer" data-placement="top" data-title="Whatsapp" data-toggle="tooltip" title="" data-original-title="Whatsapp">Whatsapp</a>
                  {/* <a className="share-btn stumbleupon" href="https://www.tumblr.com/share/link?url={{share_link}}" target="_blank" rel="noopener noreferrer" data-placement="top" data-title="Tumblr" data-toggle="tooltip" title="" data-original-title="Tumblr">Tumblr</a> */}
                  {/* <a className="share-btn pinterest" href="https://pinterest.com/pin/create/button/?url={{share_link}}" target="_blank" rel="noopener noreferrer" data-placement="top" data-title="Pinterest" data-toggle="tooltip" title="" data-original-title="Pinterest">Pinterest</a> */}
                  {/* <a className="share-btn facebook" href="https://vk.com/share.php?url={{share_link}}" target="_blank" rel="noopener noreferrer" data-placement="top" data-title="Vk" data-toggle="tooltip" title="" data-original-title="Vk">Vk</a> */}
                  <a className="share-btn email" href={this.state.mail_share_url} target="_self">Email</a>
              </div>
              <br/>

                <div className="switch">
                  <label>
                    Get message
                    {this.state.is_active? <input type="checkbox" checked onChange={this.toogle_active}/>: <input type="checkbox" onChange={this.toogle_active}/>}
                    <span className="lever"></span>
                  </label>
                </div>
                <table className="centered">
                  <tbody>
                    <tr>
                      <td>Email</td>
                      <td>{this.state.email}</td>
                    </tr>
                    <tr>
                      <td>Created @</td>
                      <td>{this.state.date_of_creation}</td>
                    </tr>
                    <tr>
                      <td>Message</td>
                      <td>{this.state.total_message}</td>
                    </tr>
                  </tbody>
                </table>
                <br/>
                <Link to="/Anonym/message"><span className="btn" style={{margin: "10px 10px"}}>Message</span></Link>

                <Link to="/Anonym/signout"><span className="btn" style={{margin: "10px 10px"}}>Signout</span></Link>

                {/* <Link to="/delete"><span className="btn red" style={{margin: "10px 10px"}}>Delete Account</span></Link> */}
            </div>
          }
          </div>
        );
  }
}

// function Index() {
//   const sharable_url = site_url + 'USERNAME';
//   const facebook_share_url = "https://www.facebook.com/sharer.php?u=" + sharable_url;
//   const twitter_share_url = "https://twitter.com/share?url=" + sharable_url;
//   const linkedin_share_url = "https://www.linkedin.com/shareArticle?mini=true&amp;url=" + sharable_url;
//   const whatsapp_share_url = "https://api.whatsapp.com/send?text=" + sharable_url; 
//   const mail_share_url = "mailto:?&amp;body=" + sharable_url;

//   return (
//   );
// }

export default IndexComponent;
