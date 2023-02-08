import {React, useEffect} from 'react'
import './App.css';
import {Routes, Route} from "react-router-dom";
import {Header} from './components/Header/Header'
import {ProductList} from './components/ProductList/ProductList'
import {Form} from './components/Form/Form'
const tg = window.Telegram.WebApp; 

function App() {
  useEffect(()=>{
    tg.ready()
  }, [])
  const closeEvent =()=>{
    tg.close()
  }
  return (
    <div className="App">
       
      <div className='container'>  
       <h1>It's work</h1>
       <Header/>
       <Routes>
        <Route index element = {<ProductList/>}/> 
        <Route path = {'/form'} element={<Form/>}/>
       </Routes>
       <button onClick = {closeEvent} className="btn">Закрыть</button>
       </div>
    </div>
  );
}

export default App;
