export function Appbar({firstName}) {
    return <div className="shadow flex justify-between h-14">
        <div className="flex flex-col justify-center h-full ml-5 font-black">
            PayTM App
        </div>
        <div className="flex flex-row">
            <div className="flex justify-center h-full mt-5 mr-5">
                Hello, {firstName}
            </div>
            
            <div className="flex justify-center h-12 w-12 rounded-full bg-slate-200 mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">U</div>
            </div>
        </div>
    </div>
}