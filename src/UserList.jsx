import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => setUsers(response.data.users))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user[0]} onClick={() => onSelectUser(user)}>
                        {user[1]} (Active: {user[3].toString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
