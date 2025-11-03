import React, { useEffect, useState } from 'react'

type Props = {
    image: String
    name: String
    text: String
    number: String
}

export default function Card({ image, name, number, text }: Props) {
    return (
        <div className='bg-white rounded-lg w-70 border-white border-1'>
            <img className="w-full h-64 object-cover rounded-lg" src={`${image}`} alt="image" />
            <div className='p-4'>
                <p className='font-bold text-sm mb-2'>{name}</p>
                <p className=' text-sm mb-2'>{number}</p>
                <p className='text-xs text-gray-600 leading-relaxed'>{text}</p>
            </div>
        </div>
    )
}
