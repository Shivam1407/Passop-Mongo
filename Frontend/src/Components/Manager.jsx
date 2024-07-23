import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () =>{
        let req = await fetch("https://passop-mongo-backend.onrender.com")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }
    
    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        // passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/cuteye.png")) {
            ref.current.src = "icons/eye-icon-1459.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/cuteye.png"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("https://passop-mongo-backend.onrender.com",{method:"DELETE",headers: { "Content-Type": "application/json"}, body: JSON.stringify({id:form.id})})


            const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
            setPasswordArray(updatedPasswords);
            await fetch("https://passop-mongo-backend.onrender.com",{method:"POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({...form, id: uuidv4() })})

            setform({ site: "", username: "", password: "" })
        }
        else {
            toast('lenght must be greater than 3 ');
        }
    };

    const DeletePassword = async (id) => {
        console.log("Deleting password with id ", id);
        let c = confirm("Are you really want delete This?")
        if (c) {

            const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswordArray);
            // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
            let res = await fetch("https://passop-mongo-backend.onrender.com",{method:"DELETE",headers: { "Content-Type": "application/json"}, body: JSON.stringify({id})})
        }
    }

    const editPassword = (id) => {
        console.log("Deleting pasword with id ", id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
        setPasswordArray(updatedPasswordArray);
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('🦄 Text copied!', {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition="Bounce"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
            <div className=" px-2 pt-3 md:px-0 md:mycontainer min-h-[88.2vh]">
                <h1 className='text-4xl text font-bold text-center'>
                    <div className='logo font-bold text-2xl'>
                        <span className="text-green-600">&lt;</span>
                        Pass
                        <span className="text-green-600">LOCK/&gt;</span>

                    </div>

                </h1>
                <p className='text-green-600 text-lg text-center'>Your own password Manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Your URL' className='rounded-full border border-green-500 w-[50vw] p-4 py-1' type="text" name="site" id="site" />
                    <div className='flex flex-col md:flex-row justify-between gap-[2vw]'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-[50vw] md:w-[24vw] p-4 py-1' type="text" name="username" id="username" />
                        <div className='relative flex items-center'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password...' className='rounded-full border border-green-500 w-[50vw] md:w-[22vw] p-4 py-1' type="password" name="password" id="password" />
                            <span className='relative right-[3px] top-[4px] cursor-pointer' onClick={showPassword}  >
                                <img className='p-1' width={26} ref={ref} src="icons/eye-icon-1459.png" alt="eye" />
                            </span>

                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-4 items-center border-2 border-green-900 bg-green-700 rounded-full hover:bg-green-600 w-fit px-4 py-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Save Password</button>
                </div>

                <div className="passwords flex flex-col items-center">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div> No password to show </div>}
                    {passwordArray.length != 0 && <div className="overflow-x-auto">
                    <table className="table-auto min-w-full w-[50vw] rounded-md mb-3 overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2 '>URL</th>
                                <th className='py-2 '>Username</th>
                                <th className='py-2 '>Password</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 '>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='flex  items-center justify-center text-center  border border-white py-2'>

                                        <div className='flex  items-center justify-center'>
                                            <span><a href={item.site} target='_blank'>{item.site}</a></span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "15px", "height": "15px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    delay="500"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center w-32 border border-white py-2'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "15px", "height": "15px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    delay="500"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='text-center w-32 border border-white py-2'>
                                        <div className="flex items-center justify-center">
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "15px", "height": "15px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    delay="500"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center  w-32 border border-white py-2'>
                                        <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                style={{ "width": "15px", "height": "15px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                trigger="hover"
                                                delay="500"
                                            >
                                            </lord-icon></span>
                                        <span className='cursor-pointer mx-2' onClick={() => { DeletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/zxvuvcnc.json"
                                                trigger="hover"
                                                state="hover-cross-3"
                                                style={{ "width": "15px", "height": "15px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                delay="500"
                                            >
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            }
                            )}
                        </tbody>
                    </table>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
