import React, { useState } from 'react'; 
import axios from "axios";
import { authAxios } from '../functions/authAxios';
import { InputBox } from './InputBox';
import { Submit } from './Submit';
function Popup({ onClose }) { 

  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    try {
      const response = await authAxios.post("http://localhost:3000/api/v1/todo/createtodo", {
        title,
        description,
      });
      console.log(response);

      if (!response.data.msg2) {
        console.log("Duplicate TODO");
      } else {
        console.log('Data saved successfully!');
        // Clear input fields and close pop-up after successful save
        setTitle('');
        setDescription('');
        onClose();
      }
    } catch (error) {
      console.error("Error saving data:", error);
      // Handle potential errors from the API call (optional)
    }
  };

  return (
    <div className="flex  justify-center h-full w-full border border-dotted border-red-500  rounded-xl shadow-lg m-4 p-3"> {/* Style the pop-up container */}
      <div className=""> {/* Style the pop-up content */}
        <div className='flex-col justify-center'></div>
        <InputBox onChange={(e) => setTitle(e.target.value)} label={"Title"} placeholder={"Enter Title of TODO"}/>
        <InputBox onChange={(e) => setDescription(e.target.value)} label={"Description"} placeholder={"Description"}/>
        <div className='flex justify-center '>
        <Submit text={"Save ToDo"} onClick={handleSave}/>
        </div>
      </div>
    </div>
  );
}

export  {Popup};
