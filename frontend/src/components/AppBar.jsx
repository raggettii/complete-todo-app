import {UserPhoto} from "../components/UserPhoto";


const AppBar = () => {
    return <>
    <div className="flex-inline justify-start ">
        <div className="bg-red-200 mx-0 p-2 border border-dotted border-opacity-30 shadow-2xl rounded-md">
            <UserPhoto></UserPhoto>
        </div>
    </div>
    </>
}


export {AppBar};