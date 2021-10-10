import React, {useState} from 'react'
import './Attendance.scss';
import firebase from '../firebase';
import { MdOutlineMailOutline, MdOutlinePhone ,MdOutlineAttachMoney} from 'react-icons/md';


const Attendance =() => {
    const [contactNumber, setContactNumber] = useState("")
    const [data, setData] = useState([]);

    const handleSearch = () =>{
      let docs = []
      if(contactNumber !== "" && contactNumber.length == 10){
        const subscriber =  firebase.firestore().collection("Members").where("contactNumber","==", contactNumber).get().then(query =>{
    
          query.forEach(item =>{
            docs.push({...item.data(), uid:item.id})
          })
          setData(docs)
          console.log(docs)
          if (docs.length == 0){
            alert("User Not Found")
          }
          
        }).catch(err =>{
          console.log(err)
          alert(err)
        })
        return () => subscriber();
      }
      else{
        alert("Please check or re-enter the number")
      }
    }
    const handleMark =(item) =>{
      const date = new Date()
      firebase.firestore().collection("Attendance").add({
        uid:item.uid,
        date:date
      }).then(()=>{
        console.log("Attendance added Succussfully")
        alert("Attendance Marked successfully");
      }).catch(err =>{
        console.log(err)
        alert("Sorry for the Issue")
      })
    }

    return (
      <div className="reg-body">
			<div className="login-div">
				<div className="logo"></div>
				<div className="title">Attendance</div>
				<div className="sub-title">MOB</div>
				<div className="fields">
					<div className="username">
						<input
							type="username"
							className="user-input"
              placeholder="Contact Number"
              onChange={e =>{ setContactNumber(e.target.value)}}
              value={contactNumber}
						/>
					</div>
				</div>
				<button className="signin-button" onClick={handleSearch}>Search</button>
        <div className="details">
          
           { data && data.map((item , index) =>{
            return (
            <div className="details-div">
              <label>Name : {item.name}</label>
              <label>Email Id : {item.emailId}</label>
              <label>Renew Date : {item.renewDate}</label>
              <label>Amount : {item.paidAmount}</label>
              <button className="signin-button" onClick={handleMark.bind(this, item)}>Mark My Attendace</button>
            </div>
            )
          }) 
}
      
        </div>
			</div>
		</div>

      );
}

export default Attendance;