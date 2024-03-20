import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";

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
                <InputBox label={'Last Name'} placeholder={'Doe'} onChange={(e)=> {setLastName(e.target.value)}}/>
                <InputBox label={'Email'} placeholder={'johndoe@gmail.com'} onChange={(e)=> {setEmail(e.target.value)}}/>
                <InputBox label={'Password'} placeholder={'******'} onChange={(e)=> { setPassword(e.target.value) }}/>
                <Button label={'Sign up'} onClick={(e)=>{console.log('Button clicked')}}/>
                <BottomWarning label={'Alreay have an account'} buttonText={'Sign in'} to={"/signin"}/>
            </div>
        </div>
    </div>
}