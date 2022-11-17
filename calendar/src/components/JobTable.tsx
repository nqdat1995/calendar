import { useContext, useEffect } from "react";
//import { TodoContextType } from "../context/@types.todo";
//import { TodoContext } from "../context/TodoContext";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../context/store";

const JobTable = () => {
  //const { todos } = useContext(TodoContext) as TodoContextType;
  const todos = useSelector((state: RootState) => state.todo)

  useEffect(() => {
    console.log(todos)
  }, [])

  return (
    <div className="table">
      <ul className="list">
        <li>
          <div>Task Name</div>
          <div>Start Date</div>
          <div>Duration</div>
          <div>Status</div>
        </li>
        {
          todos.map((todo, index) =>
            <li key={index}>
              <div>{todo.name}</div>
              <div>Start Date</div>
              <div>Duration</div>
              <div>Status</div>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default JobTable;