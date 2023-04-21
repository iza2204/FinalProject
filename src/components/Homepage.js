import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./homepage.scss";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import NavigationBar from "./Navi";
import { DndProvider } from 'react-dnd';
import Draggable, {DraggableCore} from "react-draggable"
// import { DragDropContext, Droppable, Draggable } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



export default function Homepage() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate();
    const [todayTodos, setTodayTodos] = useState([]);
    const [deadline, setDeadline] = useState("");



    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // read
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            setTodos((oldArray) => [...oldArray, { todo: todo.todo, uidd: todo.uidd }]);
                        });
                    }
                });
            } else if (!user) {
                navigate("/");
            }
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // add
    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd,
            deadline: deadline
        });


        setTodo("");
        setDeadline("");
    };

    // update
    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    };

    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            uidd: tempUidd,
            deadline: deadline
        });

        setTodo("");
        setIsEdit(false);
    };

    // delete
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    //move to Do today
    const handleMoveToToday = (todo) => {
        setTodos((prevTodos) =>
            prevTodos.filter((item) => item.uidd !== todo.uidd)
        );
        setTodayTodos((prevTodayTodos) => prevTodayTodos.concat(todo));
    };



    return (
        <div className="homepage">
            {/*<div className="div-of-lists">*/}
                <section className="inputs">
                    <input
                        className="add-edit-input"
                        type="text"
                        placeholder="Add todo..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <input
                        className="add-input-date"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </section>
                <div className="general-list">
                    <DndProvider backend={HTML5Backend}>
                        <NavigationBar/>



                        {todos.map((todo, index) => (
                            <div className="todo" key={todo.uidd}>
                                <div className="todo-name">
                                    <h1>{todo.todo}</h1>
                                    <span>{new Date(deadline).toLocaleDateString()}</span>

                                </div>
                                <div className="todo-actions">
                                    <EditIcon
                                        fontSize="large"
                                        onClick={() => handleUpdate(todo)}
                                        className="edit-button"
                                    />
                                    <DeleteIcon
                                        fontSize="large"
                                        onClick={() => handleDelete(todo.uidd)}
                                        className="delete-button"
                                    />
                                    <button
                                        className="move-to-today-button"
                                        onClick={() => handleMoveToToday(todo)}
                                    >
                                        Do Today
                                    </button>
                                </div>
                            </div>
                        ))}

                        {isEdit ? (
                            <div>
                                <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon"/>
                            </div>
                        ) : (
                            <div>
                                <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
                            </div>
                        )}
                        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
                    </DndProvider>
                    <DndProvider droppableId="todos">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {/* wyświetlanie elementów */}
                                {todos.map((todo, index) => (
                                    <Draggable key={todo.uidd} draggableId={todo.uidd} index={index}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className="todo"
                                            >
                                                {/* treść elementu */}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </DndProvider>

                </div>
                <section className="all-lists">
                    <div className="todaylist">
                        <div className="today-todos">
                            <h1>Do Today</h1>
                            {todayTodos.map((todo) => (
                                <div className="todo" key={todo.uidd}>
                                    <h1>{todo.todo}</h1>
                                    <DeleteIcon
                                        fontSize="large"
                                        onClick={() => handleDelete(todo.uidd)}
                                        className="delete-button"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="inprogress-todos">
                        <h1>In Progress</h1>
                    </div>
                    <div className="done-todos">
                        <h1>Done</h1>
                    </div>
                </section>
            </div>

        // </div>

    );
}