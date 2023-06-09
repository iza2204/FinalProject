import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update, onChildChanged  } from "firebase/database";
import "./homepage.scss";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import TodayIcon from '@mui/icons-material/Today';
import PendingIcon from '@mui/icons-material/Pending';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
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
    const [inProgressTodos, setInProgressTodos] = useState([]);
    const [doneTodos, setDoneTodos] = useState([]);
    const [deadline, setDeadline] = useState("Deadline date hasn't confirmed");
    const [initialTodos, setInitialTodos] = useState([]);



    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // read initial data
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([]);
                    setTodayTodos([]);
                    setInProgressTodos([]);
                    setDoneTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            setTodos((oldArray) => [
                                ...oldArray,
                                {
                                    todo: todo.todo,
                                    uidd: todo.uidd,
                                    deadline: todo.deadline,
                                    status: todo.status || "do today",
                                },
                            ]);
                            if (todo.status === "do today") {
                                setTodayTodos((prevTodayTodos) =>
                                    prevTodayTodos.concat({
                                        todo: todo.todo,
                                        uidd: todo.uidd,
                                        deadline: todo.deadline,
                                        status: todo.status,
                                    })
                                );
                            }
                            if (todo.status === "in progress") {
                                setInProgressTodos((prevInProgressTodos) =>
                                    prevInProgressTodos.concat({
                                        todo: todo.todo,
                                        uidd: todo.uidd,
                                        deadline: todo.deadline,
                                        status: todo.status,
                                    })
                                );
                            }
                            if (todo.status === "done") {
                                setDoneTodos((prevDoneTodos) =>
                                    prevDoneTodos.concat({
                                        todo: todo.todo,
                                        uidd: todo.uidd,
                                        deadline: todo.deadline,
                                        status: todo.status,
                                    })
                                );
                            }
                        });
                    }
                });
            }
        });

        setInitialTodos([]);
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
            deadline: deadline || "Deadline date hasn't confirmed",
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
            deadline: deadline || "Deadline date hasn't confirmed"
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
        const updatedTodo = { ...todo, status: "do today" };
        setTodos((prevTodos) => prevTodos.filter((item) => item.uidd !== todo.uidd));
        setTodayTodos((prevTodayTodos) => prevTodayTodos.concat(updatedTodo));
        updateTaskStatusInFirebase(todo.uidd, "do today");
    };

    const handleMoveToInProgress = (todo) => {
        const updatedTodo = { ...todo, status: "in progress" };
        setTodos((prevTodos) => prevTodos.filter((item) => item.uidd !== todo.uidd));
        setInProgressTodos((prevInProgressTodos) => prevInProgressTodos.concat(updatedTodo));
        updateTaskStatusInFirebase(todo.uidd, "in_progress");
    };

    const handleMoveToDone = (todo) => {
        const updatedTodo = { ...todo, status: "done" };
        setTodos((prevTodos) =>
            prevTodos.map((item) =>
                item.uidd === todo.uidd ? updatedTodo : item
            )
        );
        setDoneTodos((prevDoneTodos) =>
            prevDoneTodos.concat(updatedTodo)
        );
        if (todo.status === "do today") {
            setTodayTodos((prevTodayTodos) =>
                prevTodayTodos.filter((item) => item.uidd !== todo.uidd)
            );
        } else if (todo.status === "in progress") {
            setInProgressTodos((prevInProgressTodos) =>
                prevInProgressTodos.filter((item) => item.uidd !== todo.uidd)
            );
        }
        updateTaskStatusInFirebase(todo.uidd, "done");
    };

    const updateTaskStatusInFirebase = (uidd, status) => {
                update(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
                    status: status
                });
            };





    return (
        <div className="homepage">
            <section className="content">
                <section className="inputs"> Add your task
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

                <section className="all-lists">
                    <div className="general-list">
                        <DndProvider backend={HTML5Backend}>
                            <NavigationBar/>

                            {todos.map((todo, index) => (
                                <div className="todo" key={todo.uidd}>
                                    <div className="todo-name">
                                        <h1>{todo.todo}</h1>
                                        <span>{todo.deadline}</span>

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
                                        <TodayIcon
                                            className="move-to-today-button"
                                            onClick={() => handleMoveToToday(todo)}
                                        >
                                            Do Today
                                        </TodayIcon>

                                        <PendingIcon
                                            className="move-to-in-progress-button"
                                            onClick={() => handleMoveToInProgress(todo)}
                                        >
                                            In progress
                                        </PendingIcon>
                                        <TaskAltIcon
                                            className="move-to-done-button"
                                            onClick={() => handleMoveToDone(todo)}
                                        >
                                            Done
                                        </TaskAltIcon>
                                    </div>
                                </div>
                            ))}

                            {isEdit ? (
                                <div>
                                    <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon" />
                                </div>
                            ) : (
                                <div>
                                    <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
                                </div>
                            )}
                            <LogoutIcon onClick={handleSignOut} className="logout-icon" />
                        </DndProvider>


                    </div>
                    <div className="todaylist">
                        <div className="today-todos">
                            <h1 className="column-title">Do Today <TodayIcon> </TodayIcon></h1>
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
                        <h1 className="column-title">In Progress <PendingIcon> </PendingIcon></h1>
                        <DeleteIcon
                            fontSize="large"
                            onClick={() => handleDelete(todo.uidd)}
                            className="delete-button"
                        />
                    </div>
                    <div className="done-todos">
                        <h1 className="column-title">Done <TaskAltIcon/> </h1>
                        <DeleteIcon
                            fontSize="large"
                            onClick={() => handleDelete(todo.uidd)}
                            className="delete-button"
                        />
                    </div>
                </section>
            </section>

        </div>

        // </div>

    );
}