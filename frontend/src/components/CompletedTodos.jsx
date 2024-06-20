import { useEffect ,useState} from "react";
import { authAxios } from "../functions/authAxios";
const CompletedTodos = () =>{
    const [allTodos, setAllTodos] =useState([]);
    useEffect(()=>{
        const fetchData = async() =>{
            const response = await authAxios.get("http://localhost:3000/api/v1/todo/completedTodo");
            setAllTodos(response.data);
            };
            fetchData();
        },[setAllTodos]);

    return <>
    {
        <div>
        <h2>Completed Todos</h2>
        {allTodos.length > 0 ? (
          <ul>
            {allTodos.map((item) => (
              <li key={item.id}>  {/* Use a unique identifier for each item */}
                {/* Access and display properties from the object (item) here */}
                <strong>Title:</strong> {item.title} <br />
                <strong>Description:</strong> {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    }
    </>
}

export {CompletedTodos};