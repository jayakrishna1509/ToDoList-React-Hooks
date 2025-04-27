import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue,
        completed: false,
      },
    ]);
    setInputValue("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Start editing the task using window.prompt
  const startEditing = (id, text) => {
    const newText = window.prompt(
      "Edit this Task?",
      text // Pre-fill with the existing task text
    );

    // If the user entered something and didn't press cancel
    if (newText !== null && newText.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "auto",
        background: "#400d91",
        background:
          "radial-gradient(circle, rgba(64, 13, 145, 1) 0%, rgba(140, 23, 153, 1) 50%, rgba(13, 224, 206, 1) 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "400px", // Fixed height for square shape
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          padding: "70px",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            color: "#fff",
            textAlign: "center",
            position: "sticky",
            top: 0,
            zIndex: 1,
            paddingBottom: "10px",
            marginTop: 0,
          }}
        >
          To Do List
        </h1>

        <form
          onSubmit={addTodo}
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            position: "sticky",
            top: "54px",
            zIndex: 1,
            paddingBottom: "10px",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add New Task"
            style={{
              flex: 1,
              padding: "12px 15px",
              fontSize: "16px",
              border: "1px solid rgba(243, 240, 240, 0.92)",
              background: "black",
              color: "#fff",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              border: "none",
              backgroundColor: "rgba(28, 125, 6, 0.8)",
              color: "white",
              cursor: "pointer",
              whiteSpace: "nowrap",
              minWidth: "70px",
            }}
          >
            Add
          </button>
        </form>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {todos.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              No Tasks Yet
            </div>
          ) : (
            <ul
              style={{
                padding: 0,
                listStyle: "none",
                margin: 0,
              }}
            >
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "10px 0",
                    padding: "12px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    gap: "10px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      style={{
                        cursor: "pointer",
                        minWidth: "18px",
                        height: "18px",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color: todo.completed
                          ? "rgba(255, 255, 255, 0.5)"
                          : "#fff",
                        wordBreak: "break-word",
                        flex: 1,
                      }}
                    >
                      {todo.text}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexShrink: 0,
                    }}
                  >
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      style={{
                        padding: "6px 12px",
                        fontSize: "14px",
                        border: "none",
                        backgroundColor: "rgba(0, 100, 255, 0.7)",
                        color: "white",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      style={{
                        padding: "6px 12px",
                        fontSize: "14px",
                        border: "none",
                        backgroundColor: "rgba(220, 53, 69, 0.7)",
                        color: "white",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Media Queries */}
      <style>
        {`
          @media (max-width: 600px) {
            div > div {
              height: auto;
              min-height: 400px;
              max-height: 90vh;
              width: 90%;
              padding: 20px;
            }
            
            form {
              flex-direction: column;
            }
            
            input[type="text"]
        button[type="submit"] {
          width: 100%;
        }
        
        li {
          flex-wrap: wrap;
        }
        
        li > div:first-child {
          width: 100%;
        }
        
        li > div:last-child {
          width: 100%;
          justify-content: flex-end;
        }
      }
      
      @media (max-height: 500px) {
        div > div {
          height: 90vh;
        }
      }

      /* Change placeholder color */
      input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
      
      /* Scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.4);
      }
    `}
      </style>
    </div>
  );
};

export default TodoList;
