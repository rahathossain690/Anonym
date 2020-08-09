import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../shemix.svg'

function Nav() {

  return (
    <nav className="nav-wrapper container-fluid" style={{width: "100%"}}>
        <div>
        <Link to="/"><span className="brand-logo right"><img src="https://img.icons8.com/dusk/64/000000/like-message.png" alt="Anonym" style={{height: "50px", width: "50px"}}/></span></Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
                {/* <li><Link to="/signin"><span className="waves-effect waves-light btn" style={{marginLeft: "10px 10px"}}>Signin</span></Link></li>
                <li><Link to="/signup"><span className="waves-effect waves-light btn" style={{margin: "10px 10px"}}>Signup</span></Link></li>
                <li><Link to="/signout"><span className="waves-effect waves-light btn" style={{margin: "10px 10px"}}>Signout</span></Link></li> */}
            </ul>
        </div>
  </nav>
  );
}

export default Nav;