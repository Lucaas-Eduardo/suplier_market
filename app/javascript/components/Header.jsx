import React, { Component, Fragment }  from "react";
import { Link, Redirect } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = (e, url) => {
    e.preventDefault();
    axios.delete(url, {})
    .then(function(response){
      return <Redirect to={ "/" } />
    })
    .catch(function(error){
      console.log(error)
    })
  }

  render() {
    if (this.props.currentUser) {
      let path = "";
      if (this.props.currentUser.admin) {
        path = "admin";
      } else if (this.props.currentUser.client) {
        path = "clients";
      } else if (this.props.currentUser.provider) {
        path = "providers";
      }

      return(
        <Fragment>
          Logged in as <strong>{ this.props.currentUser.email }</strong>

          <Link to={ "/" + path + "/sign_up" } className="navbar-link">
            Edit profile
          </ Link>

          <button onClick={ (e) => this.handleLogout(e, "/" + path + "/logout") }
            className="navbar-link"> Logout </button>
        </Fragment>
      );
    }

    if (this.props.currentUser == null) {
      return(
        <Fragment>
          <Link to={ "/clients/sign_up" } className="navbar-link">
            Sign up Client
          </Link>

          <Link to={ "/clients/login" } className="navbar-link">
            Login Client
          </Link>

          <Link to={ "/providers/sign_up" } className="navbar-link">
            Sign up Provider
          </Link>

          <Link to={ "/providers/login" } className="navbar-link">
            Login Provider
          </Link>
        </Fragment>
      );
    } else if (this.props.currentUser.client) {
      return(
        <Fragment>
          Logged in as <strong>{ this.props.currentUser.email }</strong>

          <Link to={ "/clients/sign_up" } className="navbar-link">
            Edit profile
          </ Link>

          <button onClick={ (e) => this.handleLogout(e, "/clients/logout") }
            className="navbar-link"> Logout </button>
        </Fragment>
      );
    } else if (this.props.currentUser.provider) {
      return(
        <Fragment>
          Logged in as <strong>{ this.props.currentUser.email }</strong>.

          <Link to={ "/providers/sign_up" } className="navbar-link">
            Edit profile
          </Link>

          <button onClick={ (e) => this.handleLogout(e, "/providers/logout") }
            className="navbar-link"> Logout </button>
        </Fragment>
      );
    } else {
      return(
        <Fragment>
          Logged in as <strong>{ this.props.currentUser.email }</strong>.

          <Link to={ "/providers/sign_up" } className="navbar-link">
            Edit profile
          </Link>

          <button onClick={ (e) => this.handleLogout(e, "/admin/logout") }
            className="navbar-link"> Logout </button>
        </ Fragment>
      );
    }
  }
}

export default Header;