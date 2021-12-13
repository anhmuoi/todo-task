import './App.css';
import NewTask from './components/NewTask/NewTask.jsx';
import './App.scss';
import TodoList from './components/TodoList/TodoList.jsx';

function App() {
  return (
    <div className="app">
      <div className="app__newTask">
        <NewTask />
      </div>
      <div className="app__todoList">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
