    

    import axios from "axios";

    const url = "http://localhost:4200/tasks";
    
    export async function getData() {
        try {
            return await axios.get(url);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;  // Propagate the error upwards for further handling
        }
    }
    
    export async function deleteData(user) {
        try {
            console.log('Deleting task with URL:', `${url}/${user}`);  // Debug URL
            return await axios.delete(`${url}/${user}`);
        } catch (error) {
            console.error(`Error deleting task with user ID: ${user}`, error);
            throw error;
        }
    }
    
    export async function postData(data) {
        try {
            return await axios.post(url, data, {
                headers: {
                    'content-type': 'application/json'
                }
            });
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    }
    
    export async function putData(user, data) {  // Use 'id' instead of 'user'
        try {
            const apiUrl = `${url}/${user}`;  // Update the URL to use 'id'
            console.log('Updating task with URL:', apiUrl);  // Debug URL
            return await axios.put(apiUrl, data,user, {
                headers: {
                    'content-type': 'application/json'
                }
            });
        } catch (error) {
            console.error(`Error updating task with ID: ${user}`, error);  // Use 'id' here
            throw error;
        }
    }
    
    