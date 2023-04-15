import { useEffect } from 'react';
import SearchBar from './SearchBar.jsx'
import { NavLink } from 'react-router-dom'

function Nav(props) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Mi App
          </NavLink>
          {props.logged ? <NavLink className="navbar-brand" to="/">Hi {props.username}</NavLink> : null}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" activeClassName="active">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/favorites" activeClassName="active">
                  Favorites
                </NavLink>
              </li>
              { !props.logged? 
                <li className="nav-item">
                <NavLink className="nav-link" to="/" activeClassName="active">
                  Login
                </NavLink>
              </li> 
              : 
              <li className="nav-item">
                <NavLink className="nav-link" to="/" activeClassName="active" onClick={props.logout}>
                  logout
                </NavLink>
              </li> 
              }
            </ul>
            <SearchBar onSearch={props.onSearch} className="form-inline" />
          </div>
        </div>
      </nav>
    );
  }
export default Nav