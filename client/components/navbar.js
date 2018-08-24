import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (

  <div className='navbar'>
    <div className='logo'></div>
    <p className='navbar-title'>Charity G</p>
    <nav className='navbar-links'>
      {
        isLoggedIn ? (
          <div className='navbar-links-list'>
            <Link to='/home'>Home</Link>
            <Link to='/events'>Events</Link>
            <a href='#' onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />    
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
