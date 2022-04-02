import React from 'react';
import { useEffect } from 'react';
import './App.sass';
import { useState} from 'react';
import Header from './components/header/Header';
import Banner from './components/banner/Banner';
import Users from './components/users/Users';
import Register from './components/register/Register';
import axios from 'axios';


function App() {
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(false)
    const [stateBtn, setStateBtn] = useState(true)
    const [next_url, setNextUrl] = useState('')
    const[token, setToken] = useState('')
        
        // Запрос на получение юзеров
        const getUsers = async() => {
            setLoading(true);
            const res = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6');
            if (res.data.success){
            setUsersData(res.data.users);
            setNextUrl(res.data.links.next_url)
            setStateBtn(true)
            }
            else console.log('error')
            setLoading(false);
        }
        // Запрос на получение токена
        const getToken = async() => {
            setLoading(true);
            const res = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token');
            if (res.data.success){
            setToken(res.data.token);
            }
            else console.log('error token')
            setLoading(false);
        }
        // Запрос на получение след. юзеров
        const getUsersNext = async() => {
            setLoading(true);
            const resNext = await axios.get(next_url);
            if (resNext.data.links.next_url == null){
                setStateBtn(false)
            }  
            if (resNext.data.success)
            {
            setNextUrl(resNext.data.links.next_url)
            setUsersData([...usersData,...resNext.data.users])
            } else {
                console.log('someone error')
            }
            setLoading(false);
        }


    useEffect(()=>{
        getToken()
        getUsers()
        
    },[])

    return (
         <div className="App">
        <Header /> 
        <main>
            <Banner />
            <Users
             id={'users'}
             usersData = {usersData}
             next_url={next_url}
             stateBtn={stateBtn}
             loading={loading}
             getUsersNext={getUsersNext}
            />
            
            <Register
            id={'sign-up'} 
            token={token}
            getUsers={getUsers}
             />
        </main>
        </div>
    );
}

export default App;