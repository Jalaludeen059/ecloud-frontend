import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ selectedUser, onUserUpdated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [active, setActive] = useState(true);

    useEffect(() => {
        if (selectedUser) {
            setUsername(selectedUser[1]);
            setActive(selectedUser[3]);
        }
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = { username, password, active };

        if (selectedUser) {
            axios.put(`http://localhost:5000/users/${selectedUser[0]}`, user)
                .then(response => onUserUpdated(response.data.user))
                .catch(error => console.error('Error updating user:', error));
        } else {
            axios.post('http://localhost:5000/users', user)
                .then(response => onUserUpdated(response.data.user))
                .catch(error => console.error('Error adding user:', error));
        }

        setUsername('');
        setPassword('');
        setActive(true);
    };

    return (
        <div>
            <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Active:</label>
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />
                </div>
                <button type="submit">{selectedUser ? 'Update' : 'Add'} User</button>
            </form>
        </div>
    );
};

export default UserForm;
