// UserList.tsx
import React from 'react';

interface User {
  id: number;
  image: string;
  username: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  role: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id} className="user-item">
          <img src={user.image} alt={user.username} />
          <div>
            <p>Username: {user.username}</p>
            <p>Gender: {user.gender}</p>
            <p>Date of Birth: {user.dateOfBirth}</p>
            <p>Phone: {user.phone}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
