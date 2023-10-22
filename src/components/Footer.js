import '../app/globals.css'
import React from 'react'
import Colors from './Colors';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
const Footer = () => {
    return (
        <div className='bg-primary py-[2vw] px-[8vw] md:flex md:justify-between text-center '>
            <div className='font-bold text-sm md:text-[1.2 vw] text-fontdark' >
                RecipeNook © 2023 Teguh Kirana Berutu. All rights reserved.
            </div>
            <div className='flex flex-row md:text-[2vw] space-x-[1.5vw] text-fontdark justify-center py-4 md:pt-0'>
                <FaGithub />
                <FaLinkedin />
                <FaFacebook />
            </div>
        </div>

    )

}
export default Footer; 