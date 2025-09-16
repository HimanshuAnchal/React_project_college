// src/components/StudentList.jsx
import React, { useState, useEffect } from "react";
import "../layout/stu_list.scss";
import { auth, db } from "../firebase";
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    addDoc,
    updateDoc,
    serverTimestamp,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: "",
        tasks: [],
    });
    const [taskInput, setTaskInput] = useState("");
    const [taskTime, setTaskTime] = useState("");
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;
        const q = query(
            collection(db, "students"),
            where("ownerEmail", "==", user.email),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const studentData = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }));
            setStudents(studentData);
        });

        return () => unsubscribe();
    }, [user]);

    const toggleModal = (open = null) => {
        const next = open === null ? !isModalOpen : open;
        setIsModalOpen(next);

        if (!next) {
            setNewStudent({ name: "", tasks: [] });
            setTaskInput("");
            setTaskTime("");
            setEditingTaskIndex(null);
            setEditingStudentId(null);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";
        let [hours, minutes] = timeString.split(":");
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    const toTimeInputValue = (timeStr) => {
        if (!timeStr) return "";
        if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
        const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!match) return "";
        let hr = parseInt(match[1], 10);
        const min = match[2];
        const ampm = match[3].toUpperCase();
        if (ampm === "PM" && hr !== 12) hr += 12;
        if (ampm === "AM" && hr === 12) hr = 0;
        return `${String(hr).padStart(2, "0")}:${min}`;
    };

    const addOrUpdateTask = async () => {
        if (!taskInput.trim() || !taskTime) return;
        const formattedTime = formatTime(taskTime);

        if (editingStudentId !== null) {
            const studentRef = doc(db, "students", editingStudentId);
            const student = students.find((s) => s.id === editingStudentId) || newStudent;
            const currentTasks = Array.isArray(student.tasks) ? [...student.tasks] : [];

            if (editingTaskIndex !== null) {
                currentTasks[editingTaskIndex] = {
                    text: taskInput.trim(),
                    time: formattedTime,
                };
            } else {
                currentTasks.push({ text: taskInput.trim(), time: formattedTime });
            }

            await updateDoc(studentRef, { tasks: currentTasks });
            setStudents((prev) =>
                prev.map((s) => (s.id === editingStudentId ? { ...s, tasks: currentTasks } : s))
            );

            setEditingTaskIndex(null);
            setTaskInput("");
            setTaskTime("");
            return;
        }

        setNewStudent((prev) => ({
            ...prev,
            tasks: [...(prev.tasks || []), { text: taskInput.trim(), time: formattedTime }],
        }));
        setTaskInput("");
        setTaskTime("");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        await deleteDoc(doc(db, "students", id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingStudentId) {
            toggleModal(false);
            return;
        }
        if (!user) return alert("You must be logged in.");
        if (!newStudent.name) return;

        await addDoc(collection(db, "students"), {
            ...newStudent,
            ownerEmail: user.email,
            createdAt: serverTimestamp(),
        });
        toggleModal(false);
    };

    const startEditStudent = (studentId) => {
        const student = students.find((s) => s.id === studentId);
        if (!student) return;

        setNewStudent({
            name: student.name || "",
            tasks: Array.isArray(student.tasks) ? [...student.tasks] : [],
        });
        setEditingStudentId(studentId);
        setEditingTaskIndex(null);
        setTaskInput("");
        setTaskTime("");
        setIsModalOpen(true);
    };

    const startEditTask = (index, task) => {
        setTaskInput(task.text || "");
        setTaskTime(toTimeInputValue(task.time || ""));
        setEditingTaskIndex(index);
    };

    return (
        <section className="student-list-section">
            <div className="container">
                <h1>My Task</h1>
                <button className="btn-add" onClick={() => toggleModal(true)} title="Add Student">
                    <i className="fas fa-plus"></i>
                </button>

                {students.length === 0 ? (
                    <div className="no-records">
                        <h2>No Records</h2>
                    </div>
                ) : (
                    <div className="students-grid">
                        {students.map((student) => (
                            <div key={student.id} className="student-card">
                                <div className="card-header">
                                    <h3>{student.name}</h3>
                                    <div className="card-actions">
                                        <button
                                            onClick={() => startEditStudent(student.id)}
                                            className="btn-edit"
                                            title="Edit Student"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            className="btn-delete"
                                            title="Delete"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {student.createdAt?.toDate
                                            ? student.createdAt.toDate().toLocaleDateString()
                                            : "—"}
                                    </p>
                                    <div className="tasks-section">
                                        <strong>Tasks:</strong>
                                        <ul>
                                            {(student.tasks || []).map((task, index) => (
                                                <li key={index} onClick={() => startEditTask(index, task)}>
                                                    {task.text} <em>({task.time})</em>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <button className="btn-close" onClick={() => toggleModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                            <h2>{editingStudentId ? "Edit Student" : "Add Student"}</h2>

                            <form onSubmit={handleSubmit} className="add-student-form">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter Task "
                                        value={newStudent.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input-group task-group">
                                    <input
                                        type="text"
                                        placeholder="Enter a task"
                                        value={taskInput}
                                        onChange={(e) => setTaskInput(e.target.value)}
                                    />
                                    <input
                                        type="time"
                                        value={taskTime}
                                        onChange={(e) => setTaskTime(e.target.value)}
                                    />
                                    <button type="button" className="btn-add-task" onClick={addOrUpdateTask}>
                                        {editingTaskIndex !== null ? "Update Task" : "Add Task"}
                                    </button>
                                </div>

                                {newStudent.tasks.length > 0 && (
                                    <div className="tasks-preview">
                                        <strong>Tasks:</strong>
                                        <ul>
                                            {newStudent.tasks.map((task, index) => (
                                                <li key={index}>
                                                    {task.text} <em>({task.time})</em>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <button type="submit" className="btn-submit">
                                    {editingStudentId ? "Done" : "Add Student"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default StudentList;
