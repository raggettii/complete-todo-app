import { useState, useEffect } from "react";
import { authAxios } from "../functions/authAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CompletedTodos = ({ showCompleted, setShowCompleted }) => {
  const navigate = useNavigate();
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await authAxios.get(
          `https://complete-todo-app.onrender.com/api/v1/todo/completedTodo?username=${username}`
        );
        setCompletedTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        if (error.response && error.response.status === 401) {
          alert("Token Expired");
          console.log("Authentication error (401):", error.response.data);
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/signin");
        }
      }
    };

    fetchData();
  }, [showCompleted, navigate]);

  return (
    <>
      {showCompleted && (
        <div className="fixed inset-0 mt-[65px] bg-black backdrop-blur-2xl bg-opacity-30">
          <div
            className="flex justify-end fa-2xl mr-[400px] ml-[1000px] cursor-pointer"
            onClick={() => setShowCompleted(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <div className="text-white font-extrabold text-5xl text-center mb-8 p-3">
            Completed Tasks
          </div>
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            {completedTodos.length !== 0 ? (
              <ul>
                {completedTodos.map((item) => (
                  <li key={item._id}>
                    <div className="mt-2 w-[488px] bg-white border-teal-800 rounded-lg shadow-xl p-2">
                      {item.title}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center mt-80">No tasks Found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { CompletedTodos };
