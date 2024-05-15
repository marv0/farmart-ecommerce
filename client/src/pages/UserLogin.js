import React, {useState} from 'react'
import { toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const backgroundImage = 'https://as1.ftcdn.net/v2/jpg/02/65/94/38/1000_F_265943881_4yQ6bNgbUjtEvtjq3bDLPa42KmT0LItG.jpg'

    const handleLoginSubmit = async(event) => {
        event.preventDefault(); 

        if (!username) {
            toast.error('Username is required')
            return
        } else if(!password) {
            toast.error('Password cannot be empty')
            return
        } else {
            const formData = {
                username:username,
                password:password
            }

            const jsonData = JSON.stringify(formData);

            console.log("Submitted json Data:", jsonData)
            try {
                setLoading(true)
                const response = await fetch(`http://127.0.0.1:5555/login`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: jsonData
                });

                const responseData = await response.json();
                // const searchParams = new URLSearchParams(location.search);
                // const redirectTo = searchParams.get('redirect') || '/dashboard';
                // navigate(redirectTo);
                console.log(responseData)
                setLoading(false)
            } catch (error) {
                toast.error('An error occured')
                setLoading(false)
            }
        }
    }
  return (
    <div>
        <div className="bg-gray-300 py-16">
            <div 
                className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto 
                max-w-sm lg:max-w-4xl"
            >
                <div 
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{backgroundImage:`url(${backgroundImage})`}}>
                </div>
                <form 
                    className="w-full p-8 lg:w-1/2"
                    onSubmit={handleLoginSubmit}
                >
                    <h2 
                        className="text-2xl font-semibold text-gray-700 text-center"
                    >
                        Login
                    </h2>
                    <p 
                        className="text-xl text-gray-600 text-center"
                    >
                        Welcome back!
                    </p>
                    <div className="mt-4">
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Username
                        </label>
                        <input 
                            className="bg-gray-200 text-gray-700 focus:outline-none 
                            focus:shadow-outline border border-gray-300 rounded py-2 px-4 block 
                            w-full appearance-none" 
                            type="username" 
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label 
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Password
                            </label>
                            <a 
                                href="/#" 
                                className="text-xs text-gray-500 hover:text-green-500"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <input 
                            className="bg-gray-200 text-gray-700 focus:outline-none 
                            focus:shadow-outline border border-gray-300 rounded py-2 px-4 block 
                            w-full appearance-none" 
                            type="password" 
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-8">
                        {loading ? (
                            <button 
                                type='button'
                                className="bg-green-700 text-white font-bold py-2 px-4 w-full 
                                rounded hover:bg-green-600 flex items-center justify-center cursor-not-allowed"
                            >
                                <FaSpinner className='me-2 w-5 h-5 font-bold animate-spin'/>
                                Please Wait...
                            </button>
                        ) : (
                            <button 
                                type='submit'
                                className="bg-green-700 text-white font-bold py-2 px-4 w-full 
                                rounded hover:bg-green-600"
                            >
                                Login
                            </button>
                        )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="mb-3 text-base font-normal text-gray-700 dark:text-gray-400">
                            Do not have an account? 
                            <a 
                                href="/auth/user-register" 
                                className="ps-2 font-medium text-blue-600 hover:underline 
                                dark:text-primary-500"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
