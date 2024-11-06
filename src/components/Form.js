
import { useState } from "react";
import './Form.css';  // Ensure the necessary styles are added

function Form(props) {
    const [tasks, setTasks] = useState({
        AssignedTo: '',
        status: '',
        DueDate: '',
        priority: '',
        Description: ''
    });

    const [submitted, setSubmitted] = useState(false);

    // Handle form field changes dynamically
    const changeFormData = (event) => {
        const { name, value } = event.target;
        setTasks({ ...tasks, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);  // Mark form as submitted for validation

        // Check if all fields are filled
        if (tasks.AssignedTo && tasks.status && tasks.DueDate && tasks.priority && tasks.Description) {
            props.addTask(tasks);  // Pass task data to parent component
            // Reset form fields after submission
            setTasks({
                AssignedTo: '',
                status: '',
                DueDate: '',
                priority: '',
                Description: ''
            });
            setSubmitted(false);  // Reset the submitted state after successful submission
        }
    };

    return (
        <div className="form-overlay ">
            <form className="wrapper border border-2 p-4" onSubmit={handleSubmit} style={{ width: '600px' }}>
                {/* Form header with a close button */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div><h5 className="d-flex align-items-center text-center">
                        New Task
                    </h5></div>
                    
                    <button
                        type="button"
                        className="btn-close"
                        onClick={props.close}
                        aria-label="Close"
                    />
                </div>

                {/* Assigned To and Status fields in a row */}
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="form-group mt-3">
                            <label><span class="text-danger">*</span>Assigned To</label>
                            <input
                                type="text"
                                name="AssignedTo"
                                placeholder="User"
                                className={`form-control mt-2 ${submitted && !tasks.AssignedTo ? 'input-error' : ''}`}
                                value={tasks.AssignedTo}
                                onChange={changeFormData}
                            />
                            {submitted && !tasks.AssignedTo && <span className="text-danger">Assigned To is required</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mt-3">
                            <label><span class="text-danger">*</span>Status</label>
                            <select
                                name="status"
                                className={`form-control mt-2 ${submitted && !tasks.status ? 'input-error' : ''}`}
                                value={tasks.status}
                                onChange={changeFormData}
                            >
                                <option value="">Select Status</option>
                                <option value="not-started">Not Started</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            {submitted && !tasks.status && <span className="text-danger">Status is required</span>}
                        </div>
                    </div>
                </div>

                {/* Due Date and Priority fields in a row */}
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="form-group mt-3">
                            <label>Due Date</label>
                            <input
                                type="date"
                                name="DueDate"
                                className={`form-control mt-2 ${submitted && !tasks.DueDate ? 'input-error' : ''}`}
                                value={tasks.DueDate}
                                onChange={changeFormData}
                            />
                            {submitted && !tasks.DueDate && <span className="text-danger">Due Date is required</span>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group mt-3">
                            <label><span class="text-danger">*</span>Priority</label>
                            <select
                                name="priority"
                                className={`form-control mt-2 ${submitted && !tasks.priority ? 'input-error' : ''}`}
                                value={tasks.priority}
                                onChange={changeFormData}
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="normal">Normal</option>
                                <option value="high">High</option>
                            </select>
                            {submitted && !tasks.priority && <span className="text-danger">Priority is required</span>}
                        </div>
                    </div>
                </div>

                {/* Description field */}
                <div className="form-group mt-3">
                    <label>Description</label>
                    <textarea
                        name="Description"
                        className={`form-control mt-2 ${submitted && !tasks.Description ? 'input-error' : ''}`}
                        value={tasks.Description}
                        onChange={changeFormData}
                        rows="4"
                    />
                    {submitted && !tasks.Description && <span className="text-danger">Description is required</span>}
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-end mt-4">
                    <button
                        type="button"
                        className="btn btn-warning me-2"
                        onClick={props.close}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
