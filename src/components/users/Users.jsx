import {Container} from 'react-bootstrap'
import UsersList from './userslist/UsersList'
import React from 'react'
import './Users.sass'


const Users = ({
     usersData,
     loading,
     stateBtn,
     getUsersNext,
     id}) => {

    return(
        <Container id={id} fluid className='p-0 main-bg-color'>
        <div  className="main-container main-bg-color padding-container">
            <h1 className='h1-custom'>Working with GET request</h1>
            <UsersList usersData = {usersData} loading = {loading}  />
            
            <div className='load-more-wrap'>
                <div className='load-more'>
                    <div className='spinner'>{loading && <div className='donut'></div> }</div>
                    {!stateBtn? '': <button 
                    className='button' 
                    disabled={loading} 
                    onClick={getUsersNext}>Show more</button>}
                    {/* <button 
                    className='button' 
                    disabled={loading} 
                    onClick={getUsersNext}>Show more</button> */}
                </div>
            </div>
        </div>
        </Container>
    )
}
export default Users




