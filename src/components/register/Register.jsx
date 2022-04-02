import { Container } from "react-bootstrap"
import FormRegister from "./formregister/FormRegister"
import axios from "axios"
import {useState,useEffect} from "react"
import './Register.sass'

const Register = ({token, getUsers,id}) => {
    const [loading, setLoading] = useState(false)
    const [positions, setPositions] = useState([])
    const [error, setError] = useState(undefined)
    //Асинхронная функция get запроса с позициями
    const getPositions =
    async() => {
        setLoading(true); // переводим статус загрузки в true
        const res = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
        if (res.data.success){
            setPositions(res.data.positions)
        }
        else if (!res.data.success){
            setError(res.data.message)
        }
        setLoading(false); //снимаем статус загрузки в false
    }
    useEffect(() => {getPositions()}, [])

    // если загрузка, показываем спиннер загрузки
    if (loading) {
        return (
        <div className="register-form-preloader"><div className='donut'></div></div>
        )
    }
    //Если ошибка - отображаем ее 
    if (error!==undefined){
        return <div>{error}</div>
    }

    //Возвращаем верстку
    return(
        <Container fluid className="p-0 main-bg-color register-container">
            {/* В div id  передаем register, что бы react-scroll знал куда нужно скролить.  */}
        <div  id={id} className="main-container"> 
                <h1 className="h1-custom">Working with POST request</h1>
                {/* В компонент FormRegister передаем полученый токен, позиции, а также метод получения списка пользователей  */}
                <FormRegister token={token} positions={positions} getUsers={getUsers} /> 
            </div>        
        </Container>
    )
}
export default Register