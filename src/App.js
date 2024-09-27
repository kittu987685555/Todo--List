
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { getData, deleteData, postData, putData } from "./components/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // For delete confirmation
  const [taskToDelete, setTaskToDelete] = useState(null); // Task to delete

  const [initialForm, setForm] = useState({
    AssignedTo: "",
    status: "",
    DueDate: "",
    priority: "",
    Description: "",
  });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      let res = await getData();
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async () => {
    if (taskToDelete) {
      await deleteData(taskToDelete.user);
      console.log(`Task ${taskToDelete.AssignedTo} is deleted`);
      getTasks();
      setShowDeleteConfirmation(false);
    }
  };

  const addTask = async (task) => {
    let data = {
      user: task.AssignedTo,  // Ensure 'task.AssignedTo' is valid
      status: task.status,
      DueDate: task.DueDate,
      priority: task.priority,
      Description: task.Description,
    };

    if (edit && task.user) {  // Ensure 'task.id' is used if editing
      await putData(task.user, data); // Use 'task.id' for updating
      console.log("Row is updated");
    } else {
      await postData(data); // Add new task if not editing
    }

    getTasks();
    setOpenForm(false);
  };


  const editTask = (data) => {
    setForm(data);
    setEdit(true);
    setOpenForm(true);
  };

  const showForm = () => {
    setForm({
      AssignedTo: "",
      status: "",
      DueDate: "",
      priority: "",
      Description: "",
    });
    setEdit(false);
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
  };
  // Function to handle delete button click
  const handleDeleteClick = (task) => {
    setTaskToDelete(task);  // Set the task that is about to be deleted
    setShowDeleteConfirmation(true);  // Show the confirmation dialog
  };

  // Function to actually delete the task
  const handleConfirmDelete = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskToDelete.id)); // Assuming tasks have unique ids
    setShowDeleteConfirmation(false);  // Close the confirmation dialog
    setTaskToDelete(null);  // Clear the task to delete
  };

  // Function to cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);  // Close the confirmation dialog
    setTaskToDelete(null);  // Clear the task to delete
  };




  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = tasks.filter(
      (task) =>
        task.AssignedTo.toLowerCase().includes(term) ||
        task.status.toLowerCase().includes(term) ||
        task.Description.toLowerCase().includes(term) ||
        task.priority.toLowerCase().includes(term)
    );

    setFilteredTasks(filtered);
    setCurrentPage(1);
  };

  const handlePageInput = (e) => {
    const newPage = Number(e.target.value);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(currentTasks.map((task) => task.user));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleCheckboxChange = (user) => {
    if (selectedTasks.includes(user)) {
      setSelectedTasks(selectedTasks.filter((t) => t !== user));
    } else {
      setSelectedTasks([...selectedTasks, user]);
    }
  };

  useEffect(() => {
    setIsAllSelected(
      selectedTasks.length === currentTasks.length && currentTasks.length > 0
    );
  }, [selectedTasks, currentTasks]);

  return (
    <div className="wrapper m-5  w-50 border border-2 p-1 ">

      <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light">
        {/* Left section with logo and title */}
        <div className="d-flex justify-content-center align-items-center ">
          <div className="d-flex align-items-center justify-contentcenter"><img src="https://res.cloudinary.com/dxudtajsv/image/upload/v1727377519/gdwfsukwwrf55kd3pw5j.jpg " alt="logo" style={{ marginRight: '10px' }} className="w-100 " /></div>

          <div className="d-flex align-items-center justify-content-center flex-column"><h2 className="fs-5">Tasks</h2>
            <p className="fs-10">All Tasks</p>
          </div>

        </div>


        {/* Right section with buttons and search */}
        <div className="d-flex flex-column align-items-end">
          {/* Button Group */}
          <div className="btn-group mb-2 w-100 border border-2" role="group" aria-label="Task actions">
            {/* New Task Button */}
            <button type="button" className="btn btn-warning" onClick={showForm}>
              New Task
            </button>

            {/* Refresh Button */}
            <button type="button" className="btn btn-warning" onClick={getTasks}>
              Refresh
            </button>
          </div>


          {/* Search Input */}
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>


      <Table
        tasks={currentTasks}
        deleteTask={handleDeleteClick}
        editTask={editTask}
        selectedTasks={selectedTasks}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
      />



      <div className="pagination-controls d-flex justify-content-between align-items-center p-3 bg-light border border-secondary-subtle m-1">
        {/* Input Box for Jumping to a Specific Page */}
        <div className="d-flex align-items-center me-3">
          <input
            type="number"
            className="form-control form-control-sm"
            value={currentPage}
            onChange={handlePageInput}
            style={{ width: "60px", height: "38px" }}  // Adjust the height to match buttons
            min="1"
            max={totalPages}
          />
        </div>

        {/* Pagination Buttons */}
        <div className="d-flex justify-content-center align-items-center">
          <ul className="pagination m-0">  {/* Remove extra margin */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleFirstPage} disabled={currentPage === 1}>
                First
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
                &lt; Previous
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">{currentPage}</span>
            </li>
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next &gt;
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleLastPage} disabled={currentPage === totalPages}>
                Last
              </button>
            </li>
          </ul>
        </div>
      </div>


      {openForm && <Form close={closeForm} data={initialForm} addTask={addTask} />}

    
      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h4>Delete Task</h4>
            <p>Do you want to delete task {taskToDelete?.AssignedTo}?</p>
            <button className="btn btn-danger" onClick={deleteTask}>
              Yes
            </button>
            <button className="btn btn-secondary" onClick={handleCancelDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
