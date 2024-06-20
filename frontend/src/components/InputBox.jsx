function InputBox({onChange ,label , placeholder}){
    return <>
    <div className="text-left pl-2 pt-4 font-mono font-bold text-gray-950">
        {label}
    </div>
    <input onChange={onChange} className="border border-gray-300 rounded-md w-full flex justify-left pl-1 pt-1 pb-1" type="text" placeholder={placeholder}/>
    </>
}


export {InputBox};