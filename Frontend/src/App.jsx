import { useState } from 'react'
import './App.css'
import Navbar  from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/Footer'
function App() {


  return (
    <>
      <Navbar/>


     <div className=' bg-green-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>

      <Manager/>
     </div>

      <Footer/>
    </>
  )
}

export default App
