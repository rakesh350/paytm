import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

export function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()

    return <div className="bg-slate-300 flex h-screen justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 p-2 rounded-lg text-center px-4">
                <Heading label={'Sign in'}/>
                <SubHeading label={'Enter you Email ID and Password to Sign in'}/>
                <InputBox label={'Email'} placeholder={'john@email.com'} onChange={(e)=> {
                    setEmail(e.target.value)
                }}/>
                <InputBox label={'Password'} placeholder={'********'} onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <ErrorMessage message={errorMsg}/>
                <Button label={'Sign In'} onClick={ async () => {
                    try {
                        const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                            email,
                            password
                        })
                        setErrorMsg('')
                        localStorage.setItem('token', response.data.token)
                        navigate('/dashboard')
                    } catch (error) {
                        setErrorMsg(error.response.data.msg)
                    }
                }}/>
                <BottomWarning label={"Don't have an account?"} buttonText={'Sign Up'} to={'/signup'}/>
            </div>
        </div>
    </div>
}