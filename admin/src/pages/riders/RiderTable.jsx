import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";

const RiderTable = () => {
  // GET RIDERS
  const [riders, setRiders] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchRiders = async () => {
      const { data } = await axios.get("/api/admin/riders", {
        headers: {
          Authorization: localStorage.getItem("aToken"),
        },
      });
      setRiders(data);
      setLoading(true);
    };
    fatchRiders();
  }, [riders]);

  const deleteHandler = (id, thumb) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/riders/${id}?thumb=${thumb}`, {
            headers: {
              Authorization: localStorage.getItem("aToken"),
            },
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Admin deleted field!",
            });
          });
      }
    });
  };

  const columns = [
    {
      field: "thumb",
      headerName: "Thumb",
      width: 100,
      renderCell: (params) => {
        return (
          <img src={"/riders/" + params.row.thumb} alt={params.row.name} />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link to={"/riders/" + params.row._id}>{params.row.name}</Link>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link to={"mailto:" + params.row.email}>{params.row.email}</Link>
          </div>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link to={"tel:" + params.row.phone}>{params.row.phone}</Link>
          </div>
        );
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 80,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "date",
      headerName: "Joining Date",
      width: 200,
      type: "date",
      valueFormatter: (params) => new Date(params?.value).toLocaleString(),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <Link to={"/riders/" + params.row._id} className="view">
              <i className="ri-eye-fill"></i>
            </Link>
            <Link
              className="delete"
              onClick={() => deleteHandler(params.row._id, params.row.thumb)}
            >
              <i className="ri-delete-bin-line"></i>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="dataTable">
        <Box sx={{ width: "100%" }}>
          {laoding ? (
            <DataGrid
              rows={riders}
              getRowId={(row) => row._id}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                  csvOptions: { disableToolbarButton: true },
                  printOptions: { disableToolbarButton: true },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              disableColumnFilter
              disableDensitySelector
              disableColumnSelector
              disableColumnMenu
            />
          ) : (
            <Loader />
          )}
        </Box>
      </div>
    </>
  );
};

export default RiderTable;
