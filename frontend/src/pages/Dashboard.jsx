import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../assets/image3.png";
import { Submit } from "../components/Submit";
import { PopupModal } from "../components/PopupModal";
import { CompletedTodos } from "../components/CompletedTodos";
import { AllTodos } from "../components/AllTodos";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a valid token exists
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Boolean cast to determine auth status
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false); // Update state after logout
    navigate("/signin");
  };

  const handleDropdownToggle = () => setDropdown(!dropdown);

  return (
    <>
      <div
        className="bg-cover bg-center h-screen bg-gray-300"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <header className="bg-blue-100">
          <nav className="flex justify-between items-center h-16">
            <a className="m-2 border border-black rounded-xl shadow-lg p-2 font-bold text-3xl font-mono">
              TaskEase
            </a>
            <div className="hidden md:flex">
              <a
                className="m-4 font-bold hover:text-red-800 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </a>
              <a
                className="m-4 font-bold hover:text-red-800 cursor-pointer"
                onClick={() => setShowAll(true)}
              >
                Tasks
              </a>
              <a
                className="m-4 font-bold hover:text-red-800 cursor-pointer whitespace-nowrap"
                onClick={() => setShowModal(true)}
              >
                Add new Task
              </a>
              <a
                className="m-4 font-bold hover:text-red-800 cursor-pointer whitespace-nowrap"
                onClick={() => setShowCompleted(true)}
              >
                Completed Tasks
              </a>
              {!isAuthenticated && (
                <>
                  <div className="hidden lg:flex mx-4">
                    <Submit
                      text={"SignIn"}
                      onClick={() => navigate("/signin")}
                    />
                  </div>
                  <div className="hidden lg:flex">
                    <Submit
                      text={"SignUp"}
                      onClick={() => navigate("/signup")}
                    />
                  </div>
                </>
              )}
              {isAuthenticated && (
                <div className="hidden lg:flex">
                  <Submit text={"LogOut"} onClick={handleLogout} />
                </div>
              )}
            </div>
            <div className="mr-3">
              <FontAwesomeIcon
                onClick={handleDropdownToggle}
                className="flex md:hidden fa-lg cursor-pointer hover:text-red-900"
                icon={faBars}
              />
            </div>
          </nav>
          {dropdown && (
            <div className="bg-blue-100 h-screen flex flex-col items-center">
              <a
                className="m-4 font-bold hover:text-red-800 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </a>
              <a
                className="m-4 font-bold hover:text-red-800 cursor-pointer"
                onClick={() => setShowAll(true)}
              >
                Tasks
              </a>
              <a
                className="m-4 font-bold hover:text-red-800 cursor-pointer whitespace-nowrap"
                onClick={() => setShowModal(true)}
              >
                Add new Task
              </a>
              <a
                className="m-4 font-bold hover:text-red-800 cursor-pointer whitespace-nowrap"
                onClick={() => setShowCompleted(true)}
              >
                Completed Tasks
              </a>
              {!isAuthenticated && (
                <>
                  <Submit
                    text={"SignIn"}
                    onClick={() => navigate("/signin")}
                  />
                  <Submit
                    text={"SignUp"}
                    onClick={() => navigate("/signup")}
                  />
                </>
              )}
              {isAuthenticated && (
                <Submit text={"LogOut"} onClick={handleLogout} />
              )}
            </div>
          )}
        </header>
        <PopupModal showModal={showModal} setShowmodal={setShowModal} />
        <CompletedTodos
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
        />
        <AllTodos showAll={showAll} setShowAll={setShowAll} />
      </div>
    </>
  );
};

export { Dashboard };
