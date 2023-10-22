"use client";
import React from 'react';
import '../app/globals.css'

const Loading = () => {
    return (

        <div className='fixed  overscroll-none z-50 h-[100%] w-full bg-black bg-opacity-90 flex items-center justify-center'>
            <div className='space-y-2'>
                <div className='coffee ml-2'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p className=''>Loading...</p>
            </div>
        </div>
    )
}

export default Loading