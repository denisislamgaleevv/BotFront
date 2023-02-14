import React from 'react'; 
import './Button.css'; 
 
export const Header =(props)=>{
    
    return(
        <button {...props} className ={'button '+ props.className}/>
    );
}
 