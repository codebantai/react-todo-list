import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Todos = () => {
  const [todotext, settodotext] = useState("");
  const [todos, settodos] = useState([
    {
      text: "running",
      id: 1,
      isCompleted: true,
      edit: false,
    },
    {
      text: "gaming",
      id: 2,
      isCompleted: false,
      edit: false,
    },
    {
      text: "read",
      id: 3,
      isCompleted: false,
      edit: false,
    },
  ]);

  const setTodoText = (e) => {
    settodotext(e.target.value);
  };
  const handleEdit = (id) => {
    const button = document.getElementById(id);

    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (todo.edit) {
          todo.edit = false;
          button.classList.remove("fa-save");
          button.classList.add("fa-edit", "edit");
        } else {
          button.classList.remove("fa-edit", "edit");
          button.classList.add("fa-save");

          todo.edit = true;
        }

        return todo;
      }
      return todo;
    });
    settodos(updatedTodos);
  };
  const addTodo = () => {
    const newTodo = {
      id: uuidv4(),
      text: todotext,
      isCompleted: false,
      edit: false,
    };
    if (newTodo.text !== "") settodos([newTodo, ...todos]);

    settodotext("");
  };

  const checkCompleted = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (todo.isCompleted) todo.isCompleted = false;
        else todo.isCompleted = true;

        return todo;
      }
      return todo;
    });
    settodos(updatedTodos);
  };

  const todoDelete = (id) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id);

    settodos(updatedTodos);
  };

  const addEdit = (e, id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = e.target.value;

        return todo;
      }
      return todo;
    });
    settodos(updatedTodos);
  };

  return (
    <div style={{ paddingTop: "10px" }}>
      <h1>TODOLIST </h1>
      <p>
        {" "}
        CREATED BY VK{" "}
        <a
          href="https://github.com/codebantai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i className="fab fa-github fa-2x" style={{ paddingLeft: "10px" }}>
            {" "}
          </i>
        </a>
      </p>

      <div
        className="card"
        style={{ width: "30vw", padding: "5px", minWidth: "80vw" }}
      >
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={todotext}
            onChange={(e) => setTodoText(e)}
            placeholder="Enter todo"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <i
              className="fas fa-plus"
              onClick={() => addTodo()}
              style={{ color: "f068", padding: "7px" }}
            ></i>
          </div>
        </div>

        <ul className="list-group list-group-flush">
          {todos.map((todo) => {
            return (
              <li className="list-group-item" key={todo.id}>
                <div
                  className=""
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => checkCompleted(todo.id)}
                  />

                  {!todo.edit ? (
                    <span
                      className={
                        todo.isCompleted ? `completed` : null + " " + todo.id
                      }
                    >
                      {" "}
                      {todo.text}{" "}
                    </span>
                  ) : (
                    <input
                      className="edit-input"
                      type="text"
                      value={todo.text}
                      onChange={(e) => addEdit(e, todo.id)}
                      style={{
                        marginLeft: "10px",
                        outline: "none !important",
                        height: "25px",
                      }}
                    />
                  )}

                  {!todo.isCompleted ? (
                    <i
                      className="edit fas fa-edit"
                      id={todo.id}
                      onClick={(e) => handleEdit(todo.id)}
                    >
                      {" "}
                    </i>
                  ) : (
                    <i
                      className="edit fas fa-edit invisible"
                      id={todo.id}
                      onClick={(e) => handleEdit(todo.id)}
                      disabled
                    ></i>
                  )}

                  <i
                    className="fas fa-trash"
                    onClick={() => todoDelete(todo.id)}
                  ></i>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
