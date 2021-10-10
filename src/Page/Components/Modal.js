import React, { useState, useEffect } from 'react';
import './Modal.scss';
import { MdClose,MdOutlineMailOutline, MdOutlinePhone ,MdOutlineAttachMoney} from 'react-icons/md';

const Modal = ({events, data}) => {
    const [details, setDetails] = useState({
        uid: data.uid,
        amount:"",
        renew:""
    })

    useEffect(() => {
     
    }, [details])
 
	return (
		<div>
			<div className="container-modal">
                
                <div className="card-container">
                    <h2>Renewal Form</h2>
                    <MdClose className="close-icon" onClick={events.handleModal}/>
                    <div className="input-feilds">
                        <label> Member Name : {data.name}</label>
                        <label> Member Contact : {data.contactNumber}</label>
                        <label>Enter the paid amount</label>
                    <input className="amount-feild" placeholder="amount" onChange={ e =>{setDetails({...details, amount:e.target.value})}} />
                    <div className="modal-date">
						<label>Expire date </label>
                        <input 
                        onChange={ e => { setDetails({...details, renew: e.target.value})}}
							type="date"
							className="reg-user-input"
						/>
					</div>
                    <button className="renew-button"  onClick={events.handleUpdate.bind(this, details)}>Update</button>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default Modal;
