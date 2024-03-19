import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";

export function Signup(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        console.log(firstName)
    }, [firstName])


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={'Sign up'}/>
                <SubHeading label={'Enter your information to create an account'}/>
                <InputBox placeholder={'John'} label={'First Name'} onChange={(e) => {
                    setFirstName(e.target.value);
                }}/>
            </div>
        </div>
    </div>
}