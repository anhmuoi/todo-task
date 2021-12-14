import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChecked } from '../../app/todoSlice.js';
import Todo from '../Todo/index.jsx';
import './TodoList.scss';

function TodoList(props) {
  const dispatch = useDispatch();

  const selectorChecked = useSelector((state) =>
    state.todo.todoItems.map((item) => {
      if (Boolean(item.checked) === true) {
        return true;
      }
      return false;
    })
  );

  const todoListSelect = useSelector((state) => state.todo);
  console.log(todoListSelect);
  const todoListSort = [...todoListSelect?.todoItems].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
  localStorage.setItem('todoItems', JSON.stringify(todoListSort));

  const [search, setSearch] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleRemoveChecked = () => {
    dispatch(removeChecked());
  };

  useEffect(() => {
    const handleSearch = () => {
      const filter = todoListSelect.todoItems.filter((item) => {
        if (item.title.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      });
      setTodoList(filter);
    };
    handleSearch();
  }, [search, todoListSelect.todoItems]);

  return (
    <div className="todoList">
      <h1 className="heading">To Do List</h1>
      <input className="textSearch" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
      <div className="todoList__list">
        {todoListSort && todoList.length === 0
          ? todoListSort?.map((todo) => <Todo key={todo.title} todo={todo} />)
          : todoList.map((todo) => <Todo key={todo.title} todo={todo} />)}
      </div>
      {selectorChecked.find((e) => e === true) === true && (
        <div className="bulkAction">
          <p>Bulk Action:</p>
          <div className="bulkAction__button">
            <button className="bulkAction__done">Done</button>
            <button className="bulkAction__remove" onClick={() => handleRemoveChecked()}>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
