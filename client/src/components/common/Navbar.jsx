import React, {useState} from 'react'
import Logo from '../../assets/logo.webp'
import { BsCartDash } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
// import { CiHeart } from "react-icons/ci"; 
import { FaAngleDown } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'
import { totalCartItemsSelector } from '../../store/features/CartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    const [navOpen, setNavOpen] = useState(false)
    const totalItems = useSelector(totalCartItemsSelector)

    const logout = () =>{
        localStorage.removeItem("user")
        toast.success('Logout succesful')
        navigate('/auth/login')
    }

  return (
    <header className='flex border-b bg-white font-sans min-h-[70px] tracking-wide relative z-50'>
        <div className='flex flex-wrap items-center justify-between px-10 py-3 gap-4 w-full'>
            <a href="/">
                <img 
                    src={Logo}
                    alt="logo" 
                    className='w-28' 
                />
            </a>
    
            <div 
                id="collapseMenu"
                className={`lg:!block max-lg:before:fixed 
                max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 
                max-lg:before:z-50 ${navOpen ? 'block' : 'none max-lg:hidden'}`}
            >
                <button 
                    id="toggleClose"
                    onClick={() => setNavOpen(!navOpen)}
                    className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'
                >
                    <IoCloseCircleOutline className="w-6 h-6 fill-black" />
                </button>
        
                <ul
                    className='lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white 
                    max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 
                    max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'
                >
                    <li className='mb-6 hidden max-lg:block'>
                        <a href="/">
                            <img 
                                src={Logo} 
                                alt="logo" 
                                className='w-28' 
                            />
                        </a>
                    </li>
                    <li 
                        className='max-lg:border-b max-lg:py-3'
                    >
                        <a 
                            href='/'
                            className='hover:text-blue-600 text-[15px] font-bold 
                            text-gray-600 block'
                        >
                            Home
                        </a>
                    </li>
                    <li className='max-lg:border-b max-lg:py-3'>
                        <a 
                            href='/store'
                            className='hover:text-[#007bff] text-gray-600 text-[15px] font-bold block'
                        >
                            Our Store
                        </a>
                    </li>
                    <li 
                        className='max-lg:border-b max-lg:py-3'
                    >
                        <a 
                            href='/about-us'
                            className='hover:text-[#007bff] text-gray-600 text-[15px] font-bold block'
                        >
                            About Us
                        </a>
                    </li>
                    <li 
                        className='max-lg:border-b max-lg:py-3'
                    >
                        <a 
                            href='/contact-us'
                            className='hover:text-[#007bff] text-gray-600 text-[15px] font-bold block'
                        >
                            Contact
                        </a>
                    </li>

                    <li className='group max-lg:border-b max-lg:py-3 relative'>
                        <button href='/#'
                            className='hover:text-[#007bff] text-gray-600 text-[15px] font-bold 
                            lg:hover:fill-[#007bff] block'
                        >
                            Account
                            <FaAngleDown className="ml-1 inline-block" width="16px" height="16px" />
                        </button>
                        <ul
                            className='absolute shadow-lg bg-white space-y-3 lg:top-5 max-lg:top-8 
                            -left-6 min-w-[250px] z-50 max-h-0 overflow-hidden group-hover:opacity-100 
                            group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 
                            transition-all duration-500'
                        >
                            {user && (
                                <>
                                    <li className='border-b py-2 '>
                                        <a 
                                            href='/user-dashboard'
                                            className='hover:text-[#007bff] text-gray-600 text-[15px] 
                                            font-bold block'
                                        >
                                            Your Dashboard
                                        </a>
                                    </li>
                                    <li className='border-b py-2 '>
                                        <button
                                            onClick={() => logout()}
                                            className='hover:text-[#007bff] text-gray-600 text-[15px] 
                                            font-bold block'
                                        >
                                            Sign Out
                                        </button>
                                    </li>   
                                </>                    
                            )}
                            {!user && (
                                <>
                                    <li className='border-b py-2 '>
                                        <a 
                                            href='/auth/login'
                                            className='hover:text-[#007bff] text-gray-600 text-[15px] 
                                            font-bold block'
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li className='border-b py-2 '>
                                        <a 
                                            href='/auth/user-register'
                                            className='hover:text-[#007bff] text-gray-600 text-[15px] 
                                            font-bold block'
                                        >
                                            Register as Customer
                                        </a>
                                    </li>
                                    <li className='border-b py-2 '>
                                        <a 
                                            href='/auth/farmer-register'
                                            className='hover:text-[#007bff] text-gray-600 text-[15px] 
                                            font-bold block'
                                        >
                                            Register as Farmer
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </li>
                </ul>
            </div>
    
            <div className='flex items-center space-x-8 max-lg:ml-auto'>
                
                {/* <span className="relative">
                    <CiHeart 
                        className="w-5 h-5 cursor-pointer fill-[#333] hover:fill-[#007bff] inline" 
                    />
                    <span 
                        className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 
                        text-xs text-white"
                    >
                        0
                    </span>
                </span> */}
        
                <a 
                    href='/cart'
                    className="relative"
                >
                    <BsCartDash 
                        className="w-5 h-5 cursor-pointer fill-[#333] hover:fill-[#007bff] inline" 
                    />
                    <span 
                        className="absolute left-auto -ml-1 top-0 rounded-full bg-black 
                        px-1 py-0 text-xs text-white"
                    >
                        {totalItems}
                    </span>
                </a>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="20px"
                className="cursor-pointer fill-[#333] hover:fill-[#007bff]">
                <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                </path>
                </svg> */}
        
                <button 
                    id="toggleOpen" 
                    onClick={() => setNavOpen(!navOpen)}
                    className='lg:hidden'
                >
                    <FaBars 
                        className="w-6 h-6 fill-[#333] hover:fill-[#007bff]" 
                    />
                </button>
            </div>
        </div>
    </header>
  )
}
