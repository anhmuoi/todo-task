import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // get from localStorage
  todoItems: JSON.parse(localStorage.getItem('todoItems')) || [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add(state, action) {
      const newItem = action.payload;

      state.todoItems.push(newItem);
    },
    remove(state, action) {
      state.todoItems = state.todoItems.filter((item) => item.id !== action.payload);
    },
    update(state, action) {
      return {
        ...state,
        todoItems: state.todoItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              ...action.payload,
            };
          }
          return item;
        }),
      };
    },
    checked(state, action) {
      state.todoItems = state.todoItems.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    },

    removeChecked(state, action) {
      state.todoItems = state.todoItems.filter((item) => item.checked === false || item.checked === undefined);
    },
  },
});
const { actions, reducer } = todoSlice;
export const { add, remove, update, removeChecked, checked } = actions;
export default reducer;
