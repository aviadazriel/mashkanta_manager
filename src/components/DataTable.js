import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns, onEdit, onDelete }) => {
  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <>
        <button
          style={{ marginRight: 8 }}
          onClick={() => onEdit(params.row)}
        >
          Edit
        </button>
        <button onClick={() => onDelete(params.row.id)}>Delete</button>
      </>
    ),
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
