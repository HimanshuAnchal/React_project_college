import React from "react";
import "../layout/stu_list.scss"

const StudentList = () => {
    const [students, setStudents] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [newStudent, setNewStudent] = React.useState({
        name: '',
        email: '',
        contact: '',
        tasks: []
    });
    const [taskInput, setTaskInput] = React.useState('');

    const handleDelete = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const handleEdit = (id) => {
        console.log(`Editing student with ID: ${id}`);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setNewStudent({ name: '', email: '', contact: '', tasks: [] });
        setTaskInput('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleTaskInput = (e) => {
        setTaskInput(e.target.value);
    };

    const addTask = () => {
        if (taskInput.trim()) {
            setNewStudent({
                ...newStudent,
                tasks: [...newStudent.tasks, taskInput.trim()]
            });
            setTaskInput('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newStudent.name && newStudent.email && newStudent.contact) {
            setStudents([
                ...students,
                {
                    id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
                    ...newStudent
                }
            ]);
            toggleModal();
        }
    };

    return (
        <section className="student-list-section">
            <div className="container">
                <h1>Student Records</h1>
                <button className="btn-add" onClick={toggleModal} title="Add Student">
                    <i className="fas fa-plus"></i>
                </button>
                {students.length === 0 ? (
                    <div className="no-records">
                        <h2>No Records</h2>
                        <p>Add a new student to get started.</p>
                    </div>
                ) : (
                    <div className="students-grid">
                        {students.map(student => (
                            <div key={student.id} className="student-card">
                                <div className="card-header">
                                    <h3>{student.name}</h3>
                                    <div className="card-actions">
                                        <button onClick={() => handleEdit(student.id)} className="btn-edit" title="Edit">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(student.id)} className="btn-delete" title="Delete">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p><strong>Email:</strong> {student.email}</p>
                                    <p><strong>Contact:</strong> {student.contact}</p>
                                    <div className="tasks-section">
                                        <strong>Tasks:</strong>
                                        <ul>
                                            {student.tasks.map((task, index) => (
                                                <li key={index}>{task}</li>
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
                            <button className="btn-close" onClick={toggleModal}>
                                <i className="fas fa-times"></i>
                            </button>
                            <h2>Add New Student</h2>
                            <form onSubmit={handleSubmit} className="add-student-form">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter full name"
                                        value={newStudent.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                   
                                </div>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={newStudent.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                   
                                </div>
                                <div className="input-group">
                                    <input
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        placeholder="Enter contact number"
                                        value={newStudent.contact}
                                        onChange={handleInputChange}
                                        required
                                    />
                                  
                                </div>
                                <div className="input-group task-group">
                                    <input
                                        type="text"
                                        id="task"
                                        placeholder="Enter a task"
                                        value={taskInput}
                                        onChange={handleTaskInput}
                                    />
                    
                                    <button type="button" className="btn-add-task" onClick={addTask}>
                                        Add Task
                                    </button>
                                </div>
                                {newStudent.tasks.length > 0 && (
                                    <div className="tasks-preview">
                                        <strong>Tasks:</strong>
                                        <ul>
                                            {newStudent.tasks.map((task, index) => (
                                                <li key={index}>{task}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <button type="submit" className="btn-submit">Add Student</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default StudentList;