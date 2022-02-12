import React from "react";



const  Input = (props) => {
return(
    <div>
        <input  placeholder={props.name} value={props.name}/>
    </div>
)
}

export default Input;