import {React, useEffect} from 'react'
import './App.css';
import {Routes, Route} from "react-router-dom";
import {Header} from './components/Header/Header'
import {ProductList} from './components/ProductList/ProductList'
import {Form} from './components/Form/Form'
import {useTelegram} from './hooks/useTelegram'
function App() {
  const {onToggleButton, tg} = useTelegram();
  useEffect(()=>{
    tg.ready()
  }, [])
  return (
    <div className="App">
      <div className='container'>  
      
       <Header/>
       <Routes>
        <Route index element = {<ProductList/>}/> 
        <Route path = {'/form'} element={<Form/>}/>
       </Routes>
       
       </div>
    </div>
  );
}
export default App;


