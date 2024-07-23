import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className='logo font-bold text-2xl'>
                    <span className="text-green-800">&lt;</span>
                    Pass
                    <span className="text-green-800">LOCK/&gt;</span>

                </div>


                <button
                    className='text-white bg-green-900 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1'
                    onClick={() => window.open('https://github.com/Shivam1407', '_blank')}
                >
                    <img className='invert w-10 p-2' src="/icons/github-original-wordmark.svg" alt="github logo" />
                    <span className='font-bold px-2 hidden md:block'>GitHub</span>
                </button>

            </div>
        </nav>

    )
}

export default Navbar
