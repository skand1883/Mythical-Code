import React from 'react'
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='h-[10vh] bg-[#201E43] fixed w-full z-10'>
      <div className='w-10/12 mx-auto flex justify-between h-full items-center'>
        <Link to="/"><h1 className='text-white text-3xl font-semibold'>Mythical Code</h1></Link>

        <nav className=''>
            <ul className='flex gap-x-5 text-white'>
                <li><NavLink to='/codingArena'>Coding Arena</NavLink></li>
                <li><NavLink to={'codingplayground'}>Coding Battleground</NavLink></li>
            </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
