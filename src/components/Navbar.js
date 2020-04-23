import React, { Component } from 'react'

import "./Navbar.scss"
import MenuIcon from "../assets/menu.svg"


export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar-component">
                <button onClick={ () => this.props.onToggle() }>
                    <img
                        src={ MenuIcon }
                        alt="iconmenu"
                    />
                </button>
                <h2>SISLMP</h2>
            </div>
        )
    }
}
