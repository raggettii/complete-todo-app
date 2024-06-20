import { useEffect, useState } from "react";
import { authAxios } from "../functions/authAxios";
import { SubHeading } from "../components/SubHeading";
import { MarkAsDone } from "../components/MarkAsDone";

const AllTodos = () => {
  const [checkedTodoId, setCheckedTodoId] = useState(null);
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authAxios.get("http://localhost:3000/api/v1/todo/allTodos");
        setAllTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, [allTodos]);

  const handleCheckboxChange = (todoId) => {
    setCheckedTodoId(checkedTodoId === todoId ? null : todoId);
  };

  return (
    <div>
      <SubHeading data={"All Todos"} />
      {allTodos.length > 0 ? (
        <ul className="flex flex-col justify-center">
          {allTodos.map((item) => (
            <li className="border border-red-950 shadow-xl rounded-xl my-2 p-1" key={item.id}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`todo-checkbox-${item.id}`}
                  checked={checkedTodoId === item.id}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="m-1 p-1"
                />
                <div className="flex-1">
                  <strong>Title:</strong> {item.title} <br />
                  <strong>Description:</strong> {item.description}
                </div>
              </div>
              {checkedTodoId === item.id && <MarkAsDone doneTodo={item} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export { AllTodos };
