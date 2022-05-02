import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTodos, removeTodos, updateTodos } from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const DisplayTodos = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("active");
  const todos = useSelector((state) => state);

  const removeTodo = (id) => {
    dispatch(removeTodos(id));
  };
  const updateTodo = (obj) => {
    dispatch(updateTodos(obj));
  };
  const completeTodo = (id) => {
    dispatch(completeTodos(id));
  };
  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {todos.length > 0 && sort === "active"
            ? todos.map((item) => {
              return (
                item.completed === false && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    completeTodo={completeTodo}
                  />
                )
              );
            })
            : null}
          {todos.length > 0 && sort === "completed"
            ? todos.map((item) => {
              return (
                item.completed === true && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    completeTodo={completeTodo}
                  />
                )
              );
            })
            : null}
          {todos.length > 0 && sort === "all"
            ? todos.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                  completeTodo={completeTodo}
                />
              );
            })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
