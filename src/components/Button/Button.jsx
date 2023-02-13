import React from 'react'; 
import './Button.css'; 
 
export const Header =()=>{
    
    return(
        <button {...props} className ={'button '+ props.className}/>
    );
}
 