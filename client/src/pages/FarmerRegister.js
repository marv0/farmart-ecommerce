import React, {useState} from 'react'
import iconPhoto from '../assets/friesian.jpg'

export default function FarmerRegister() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const user_type = 'farmer'

    const handleFarmerRegistrationSubmit = (event) => {
        event.preventDefault(); 
        
        if (!username) {
            console.log('Username cannot be empty')
            return
        }else if (!email) {
            console.log('Email cannot be empty')
            return
        } else if(!password) {
            console.log('Password required')
            return
        } else if(!confirmPassword){
            console.log('Please confirm your password')
            return
        } else if(password !== confirmPassword){
            console.log('Your passwords do not match')
            return
        } else{
            const formData = {
                username:username,
                email:email,
                password:password,
                user_type:user_type
            }

            const jsonData = JSON.stringify(formData);
            console.log("Submitted json Data:", jsonData)
        }

        // Reset form fields if needed
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };
  return (
    <div>
        <section>
            <div 
                className="min-w-screen min-h-screen bg-gray-200 flex items-center 
                justify-center px-5 py-5"
            >
                <div 
                    className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full 
                    overflow-hidden" 
                    style={{maxWidth: '1000px'}}
                >
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-indigo-500">
                            <img 
                                src={iconPhoto}
                                alt='Farmer Registration'
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 
                                    className="font-bold text-3xl text-gray-900"
                                >
                                    Farmer Registration
                                </h1>
                                <p>
                                    Fill in your information to register as a farmer
                                </p>
                            </div>
                            <form onSubmit={handleFarmerRegistrationSubmit}>
                                {/* <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-5">
                                        <label 
                                            htmlFor="" 
                                            className="text-xs font-semibold px-1"
                                        >
                                            First name
                                        </label>
                                        <div className="flex">
                                            <div 
                                                className="w-10 z-10 pl-1 text-center 
                                                pointer-events-none flex items-center justify-center"
                                            >
                                                <i 
                                                    className="mdi mdi-account-outline 
                                                    text-gray-400 text-lg"
                                                ></i>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg 
                                                border-2 border-gray-200 outline-none 
                                                focus:border-indigo-500" 
                                                placeholder="John"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-5">
                                        <label 
                                            htmlFor="" 
                                            className="text-xs font-semibold px-1"
                                        >
                                            Last name
                                        </label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="text" 
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg 
                                                border-2 border-gray-200 outline-none 
                                                focus:border-indigo-500" 
                                                placeholder="Smith"
                                            />
                                        </div>
                                    </div>
                                </div> */}

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-2">
                                        <label 
                                            htmlFor="username" 
                                            className="text-xs font-semibold px-1"
                                        >
                                            Username
                                        </label>
                                        <div className="flex">
                                            <input 
                                                type="username" 
                                                id='username'
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full pl-4 pr-3 py-2 rounded-lg 
                                                border-2 border-gray-200 outline-none 
                                                focus:border-indigo-500" 
                                                placeholder="johnsmith@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-2">
                                        <label 
                                            htmlFor="email" 
                                            className="text-xs font-semibold px-1"
                                        >
                                            Email
                                        </label>
                                        <div className="flex">
                                            <input 
                                                type="email"
                                                id='email' 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-4 pr-3 py-2 rounded-lg 
                                                border-2 border-gray-200 outline-none 
                                                focus:border-indigo-500" 
                                                placeholder="johnsmith@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-2">
                                        <label 
                                            htmlFor="password" 
                                            className="text-xs font-semibold px-1"
                                        >
                                            Password
                                        </label>
                                        <div className="flex">
                                            <input 
                                                type="password"
                                                id='password' 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-4 pr-3 py-2 rounded-lg 
                                                border-2 border-gray-200 outline-none 
                                                focus:border-indigo-500" 
                                                placeholder="************"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-4">
                                        <label 
                                            htmlFor="confirmPassword" 
                                            className="text-xs font-semibold px-1"
                                        >
                                            Confirm Password
                                        </label>
                                        <div className="flex">
                                            <input 
                                                type="password"
                                                id='confirmPassword'
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                                className="w-full  pl-4 pr-3 py-2 rounded-lg 
                                                border-2 border-gray-200 outline-none 
                                                focus:border-indigo-500" 
                                                placeholder="************"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button 
                                            type='submit'
                                            className="block w-full max-w-xs mx-auto bg-indigo-500 
                                            hover:bg-indigo-700 focus:bg-indigo-700 text-white 
                                            rounded-lg px-3 py-3 font-semibold"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <p className="mb-3 text-base font-normal text-gray-700 dark:text-gray-400">
                                    Already have an account? 
                                    <a 
                                        href="/auth/login" 
                                        className="ps-2 font-medium text-blue-600 hover:underline 
                                        dark:text-primary-500"
                                    >
                                        Sign in
                                    </a>
                                </p>
                                <p className="text-base font-normal text-gray-700 dark:text-gray-400">
                                    Are you a customer? 
                                    <a 
                                        href="/auth/user-register" 
                                        className="ps-2 font-medium text-blue-600 hover:underline 
                                        dark:text-primary-500"
                                    >
                                        Sign up as a customer
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
