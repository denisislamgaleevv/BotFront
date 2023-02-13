import {React, useEffect, useState} from 'react'; 
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css'; 

export const Form =()=>{
     
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('');

    const {tg} = useTelegram(); 

    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(()=>{
        if (!street || !city){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }

    }, [street, city])
    
    const onChangeCity = (e) =>{
        setCity(e.target.value); 
    }
    const onChangeStreet = (e) =>{
        setStreet(e.target.value); 
    }
    const onChangeSubject = (e) =>{
        setSubject(e.target.value); 
    }
    return(
        <>
         <h3>Введите ваши данные:</h3>
         <input
         className='input'
         type = 'text'
         placeholder='Город'
         value = {city}
         onChange= {onChangeCity}
         />
          <input
         className='input'
         type = 'text'
         placeholder='Улица'
         value = {street}
         onChange= {onChangeStreet}
         />
         <select value = {subject} onChange={onChangeSubject} className='select'>
            <option value={'legal'}>Физ.лицо</option>
            <option value={'legal'}>Юр.лицо</option>
         </select>
        </>
    )
}
 