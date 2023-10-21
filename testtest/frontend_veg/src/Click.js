import React from "react";
import ReactDOM from "react-dom/client";
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
class Click extends React.Component {
    state = { Clicked: false };
    componentDidMount() {
        const { event } = this.props;
        // this.ref.addEventListener("click", this.handleEvent);
    // 
    this.ref = ReactDOM.findDOMNode(this);
    document.addEventListener(event, this.handleEvent);
    }
    componentWillUnmount() {
        const { event } = this.props;
        this.ref.removeEventListener("click", this.handleEvent);
    }
    handleEvent = (
    {
    target
    }
    ) => {
    const Clicked = this.ref.contains(target);
    
    this.setState({ Clicked: true });
    };
    render() {
    const { children } = this.props;
    const { Clicked } = this.state;
    return children(Clicked);
    }
}
export default Click;