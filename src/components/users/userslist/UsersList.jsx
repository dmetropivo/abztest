import React from "react";
import User from "../user/User"
import './UsersList.sass'
const UsersList = ({usersData}) => {

    return(
        <div className="cards-container">
           {usersData.map(user =>
           <div className="wrap-user-card" key={user.id}>
                <User 
                id={user.id}
                name={user.name}
                position={user.position} 
                photo={user.photo} 
                email={user.email} 
                phone={user.phone} />
            </div>
                )}
        </div>
    )
}
export default UsersList