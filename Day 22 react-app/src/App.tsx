// import {Message} from './Message';

import { useState } from "react";
import Message from "./Message";

function App() {
  const [age , setAge] = useState<number>(0);
  const handleFn = () => {
     const ageInput = prompt("Enter your age");
     if (ageInput == "0") {
      alert("Your age cannot be zero");
      return;
     }
     if (ageInput) {
       setAge(parseInt(ageInput));
     }
  }
    return (
        <div style={{ textAlign: "center" , display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "50px", 
          justifyContent: "center",
          
        }}> 
            <Message age={age} />

            {age === 0 && <h3>Can you vote</h3>}

            <button onClick={() => handleFn()}>Click here</button>
           
        </div>
    );
}

export default App;