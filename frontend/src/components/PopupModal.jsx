import { InputBox } from "./InputBox";
import { Submit } from "./Submit";
import { authAxios } from "../functions/authAxios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { showModal } from "../pages/Dashboard";

const PopupModal = ({ showModal, setShowmodal }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSave = async () => {
    try {
      const response = await authAxios.post(
        "https://complete-todo-app.onrender.com/api/v1/todo/createtodo",
        {
          username: localStorage.getItem("username"),
          title,
          description,
        }
      );
    } catch (error) {
      console.error("Error fetching todos:", error);
      if (error.response && error.response.status === 401) {
        alert("Token Expired");
        console.log("Authentication error (401):", error.response.data);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/signin");
      } else {
      }
    }
    setTitle("");
    setDescription("");
    setShowmodal(false);
  };

  return (
    <>
      {showModal && (
        <div className="bg-black background-blur-sm fixed inset-0 bg-opacity-30">
          <div className="mt-10 flex flex-col gap-5 items-center  ">
            <div
              className="place-self-end fa-xl  mt-[140px] mr-[530px] cursor-pointer"
              onClick={() => {
                setShowmodal(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <div className="fixed mt-40 bg-indigo-400 rounded-lg shadow-2xl flex flex-col px-20 py-10 justify-center items-center">
              <InputBox
                onChange={(e) => setTitle(e.target.value)}
                label={"Title"}
                placeholder={"Enter Title of Task"}
              />
              <InputBox
                onChange={(e) => setDescription(e.target.value)}
                label={"Description"}
                placeholder={"Description"}
              />
              <Submit text={"Save Task"} onClick={handleSave} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { PopupModal };
