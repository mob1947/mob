import React, {useState} from 'react';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import firebase from '../firebase';
import './Home.scss';
import { useHistory } from "react-router-dom";

const Home = () => {
	const history = useHistory();
	const [email,setEmail] = useState("");
	const [password, setPassword] = useState("")
	
    const handlelogin =async () =>{
		if(email !== "", password !== "" ){
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password).then(res =>{
					history.push("Dashboard")
					alert("Succussfully logged in")
				})
			  } catch (err) {
				console.error(err);
				alert("Please Check username password");
			  }
		}
		else{
			alert("Please enter valid details")
		}
        
    }
	return (
		<div>
			<div className="reg-body">
				<div className="login-div">
					<div className="logo"></div>
					<div className="title">Login</div>
					<div className="sub-title">MOB</div>
					<div className="fields">
						<div className="username">
							<input
								type="username"
								className="user-input"
								placeholder="Email Id"
								onChange={e =>{
									setEmail(e.target.value)
								}}
							/>
						</div>
                        <div className="username">
							<input
								type="password"
								className="user-input"
								placeholder="Password"
								onChange={e =>{
									setPassword(e.target.value)
								}}
							/>
						</div>
					</div>
					<button className="signin-button" onClick={handlelogin}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
