import {useEffect, useState} from "react";
import {deleteTodoApi, retrieveAllTodosForUsername} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

export function ListTodosComponent() {

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();

    const authContext = useAuth();

    const username = authContext.username;


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function refreshTodos() {
        retrieveAllTodosForUsername(username)
            .then(response => setTodos(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        refreshTodos()
    }, [refreshTodos]);

    function deleteTodo(id) {
        deleteTodoApi(username, id)
            .then(
                () => {
                    setMessage(`Delete of todo ${id} successful`)
                    refreshTodos()
                }
            )
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }
    function addNewTodo() {
        navigate(`/todo/`)

    }

    return (
        <div className="container">
            <h1>TODO List</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>done</th>
                        <th>targetDate</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className={"btn btn-warning"} onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className={"btn btn-success"} onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success" onClick={addNewTodo}>Add new Todo</div>
        </div>
    )
}

export default ListTodosComponent;