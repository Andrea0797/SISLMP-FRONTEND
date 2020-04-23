import React, { Component } from 'react';

import "./Layout.scss";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default class Layout extends Component {
    state={
        isOpen: true,
    }
    componentDidMount(){
        // if is mobile 
        if ( window.innerWidth < 768 ) {
            this.setState({
                isOpen: false,
            })
        }
    }
    onToggle(){
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        })
    }
    render() {
        const { isOpen } = this.state;

        return (
            <div>
                <Navbar onToggle={ () => this.onToggle() } />
                <div className="component-wrapper">
                    <Sidebar classes={  isOpen ? "" : "isClosed" } { ...this.props }/>
                    <div className={ `container-wrapper ${ isOpen ? "" : "isClosed" }` }>
                        <div className="container">
                            { this.props.children }
                        </div>
                        <div className="overlay-c"
                            onClick={ () => this.onToggle() } 
                        />
                    </div>
                </div>
            </div>
        )
    }
}
