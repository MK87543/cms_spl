import React, { useEffect, useState } from 'react'
import Card from './Card'

type Props = {}



type Person = {
    id: number;
    Name: string;
    Phone_Number: string;
    image: string;
    Text: string;
}


export default function Wrapper({ }: Props) {

    const [data, setData] = useState<Person[]>([])

    /*
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
    */

    useEffect(() => {
        fetch("http://localhost:8055/items/People")
            .then(response => response.json())
            .then(fdata => {
                console.log(fdata);
                if (fdata && fdata.data) {
                    setData(fdata.data.map((item: any) => ({
                        id: item.id,
                        Name: item.Name,
                        Phone_Number: item.Phone_Number,
                        Text: item.Text,
                        image: "http://localhost:8055/assets/" + item.image,
                    })));
                }
            })
            .catch(err => console.log(err))
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