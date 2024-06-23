import { useState, useEffect } from "react";
import { authAxios } from "../functions/authAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AllTodos = ({ showAll, setShowAll }) => {
  const [allTodos, setAllTodos] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleSelected = async (event, item) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      try {
        await authAxios.post("http://localhost:3000/api/v1/todo/markAsDone", {
          title: item.title,
          username: username,
        });
        console.log("Checked item title:", item.title);
        // Remove item from allTodos after marking as done
        setAllTodos((prev) => prev.filter((todo) => todo._id !== item._id));
      } catch (error) {
        console.error("Error marking as done:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authAxios.get("http://localhost:3000/api/v1/todo/allTodos", {
          headers: {
            username: username,
          },
        });
        setAllTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        if (error.response && error.response.status === 401) {
          handleTokenExpired();
        }
      }
    };

    if (showAll) {
      fetchData();
    }
  }, [showAll]);

  const handleTokenExpired = () => {
    // Avoid multiple alerts
    if (!localStorage.getItem("tokenExpiredAlertShown")) {
      alert("Token Expired");
      localStorage.setItem("tokenExpiredAlertShown", "true");

      console.log("Authentication error (401): Token Expired");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/signin");
    }
  };

  return (
    <>
      {showAll && (
        <div className="fixed inset-0 mt-[65px] bg-black bg-opacity-30 backdrop-blur-2xl">
          <div
            className="flex justify-end fa-2xl mr-8 ml-auto cursor-pointer"
            onClick={() => setShowAll(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <div className="text-white font-extrabold text-5xl text-center mb-8 p-3">
            Tasks to Complete
          </div>
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            {allTodos.length !== 0 ? (
              <ul>
                {allTodos.map((item) => (
                  <li key={item._id}>
                    <div className="mt-2 w-80 text-bold bg-white border-teal-800 rounded-lg shadow-xl p-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        onChange={(event) => handleSelected(event, item)}
                      />{" "}
                      <span className="font-bold text-lg text-green-800">
                        Title:{" "}
                      </span>{" "}
                      {item.title}
                      <br />
                      <span className="font-bold text-lg text-green-800">
                        Description:{" "}
                      </span>{" "}
                      {item.description}
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

export { AllTodos };
