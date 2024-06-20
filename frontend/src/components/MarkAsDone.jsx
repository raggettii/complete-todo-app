import { useEffect, useState } from "react";
import {authAxios} from "../functions/authAxios";

const MarkAsDone = ({ doneTodo }) => {
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const markAsDone = async () => {
      try {
        const response = await authAxios.post("http://localhost:3000/api/v1/todo/markAsDone", doneTodo);
        setStatusMessage("Todo marked as done successfully.");
        console.log(response.data); // Optionally, you can use this data as needed
      } catch (error) {
        setStatusMessage("Error marking todo as done.");
        console.error("Error marking todo as done:", error);
      }
    };

    markAsDone();
  }, [doneTodo]);

  return (
    <div className="mt-2 p-2 bg-green-100 border border-green-500 rounded">
      {statusMessage}
    </div>
  );
};

export { MarkAsDone };
