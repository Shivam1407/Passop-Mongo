import React from 'react'

const footer = () => {
  return (
    <div className='bg-[#1f273b] text-white flex  w-full flex-col justify-center items-center'>
         <div className='logo font-bold text-2xl'>
                    <span className="text-green-800">&lt;</span>
                    Pass
                    <span className="text-green-800">LOCK/&gt;</span>

                </div>
    <div className='flex'>
      Created with <img className='w-7 mx-2' src="./icons/heart.256x236.png" alt="" />  by Shivam Pal
    </div>

    </div>
  )
}

export default footer
