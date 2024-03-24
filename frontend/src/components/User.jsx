import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

export function User({ userId, firstName, lastName }) {
    const navigate = useNavigate()

    return <div className='flex flex-col justify-center'>
        <div className="flex flex-row justify-between h-12">
            <div className="h-full">
                <div className='flex flex-row space-x-2'>
                    <div className="flex justify-center h-8 w-8 font-bold rounded-full flex-col text-center bg-slate-200">U</div>
                    <div className="flex justify-center h-full flex-col mt-1">{firstName} {lastName}</div>
                </div>
            </div>
            <div className="flex flex-col h-full"> <Button label={'Send Money'} onClick={(e)=>{
                navigate(`/send?id=${userId}&name=${firstName}`)
            }}/> </div>
        </div>
    </div>

}