import React, { useState, useEffect } from "react";
import TopNav from "../components/Navbar";
import { Link } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Button } from "react-bootstrap";
import MapDashboard from "../components/Map-dashboard";


const Dashboard = () => {
    const [currentUid, setCurrentUid] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userDocRef = doc(db, "users", currentUser.uid);
            getDoc(userDocRef)
                .then((doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        setCurrentUid(currentUser.uid);
                        setFirstName(data.firstName);
                        setLastName(data.lastName);
                        setEmail(data.email);
                        setBusinessName(data.business.businessName)
                        setPhone(data.business.phone)
                    } else {
                        console.log("User not found");
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    console.log(currentUid);

    return (
        <>
            <TopNav />
            <div className="container" id="main-content">
                <h1>Dashboard</h1>
                <p>Welcome! This is where vendors can view their info.</p>
                <div class="row">
                <div class="col-md-6 mt-5" id="user-profile">
                    
                    <p><strong>First Name: </strong>{firstName}</p>
                    <p><strong>Last Name: </strong>{lastName}</p>
                    <p><strong>Email: </strong>{email}</p>
                    <Link to={`/EditProfile/${currentUid}`}>
                        <Button variant="outline-primary" type="submit">Edit Profile</Button>
                    </Link>
                </div>
                <div class="col-md-6 mt-5" id="business-info" >
                    <p><strong>Business Name: </strong>{businessName}</p>
                    <p><strong>Address: </strong></p>
                    <div class="mt-3 mb-3" id="map-container">
                        <MapDashboard />
                    </div>
                    <p><strong>Phone: </strong>{phone}</p>
                    <p><strong>Website: </strong></p>
                    <p><strong>Hours: </strong></p>
                    <Link to={`/EditBusiness/${currentUid}`}>
                        <Button variant="outline-primary" type="submit">Edit Business Information</Button>
                    </Link>
                    
                </div>
                
                </div>
            </div>
        </>
    );
};

export default Dashboard;
