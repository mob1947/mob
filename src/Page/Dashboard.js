import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';
import './Dashboard.scss';
import Modal from './Components/Modal'
// import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
	const history = useHistory();
	const [data, setData] = useState([]);
	const [updateData, setUpdateData] = useState([])
	const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(true);
	
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	const handleLogout = () => {
		firebase
			.auth()
			.signOut()
			.then((res) => {
				alert('User Logout Succuss');
			});
	};

	const handleRenew = (item) => {
		setUpdateData(item)
		setShowModal(!showModal)
	
		// handleShow();
	};
	const handleModal = () =>{
		setShowModal(!showModal)
	}
	const handleUpdate = (details) =>{
		console.log(details.uid)
		firebase.firestore().collection("Members").doc(updateData.uid).update({paidAmount: details.amount, renewDate:details.renew}).then(re=>{
			alert("Member as been renewed ")
			setShowModal(false)
		}).catch(err =>{
			console.log(err)
		})
	}

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				let d = new Date();
				let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
				let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
				let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
				let date = `${ye}-${mo}-${da}`;
				let docs = [];
				const subscriber = firebase
					.firestore()
					.collection('Members')
					.where('renewDate', '<=', date)
					.get()
					.then((query) => {
						query.forEach((item) => {
							docs.push({ ...item.data(), uid: item.id });
						});
						setData(docs);
						console.log(docs);
					})
					.catch((err) => {
						console.log(err);
						alert(err);
					});
				return () => subscriber();
			} else {
				history.push('Home');
			}
		});
	}, [updateData, data]);

	return (
		<div>
			<div className="dash-body">
				<h2>Dashboard</h2>
				<div>
					<div class="container">
						<ul class="responsive-table">
							<li class="table-header">
								<div class="col col-1">Contact No</div>
								<div class="col col-2">Member Name</div>
								<div class="col col-3">Amount</div>
								<div class="col col-4">Expire Date</div>
								<div class="col col-5">Renew</div>
							</li>
							{data &&
								data.map((item, index) => {
									return (
										<li class="table-row">
											<div class="col col-1" data-label="Contact No">
												{item.contactNumber}
											</div>
											<div class="col col-2" data-label="Member Name">
												{item.name}
											</div>
											<div class="col col-3" data-label="Amount">
												{item.paidAmount}
											</div>
											<div class="col col-4" data-label="Expire Date">
												{item.renewDate}
											</div>
											<div class="col col-5" data-label="Renew">
												<button
													className="renew-button"
													onClick={handleRenew.bind(this, item)}
												>
													Renew
												</button>
											</div>
										</li>
									);
								})}
						</ul>
				
					</div>
				</div>
			</div>
			<div >

			</div>
			<div className={showModal ? "show-modal" : "hide-modal"}>
			<Modal events={{handleModal, handleUpdate}} data={updateData}/>
			</div>
			{/* <h2 onClick={handleLogout}> Logout</h2> */}
		</div>

	);
};

export default Dashboard;
