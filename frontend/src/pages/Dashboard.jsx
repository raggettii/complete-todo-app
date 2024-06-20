import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllTodos } from '../components/AllTodos';
import { CompletedTodos } from '../components/CompletedTodos';
import { AppBar } from '../components/AppBar';
import { Dropdown } from "../components/DropDown";
import { Submit } from "../components/Submit";
import { Popup } from "../components/Popup";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOpenPopup = () => {
    setShowPopUp(true);
  };

  const handleClosePopup = () => {
    setShowPopUp(false);
  };

  return (
    <>
      <AppBar />
      <div className="bg-red-100 h-full flex justify-center">
        <div className="flex flex-col items-center">
          <div className="mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            ToDo List
          </div>
          <Dropdown
            trigger="View"
            items={[
              { label: 'All Todos', componentToRender: AllTodos },
              { label: 'Completed Todos', componentToRender: CompletedTodos }
            ]}
          />
          <Submit text="Add Task" onClick={handleOpenPopup} />
          {showPopUp && <Popup onClose={handleClosePopup} />} {/* Render Popup conditionally */}
          <Submit
            text="LogOut"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              navigate("/signin");
            }}
          />
        </div>
      </div>
    </>
  );
}

export { Dashboard };
