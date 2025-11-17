import React, { useEffect, useState } from 'react'
import Card from './Card'
import { RealAPI } from '../api/RealAPI'
import type { Person } from '../utils/types'
import { FakeAPI } from './../api/FakeAPI';



type Props = {}



export default function Wrapper({ }: Props) {

    const [data, setData] = useState<Person[]>([])

    /*
        useEffect(() => {
            
        }, [0])
    */

    useEffect(() => {
        const loadData = async () => {
            const api = new RealAPI();
            const people: Person[] = await api.fetchPeople() ?? [];
            setData(people);
        };
        loadData();
    }, [])



    return (
        <div className='pb-20'>
            <div className='text-6xl flex justify-end pb-15 p-3 pt-15 pr-10 text-white font-bold'>HTL Dornbirn 5bwi</div>

            <div className='flex justify-center'>
                <div className='grid grid-cols-1 gap-20 pl-4 pr-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 '>
                    {data.map((person) => (
                        <Card
                            key={person.id}
                            image={person.image}
                            name={`${person.Name}`}
                            number={person.Phone_Number}
                            text={person.Text}
                        />
                    ))}


                </div>
            </div>



        </div>
    )
}