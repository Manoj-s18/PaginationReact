import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoPerPage, setTodoPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.ceil(todos.length / todoPerPage);
  const pages = [...Array(numberOfPages + 1).keys()].slice(1);
  const indexOfLast = currentPage * todoPerPage;
  const indexOfFirst = indexOfLast - todoPerPage;

  const visibleTodos = todos.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      // console.log(numberOfPages);
      setTodos(res.data);
    });
  }, []);

  return (
    <div className="App">
      <select
        onChange={(e) => {
          setTodoPerPage(e.target.value);
        }}
      >
        <option>10</option>
        <option>20</option>
        <option>40</option>
      </select>
      <h1>Hello CodeSandbox</h1>
      <h2>Pagination Example</h2>
      {visibleTodos.map((todo) => {
        return <p key={todo.id}>{todo.title}</p>;
      })}
      <div>
        <span
          onClick={() => {
            if (currentPage === pages[0]) return;
            else setCurrentPage(currentPage - 1);
          }}
        >
          prev
        </span>
        {pages.map((page) => {
          return (
            <span
              key={page}
              onClick={() => {
                setCurrentPage(page);
              }}
              className={currentPage === page ? "active" : ""}
            >{` ${page} `}</span>
          );
        })}
        <span
          onClick={() => {
            if (currentPage === pages[pages.length - 1]) return;
            else setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </span>
      </div>

      {/* <span>{todos.length}</span> */}
    </div>
  );
}
