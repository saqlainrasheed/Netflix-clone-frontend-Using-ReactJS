import React, { useEffect, useState } from 'react';
import './Navbar.css'


function Navbar() {
  const [show,handleshow] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY > 100){
        handleshow(true)
      }else handleshow(false)
    })

    return () => {
      window.removeEventListener("scroll")
    };
  },[])


  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="logo" className="nav-logo"/>
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" alt="logo" className="nav-avatar"/>
    </div>
  )
}

export default Navbar
