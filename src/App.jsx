import { useEffect, useRef, useState } from "react"
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
  const nameAudio = new Audio();
  const emailAudio = new Audio();
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(()=>{
    nameAudio.muted = true;
    emailAudio.muted = true;
  })

  function handleInputChange(value,setter){
    setter(init=>value)
  }

  function soundAnError(name){

    if (name === "name") {
            nameAudio.src = soundName;
            nameAudio.muted = false
            nameAudio.autoplay = true;
            nameAudio.play().catch(error=>console.log(error));
    }else{
      emailAudio.src = soundEmail;
      nameAudio.muted = false
      emailAudio.autoplay = true;
      emailAudio.play().catch(error=>console.log(error))
    }
  }

  function stopAllSound(){
    nameAudio.pause();
    emailAudio.pause();
  }

  function unMuteSound(name){
    if (name === "name") {
      nameAudio.muted = false
    }else{
    emailAudio.muted = false
    }
  }

  function handleSubmit(){
    stopAllSound();
    switch (true) {
      case name.trim() === "":{
        setTimeout(()=>{
          highlightUnfilledInput(nameRef);
          soundAnError("name");
          unMuteSound("name");
        },1)
      }
        break;
      case email.trim() === "":{
        setTimeout(()=>{
        highlightUnfilledInput(emailRef);
        soundAnError("email");
        unMuteSound("email");
        },1)
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
