import React from "react";
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

function Header(){
    const authStatus = useSelector((state) => state.auth.status)
    
    const navigate = useNavigate()
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]

    return(
        <header className='py-3 shadow bg-gray-500'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo width='70px'   />
  
                    </Link>
                </div>
                <ul className="flex ml-auto">
                    {navItems.map((item) =>
                    item.active ? (
                        <li key = {item.name}>   {/*We need to apply keys when HTML element is repeating*/}
                            <button 
                             onClick={() => navigate(item.slug)}     //Slug value given above in list
                             className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"                           
                            >{item.name}
                            </button>
                        </li>             
                    ) : null)}
                    {authStatus && (         //if cond. is true then () execute therefore && used
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
             </nav>
        </Container>
        </header>
    )
}

export default Header