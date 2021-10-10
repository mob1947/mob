import React, { useState } from 'react';
import firebase from '../firebase';
import './Registration.scss';
import { MdOutlineMailOutline, MdOutlinePhone ,MdOutlineAttachMoney} from 'react-icons/md';

const Registration = () => {
	const [details, setDetails] = useState({
		fullname: '',
		contactNumber: '',
		emailId: '',
    renewDate: '',
    paidAmount:''
  });
  const handleSubmit =() =>{
    if(details.contactNumber !== "" && details.fullname !== "" && details.emailId !== "" && details.renewDate !== ""){
    firebase.firestore().collection("Members").add({
      name:details.fullname,
      contactNumber:details.contactNumber,
      emailId:details.emailId,
      renewDate:details.renewDate,
      paidAmount:details.paidAmount
    }).then(()=>{
      console.log("Memeber added Succussfully")
      alert("Memeber added Succussfully Thanks For Joining us");
    })
  }
  else{
    alert("Please Fill all details");
  }
  }

	return (
		<div className="reg-body">
			<div className="reg-login-div">
				<div className="reg-logo"></div>
				<div className="reg-title">Registration</div>
				<div className="reg-sub-title">MOB</div>
				<div className="reg-fields">
					<div className="reg-username">
						<svg fill="#fff" viewBox="0 0 1024 1024">
							<path
								className="path1"
								d="M896 307.2h-819.2c-42.347 0-76.8 34.453-76.8 76.8v460.8c0 42.349 34.453 76.8 76.8 76.8h819.2c42.349 0 76.8-34.451 76.8-76.8v-460.8c0-42.347-34.451-76.8-76.8-76.8zM896 358.4c1.514 0 2.99 0.158 4.434 0.411l-385.632 257.090c-14.862 9.907-41.938 9.907-56.802 0l-385.634-257.090c1.443-0.253 2.92-0.411 4.434-0.411h819.2zM896 870.4h-819.2c-14.115 0-25.6-11.485-25.6-25.6v-438.566l378.4 252.267c15.925 10.618 36.363 15.925 56.8 15.925s40.877-5.307 56.802-15.925l378.398-252.267v438.566c0 14.115-11.485 25.6-25.6 25.6z"
							></path>
						</svg>
						<input
							onChange={(e) => {
								setDetails({ ...details, fullname: e.target.value });
							}}
							type="username"
							className="reg-user-input"
							placeholder="Full Name"
						/>
					</div>
					<div className="reg-password">
						<MdOutlinePhone />
						<input
							type="text"
							onChange={(e) => {
								setDetails({ ...details, contactNumber: e.target.value });
							}}
							className="pass-input"
							placeholder="Contact Number"
						/>
					</div>
					<div className="reg-username">
              <MdOutlineMailOutline/>
						<input
							onChange={(e) => {
								setDetails({ ...details, emailId: e.target.value });
							}}
							type="email"
							className="reg-user-input"
							placeholder="Email"
						/>
					</div>
          <div className="reg-username">
              <MdOutlineAttachMoney/>
						<input
							onChange={(e) => {
								setDetails({ ...details, paidAmount: e.target.value });
							}}
							type="text"
							className="user-input"
							placeholder="Amount"
						/>
					</div>
					<div className="reg-date">
						<label>Expire date :</label>
						<input
							type="date"
							onChange={(e) => {
								setDetails({ ...details, renewDate: e.target.value });
							}}
							className="reg-user-input"
						/>
					</div>
				</div>
				<button className="reg-signin-button" onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	);
};

export default Registration;
