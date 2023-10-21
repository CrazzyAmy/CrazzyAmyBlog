import React from "react";
import ReactDOM from "react-dom/client";
import $ from 'jquery';
import {useState} from 'react';
// import {Icon} from 'react-icons-kit';
//导入两个图标，分别是(可看/禁止看)
// import {eyeOff} from 'react-icons-kit/feather/eyeOff';
// import {eye} from 'react-icons-kit/feather/eye';

function Eye() {
    // constructor (props) {
    //     super(props);
    //     this.yourFunction = this.yourFunction.bind(this);
    //   }
    const [click, setClick] = useState(false);
    // const { event } = this.props;
    const [password, setPassword] = useState("password");
    // state = { Clicked: false };
    // componentDidMount() {
        
        // const [type, setType] = useState('password');
        // const [icon, setIcon] = useState(eyeOff);
    // const { event } = this.props;
        document.addEventListener("click", this.handleToggle);
    // }
    // componentWillUnmount() {
    // const { event } = this.props;
    // const [password, setPassword] = useState("");
    //     const [type, setType] = useState('password');
    //     const [icon, setIcon] = useState(eyeOff);
    // document.removeEventListener("click", this.handleToggle);
    // }
    const handleTogglePw = (e) => {

        if (password==='password'){
           setPassword('text');
        } else {
            setPassword('password');
        }
        [e.target.name] = e.target.value
    }
    const handleToggleCk = (e) => {
        // setClick((current) => !current);
        if (password==='fa-eye'){
            setPassword('fa-eye-slash');
         } else {
             setPassword('fa-eye');
         }
        [e.target.name] = e.target.value
    }
    const submit = e => {
        e.preventDefault()
        console.log(password)
        console.log(click)
    }
    // pw = ${Clicked ? "text":"password"};
    // const { children } = this.props;
    // const { Clicked } = this.state;
    // const pw = (Clicked ? "text":"password");
    // const eye = (Clicked ? "fa-eye" : "fa-eye-slash");
    // const ref = React.createRef(null);
    return (
        // <div>
        //    <div>
        //       <div class="mb-4 flex">
        //          <input
        //              type={type}
        //              name="password"
        //              placeholder="Password"
        //              value={password}
        //              onChange={(e) => setPassword(e.target.value)}
        //              autoComplete="current-password"
        //         />
        //         <span class="flex justify-around items-center" onClick={handleToggle}>
        //              <Icon class="absolute mr-10" icon={icon} size={25}/>
        //          </span>
        //        </div>
        //     </div>
        //  </div>

        <div class="form-signin" onSubmit={submit}>
            <input onChange={handleTogglePw} type={handleTogglePw} autoComplete="current-password" className="form-control"/>
            <label for="POST-password" class="form-row-field floatingPassword ">Password</label>
            <span class="flex justify-around items-center" onClick={handleToggleCk}>
                <i event="click" id="checkEye" onChange={handleToggleCk} className={"fas "+ {handleToggleCk}}></i>
            </span>
        </div>  
    ) 
    }
    export default Eye;