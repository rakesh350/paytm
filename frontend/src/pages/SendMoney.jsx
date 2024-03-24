import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { User } from "../components/User";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ErrorMessage } from "../components/ErrorMessage";

export function SendMoney() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState()

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-md bg-white w-80 text-center p-4 h-max px-4 space-y-3">
                <Heading label={'Send Money'} />
               
                <div className='flex flex-row space-x-4  text-xl font-bold mt-8'>
                    <div className="flex justify-center h-12 w-12 font-bold rounded-full flex-col text-center bg-green-600 text-white">U</div>
                    <div className="flex justify-center h-full flex-col mt-3">{name}</div>
                </div>
            
                <InputBox label={'Amount (in $)'} placeholder={'Enter amount'}  onChange={(e)=> {
                    setAmount(e.target.value)
                }}/>
                
                <button onClick={async () => {
                    try {
                        const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
                            to: id,
                            amount
                        }, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        alert('Transfer Successfull')
                        navigate('/dashboard')
                    } catch (error) {
                        setErrMsg(error.response.data.msg)
                    }
                }} type="button" className=" w-full text-white bg-green-600 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Initiate Transfer</button>
                <ErrorMessage message={errMsg}/>
            </div>
        </div>
    </div>
}