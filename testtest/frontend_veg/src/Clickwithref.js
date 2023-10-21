import React from "react";
import ReactDOM from "react-dom";
import { useState } from 'react';
// import { ref } from 'firebase/storage';
class ClickWithRef extends React.Component {
state = { Clicked: false };
componentDidMount() {
    const { event } = this.props;
// const { event } = this.props;
document.addEventListener("click", this.handleEvent);
}
componentWillUnmount() {
const { event } = this.props;
document.removeEventListener("click", this.handleEvent);
}
handleEvent = (
{
target
}
) => {
// const Clicked = this.ref.contains(target);

this.setState({ Clicked :true });
};
// pw = ${Clicked ? "text":"password"};
render() {
const { children } = this.props;
const { Clicked } = this.state;
const pw = (Clicked ? "text":"password");
const eye = (Clicked ? "fa-eye" : "fa-eye-slash");
const ref = React.createRef(null);
return children(
Clicked, ref, pw, eye => (
this.ref = ref,
this.pw = pw,
this.eye = eye,
this.Clicked = Clicked
)
);
}
}
export default ClickWithRef;