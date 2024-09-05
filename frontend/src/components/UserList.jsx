import React from "react";

const UserList = ({ users, joinOrCreateRoom }) => {
  console.log(users);

  return (
    <div className="user__sidebar">
      <h2>Users</h2>
      <div className="user__list">
        {users.map((user) => (
          <div
            key={user.id}
            className="user__item"
            onClick={() => joinOrCreateRoom(user.id)}
          >
            <img
              src={
                user.ProfilePicture ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Generic-person.svg/1024px-Generic-person.svg.png"
              }
              alt={user.username}
              className="user__avatar"
            />
            <p className="user__name">{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
