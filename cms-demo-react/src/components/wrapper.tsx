import React, { useEffect, useState } from 'react'
import Card from './Card'

type Props = {}



type Person = {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    image: string;
    gender: string;
}


export default function Wrapper({ }: Props) {

    const [data, setData] = useState<Person[]>([])


    useEffect(() => {
        fetch("https://fakerapi.it/api/v2/persons?_quantity=15")
            .then(response => response.json())
            .then(fdata => {
                console.log(fdata);
                if (fdata && fdata.data) {
                    setData(fdata.data.map((item: any) => ({
                        id: item.id,
                        firstname: item.firstname,
                        lastname: item.lastname,
                        phone: item.phone,
                        image: item.image,
                        gender: item.gender
                    })));
                }
            })
            .catch(err => console.log(err))


    }, [0])



    return (
        <div className='pb-20'>
            <div className='font-bold text-6xl flex justify-end pb-15 p-3 pt-15 pr-10 text-white'>HTL Dornbirn 5bwi</div>

            <div className='flex justify-center'>
                <div className='grid grid-cols-1 gap-15 pl-4 pr-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 '>
                    {data.map((person) => (
                        <Card
                            key={person.id}
                            image={person.gender === "male" ? `https://randomuser.me/api/portraits/men/${person.id}.jpg` : `https://randomuser.me/api/portraits/women/${person.id}.jpg`}
                            name={`${person.firstname} ${person.lastname}`}
                            number={person.phone}
                            text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "
                        />
                    ))}


                </div>
            </div>



        </div>
    )
}