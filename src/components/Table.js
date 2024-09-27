
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function Table(props) {
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    return (
        

        <div class>
             <table className="table table-hover mb-0">
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={props.isAllSelected}
                            onChange={props.handleSelectAll}
                        />
                    </th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Comments</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.tasks.map((data, index) => (
                    <tr key={data.user || index}>
                        <td>
                            <input
                                type="checkbox"
                                checked={props.selectedTasks.includes(data.user)}
                                onChange={() => props.handleCheckboxChange(data.user)}
                            />
                        </td>
                        <td>{data.user}</td>
                        <td>{data.status}</td>
                        <td>{data.DueDate}</td>
                        <td>{data.priority}</td>
                        <td>{data.Description}</td>
                        <td>
                            <div className="dropdown">
                                <button
                                    className="btn btn-light dropdown-toggle"
                                    type="button"
                                    id={`dropdownMenuButton${index}`}
                                    onClick={() => toggleDropdown(index)}
                                    aria-expanded={dropdownOpen === index}
                                >
                                    
                                </button>
                                <ul className={`dropdown-menu-warning dropdown-menu bg-warning position-absolute top-25 start-25  ${dropdownOpen === index ? 'show' : ''}` }>
                                    <li>
                                        <button
                                            className="dropdown-item "
                                            onClick={() => props.editTask(data)}
                                        >
                                            Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={() => props.deleteTask(data)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
       
    );
}

export default Table;
