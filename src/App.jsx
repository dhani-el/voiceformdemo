import { useRef, useState } from "react"
import soundName from "./assets/one.mpeg"
import soundEmail from "./assets/two.mpeg"
import "./style.css"

function App() {



  return  <div id="main-container">
            <h2>Voice Assisted Form Demo</h2>
            <CustomForm/>
          </div>
}


function CustomForm(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [showBlur,setShowBlur] = useState(false);
  const nameAudio = new Audio(soundName);
  const emailAudio = new Audio(soundEmail);
  const nameRef = useRef(null);
  const emailRef = useRef(null);


  function handleInputChange(value,setter){
    setter(init=>value)
  }

  function soundAnError(name){

    if (name === "name") {
            nameAudio.play().catch(error=>console.log(error))
    }else{
      emailAudio.play().catch(error=>console.log(error))
    }
  }

  function stopAllSound(){
    nameAudio.pause()
    emailAudio.pause()
  }

  function handleSubmit(){
    stopAllSound();
    switch (true) {
      case name.trim() === "":{
        highlightUnfilledInput(nameRef);
        soundAnError("name");
      }
        break;
      case email.trim() === "":{
        highlightUnfilledInput(emailRef);
        soundAnError("email")
      };
        break;
      default:alert("form submitted")
        break;
    }
  }
  
  function highlightUnfilledInput(ref){
    if (ref!== null) {
      setShowBlur(init=>true)
      setTimeout(function(){
      setShowBlur(init=>false);
      },2000)
          ref.current.style.position = "relative"
          ref.current.style.zIndex = 20
    }
  }

  return <form id="form-main">
            <input ref={nameRef} onChange={(e)=>handleInputChange(e.target.value,setName)} value={name} placeholder="enter your name" required/>
            <input ref={emailRef} onChange={(e)=>handleInputChange(e.target.value,setEmail)} value={email} placeholder="enter your email " required />
            <input onChange={(e)=>handleInputChange(e.target.value,setAddress)} value={address} placeholder="enter your address " />
            <button onClick={handleSubmit}>Submit</button>
            {showBlur && <BackgroundBlur/>}
  </form>
}

function BackgroundBlur(){
  return <div id="backgroundBlur">

  </div>
}
export default App
