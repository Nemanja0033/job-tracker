"use client"
import SignInButton from './SingIn'

const Navbar = () => {
  return (
    <div className='w-full h-[60px] shadow-md  bg-gray-50 z-9999 flex items-center px-10 justify-end'>
        <SignInButton />
    </div>
  )
}

export default Navbar