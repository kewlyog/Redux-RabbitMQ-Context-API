import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask } from "./app/slices/taskSlice";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <div style={{ padding: 20 }}>
        <h1>Task Processing Dashboard</h1>
        <button onClick={() => dispatch(addTask({ title: "New Task", description: "Example" }))}>Add Task</button>
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              {t.title} - {t.status}
            </li>
          ))}
        </ul>
      </div>
    </ThemeProvider>
  );
}

export default App;
