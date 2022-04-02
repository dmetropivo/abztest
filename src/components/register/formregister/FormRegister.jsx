import { useState} from "react";
import FileUploader from "./FileUploader";
import axios from "axios";
import './FormRegister.sass'
import InputMask from "react-input-mask";
import Modal from "../../modal/Modal";
import SuccessImage from '../../../assets/success-image.svg'

// Функция для проверки/валидации емейла
// Email verification/validation function
function validateEmail(email) {
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
}

const FormRegister = ({token, positions, getUsers})=>{
    const [name, setName] = useState({
      name:'',
      errorMessage: '',
      status:false
    });
    const [email, setEmail] = useState({
      email:'',
      errorMessage:'',
      status:false
    });
    const [phone, setPhone] = useState({
      phone:'',
      errorMessage:'',
      status:false
    });
    const [selectedOption, setSelectedOption] = useState("1")
    const [selectedFile, setSelectedFile] = useState({
      file:undefined,
      errorMessage:'',
      status:false
    })
    const [loading, setLoading] = useState(false)
    const[focusName, setFocusName] = useState(false)
    const[focusEmail, setFocusEmail] = useState(false)
    const[focusPhone, setFocusPhone] = useState(false)
    const [isModal, setModal] = useState(false)
    
    
    // обработчик события нажатия  кнопки отправки формы / form submit button click event handler
    function handleFormSubmit(event) {
      event.preventDefault();
      
      const selectedOptionNumber = Number(selectedOption) // Преобразование строкового значения выбраной позиции в число/ Convert the string value of the selected position to a number
      
      // Создаем и заполняем объект типа FormData(), текущим состоянием полей формы/ create and fill an object of type FormData () with the current state of the form fields
      var formData = new FormData()
      formData.append('name', name.name)
      formData.append('email', email.email)
      formData.append('phone', phone.phone)
      formData.append('position_id',selectedOptionNumber)
      formData.append("photo", selectedFile.file)

      //Функция асинхронного пост запроса на сервер/Function of asynchronous post request to the server
      const register = async() =>{
        setLoading(true) //Устанавливаем состояние загрузки в true/Set loading state to true
        await axios.post(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        formData,
        {headers: {'Token': token}})
      .then((response) => {
        //Если ответ от сервера true выполняем: / If the response from the server is true, execute:
        if (response.data.success){
          setModal(true)
          getUsers()// Обновляем список юзеров с помощью метода getUsers() полученого из пропса /Update the list of users using the getUsers() method obtained from the prop
        } else {
          console.log(response.data.message)
        }
       })
       //Тут отлавливаем ошибки полученные от сервера / Here we catch errors received from the server
      .catch((error) => {
        // Функция, которая проверяет значение на равенство undefined и возвращает булевое значение в зависимости от результата.
        // A function that checks if a value is undefined and returns a boolean value depending on the result
        function checkedStatus(fails){
          if (fails === undefined){
            return true
          } else {return false}}

        if (error.response) {
          //Если статус ответа от серверра === 401 - проблема с токеном
          //If the status of the response from the server === 401 - a problem with the token
          if (error.response.status === 401){
            console.log('token problem')
          }
          //Если статус ответа === 409, то были найдены юзеры с таким емейлом или телефоном
          //If response status === 409, then users with the same email or phone number were found
          if (error.response.status === 409){
            //Внутри функции обновляем состояние полей email и phone. Присваеваем в errorMesage сообщение об ошибке, а также устанавливаем статус false
            //Inside the function, we update the state of the fields email and phone. We assign an error message to the errorMesage, and also set the status to false

            setEmail({
              email:email.email,
              errorMessage:error.response.data.message,
              status: false
            })
            setPhone({
              phone:phone.phone,
              errorMessage:error.response.data.message,
              status: false
            })
          }
          //Если статус ответа === 422, то сервером была обнаружена проблема валидации полей
          //If the response status === 422, then the server has detected a field validation problem
          if (error.response.status === 422){
            let fails = error.response.data.fails
            
            //Ниже происходит обновления состояния. Присваиваем в name, email, phone, photo текущее состояние. В errorMessage присваиваем ошибку полученную от сервера. В статус присваиваем ф-ию, которая проверяет существует ли сообщение об ошибке
            ////Below is the state update. We assign the current state to name, email, phone, photo. In errorMessage we assign the error received from the server. In the status we assign a function that checks whether an error message exists
            setName({
              name:name.name,
              errorMessage:fails.name,
              status:checkedStatus(fails.name)
            })
            setEmail({
              email:email.email,
              errorMessage:fails.email,
              status: checkedStatus(fails.email)
            })
            setPhone({
              phone: phone.phone,
              errorMessage:fails.phone,
              status: checkedStatus(fails.phone)
            })
            setSelectedFile({
              file: selectedFile.file,
              errorMessage:fails.photo,
              status: checkedStatus(fails.photo)
            })
          }
        } else if (error.request) { 
          console.log('client never received a response, or request never left')
        } else { 
          console.log('anything else ')
        }
      })


      setLoading(false)//Устанавливаем состояние загрузки в false/ Set loading state to false
    }
    register()//запускаем post запрос / run post request 
  }


    //Оброботчик события изменения поля с именем
    const onChangeName = changeEvent =>{
      console.log('focus')
      if(changeEvent.target.value.length >= 2 && changeEvent.target.value.length <= 60 )//если символов не меньше двух и не больше 60 выполняем:
      {
        setName({name:changeEvent.target.value,status:true})  
      } else { //иначе показыаем ошибку
        setName({name:changeEvent.target.value, errorMessage:'The name must be at least 2 characters.',status:false})
      }
    };

    //Оброботчик события изменения поля с email
    const onChangeEmail = changeEvent =>{ 
      if (validateEmail(changeEvent.target.value)){
        setEmail({email:changeEvent.target.value, status:true})
      } else { 
        setEmail({email:changeEvent.target.value, errorMessage:'The email must be a valid email address.',status:false})
      }
    };
    //Оброботчик события изменения поля с phone
    const onChangePhone = changeEvent => {
       if(changeEvent.target.value.length === 13  ){
        setPhone({phone:changeEvent.target.value,status:true})
       } else{
        setPhone({phone:changeEvent.target.value,errorMessage:'The phone field is required.',status:false})
       }
    }
    //Оброботчик события изменения загрузчика файла
    const handleOptionChange = changeEvent => {
      setSelectedOption(changeEvent.target.value)
    };
    const handleFocusName = () => setFocusName(true)
    const handleBlurName = () => setFocusName(false)
    const handleFocusEmail = () => setFocusEmail(true)
    const handleBlurEmail = () => setFocusEmail(false)
    const handleFocusPhone = () => setFocusPhone(true)
    const handleBlurPhone = () => setFocusPhone(false)
    const onCloseModal = () => setModal(false)

   
    return (
      <form className="form-register" onSubmit={handleFormSubmit}>
        <fieldset className={name.errorMessage ? 'error-style':''}>{/* Добавляем класс error-style, если name.errorMessage существует */}
          {focusName? <span className="input-title">Your name</span>:<div className="input-title-hidden" />}
          <input
            className='input-field'
            id="name"
            type="text"
            value={name.name}
            placeholder="Your name"
            onChange={onChangeName}
            onBlur={handleBlurName}
            onFocus={handleFocusName}
          />
        </fieldset>
        <div className="error-input-message">{name.errorMessage}</div> {/* Вставляем текст ошибки*/}
        
        <div className='input-field-email'>
          <fieldset className={email.errorMessage ? 'error-style':''}>{/* Добавляем класс error-style, если email.errorMessage существует */}
          {focusEmail? <span className="input-title">Email</span>:<div className="input-title-hidden" />}
            <input
            className='input-field'
            id="email"
            type="email"
            value={email.email}
            placeholder="Email"
            onChange={onChangeEmail}
            onFocus={handleFocusEmail}
            onBlur={handleBlurEmail}
            />
          </fieldset>
          <div className="error-input-message">{email.errorMessage}</div>{/* Вставляем текст ошибки*/}
        </div>
        <div>
          <fieldset className={phone.errorMessage ? 'error-style':''}>{/* Добавляем класс error-style, если phone.errorMessage существует */}
          {focusPhone? <span className="input-title">Phone</span>:<div className="input-title-hidden" />}
          {/* Создание компонента InputMask из библиотеки 'react-input-mask' */}
          <InputMask
            className='input-field'
            id="phone"
            value={phone.phone}
            placeholder="Phone"
            onChange={onChangePhone}
            onFocus={handleFocusPhone}
            onBlur={handleBlurPhone}
            mask="+38\0999999999"
            maskChar=""
          />
          </fieldset>
           <div className="error-input-message">{phone.errorMessage}</div>{/* Вставляем текст ошибки*/}
        </div>

        {/* Radio buttons */}
        <div className="select-position">
          <p className="p1-custom">Select your position</p>

          {/* Проходимся по массиву позиций, полученного через get запрос в родительском компоненте и создаем для каждой позиции
              радио-баттон. Присваеваем в value id позиции. В checked создаем условие: если selectedOption(состояние которого всегда = '1') === id, то делаем input изначально выбранным. 
           */}
        {positions.map(position => 
                <div key={position.id} className="position-check">
                  <label>
                  <input
                    type="radio"
                    id="radio-button"
                    name="react-tips"
                    value={position.id}
                    checked={selectedOption === String(position.id)}
                    onChange={handleOptionChange}
                    className="form-check-input"
                  />
                  {/* <label> */}
                  {position.name}
                </label>
              </div>
          )}
        </div>

          <div className="input-photo-wrap">
          {/* FileUploader - компонент загрузчик
              C помошью  onFileSelectSuccess(когда файл успешно выбран) и onFileSelectError(когда возникла какая то ошибка) прокидывается пропс, который изменяет состояние полей file, errorMessage, status от дочернего к родителькому компоненту 

          */}
          <FileUploader
          errorMessage={selectedFile.errorMessage}
          onFileSelectSuccess={(file) => setSelectedFile({file: file, errorMessage:'', status:true})}
          onFileSelectError={({ error }) => setSelectedFile({file:undefined, errorMessage:error, status:false})}
        />
        <div className="error-input-message">{selectedFile.errorMessage}</div>
        </div>
        <div className="button-container">
          {/*Кнопка отправки формы.Переключается в состояние disabled, если хоть одно поле status в name, phone, email, selectedFile возвращает false.
             Таким образом уведомляет юзера, что форма заполнена некорректно  */}
          <button 
          className="button"
          disabled={!(name.status&&email.status&&phone.status&&selectedFile.status)} 
          type="submit">Sign up</button>
          <div className="spinner">
            {/*Если состояние loading true - отображается спиннер загрузки*/}
          {loading && <div className='donut'></div> } 
            </div>
        </div>
        <Modal
                visible={isModal}
                title="User successfully registered"
                content={<img src={SuccessImage} alt="modal" />}
                footer={<button className="button" onClick={onCloseModal}>Close</button>}
                onClose={onCloseModal}
            />
      </form>
      
    );
}
export default FormRegister