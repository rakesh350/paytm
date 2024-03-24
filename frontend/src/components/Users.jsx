import { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from './Button';
import { User } from "./User";

export function Users() {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then((response) => {``
                setUsers(response.data.users)
            })
            .catch((error) => {
                console.log(`Error getting response - ${error}`)
            })
    }, [filter])

    return <div className="flex flex-col justify-center p-5 space-y-3 w-full">
        <div className="font-bold text-lg">Users </div>
        <div>
            <input className="rounded-md border-2 w-full p-2" placeholder="Search users..." onChange={(e) => {
                setFilter(e.target.value)
            }} />
        </div>
        <div className="flex flex-col">
            { users.map((user) => {
                return <User userId={user.id} firstName={user.firstName} lastName={user.lastName} />
            }) }
        </div>
    </div>
}