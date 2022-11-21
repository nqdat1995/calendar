import { useContext, useEffect, useState } from "react";
//import { TodoContextType } from "../context/@types.todo";
//import { TodoContext } from "../context/TodoContext";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../context/store";
import { Todo } from "../dto/Todo.dto";
import axios from 'axios';
import { TodoStatus } from "../context/features/todo/todoSlice";

const JobTable = () => {
  //const { todos } = useContext(TodoContext) as TodoContextType;
  //const todos = useSelector((state: RootState) => state.todo)
  const [todos, setTodos] = useState<Todo[]>([]);
  const calendar = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    const fetchData = async () => {
      var param = `${calendar.currYear}${(calendar.currMonth + 1).toString().padStart(2, '0')}${calendar.currDate}`;
      console.log(param);
      var todoResponse = await axios.get<Todo[]>(`http://localhost:3000/todo/${param}`);
      console.log(todoResponse.data);
      setTodos(todoResponse.data);
    }

    fetchData().catch((err) => {
      console.error(err)
    })
  }, [calendar])

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
              <div>{todo.startDate.toString()}</div>
              <div>{todo.duration}</div>
              <div>{TodoStatus[todo.status]}</div>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default JobTable;