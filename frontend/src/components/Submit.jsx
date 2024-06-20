// import { Link } from "react-router-dom"
const Submit = ({text,onClick}) =>{
    return <>
    <button onClick={onClick} type="button"
    className="flex-inline justify-center items-center p-2 px-7 my-3 bg-red-400  border-2 border-solid border-red-700 rounded-xl shadow-xl text-ms font-bold text-white hover:bg-red-700  "
    >
        {text}
    </button>
    </>
}

export {Submit};