import React, { useState } from 'react';

import UserList from './UserList';
import UserForm from './UserForm';
import axios from 'axios';

function App() {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserUpdated = (user) => {
        alert(`User ${selectedUser ? 'updated' : 'added'} successfully!`);
        setSelectedUser(null);
    };

    const handleDeleteUser = () => {
        if (selectedUser) {
            axios.delete(`http://localhost:5000/users/${selectedUser[0]}`)
                .then(() => {
                    alert('User deleted successfully!');
                    setSelectedUser(null);
                })
                .catch(error => console.error('Error deleting user:', error));
        }
    };

    return (
        <div className="App">
            <h1>User Management</h1>
            <UserList onSelectUser={setSelectedUser} />
            <UserForm selectedUser={selectedUser} onUserUpdated={handleUserUpdated} />
            {selectedUser && <button onClick={handleDeleteUser}>Delete User</button>}
        </div>
    );
}

export default App;
