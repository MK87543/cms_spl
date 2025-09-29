import React from 'react'
import Card from './card'

type Props = {}

export default function Wrapper({ }: Props) {
    return (
        <div className='bg-amber-800 h-screen w-screen'>
            <div className='font-bold text-4xl flex justify-end'>HTL Dronbirn 5bwi</div>

            <Card />
        </div>
    )
}