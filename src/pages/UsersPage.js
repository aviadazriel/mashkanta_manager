import React, { useState, useEffect } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleAddUser = (user) => {
    createUser(user).then(() => fetchUsers().then(setUsers));
    setModalOpen(false);
  };

  const handleEditUser = (user) => {
    updateUser(editUser.id, user).then(() => fetchUsers().then(setUsers));
    setModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => fetchUsers().then(setUsers));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "phone", width: 200 },
    { field: "is_active", headerName: "Active", width: 110 },
  ];

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => setModalOpen(true)}>Add User</button>
      <DataTable
        rows={users}
        columns={columns}
        onEdit={(user) => {
          setEditUser(user);
          setModalOpen(true);
        }}
        onDelete={handleDeleteUser}
      />
      {modalOpen && (
        <FormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={editUser ? handleEditUser : handleAddUser}
          initialData={editUser}
          fields={[
            { name: "username", label: "Username" },
            { name: "email", label: "Email" },
            { name: "phone", label: "phone" },
            { name: "password", label: "Password" },
          ]}
        />
      )}
    </div>
  );
};

export default UsersPage;
