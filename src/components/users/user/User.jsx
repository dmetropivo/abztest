import React from "react"
import './User.sass'
import defaultPhoto from '../../../assets/photo-cover.svg'
import ReactTooltip from "react-tooltip"
const User = ({name,position,photo, email, phone, id}) =>{
    return(
        <div className="user-card">
            <img 
            src={photo || defaultPhoto}
            alt={name}
            onError={e => {e.target.src = defaultPhoto}}
            width='70px'
            height='70px'/>
            <div data-tip={name} className="p1-custom user-card-name">{name}</div>
            <div className="p1-custom info-block">
                <div className="info-position">{position}</div>
                <div data-tip={email} className="info-email">{email}</div>
                <div className="info-phone">{phone}</div>
                <ReactTooltip border={false} place={'bottom'} className='user-tooltip'/>
            </div>
        </div>
    )
}
export default User