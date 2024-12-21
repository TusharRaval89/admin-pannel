import React, { useEffect, useState } from "react";
import DemoDrawer from "../../Components/Drawer";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { Box } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
// import 'sweetalert2/dist/sweetalert2.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss';

import {
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { LegendToggle } from "@mui/icons-material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  padding: 3,
};

const CategorySerchData = [
  { label: "The Godfather", id: 1 },
  { label: "Pulp Fiction", id: 2 },
];

const Category = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [CategoryData, setCategoryData] = useState([
    // { id: 1, catagoryName: "IT Field", status: true },
    // { id: 2, catagoryName: "Marketing", status: false },
    // { id: 3, catagoryName: "Finance", status: true },
  ]);
  const [editId, setEditId] = useState(null);
  const [initialValues, setinitialValues] = useState({});
  let [loader, setLoader] = useState(false);
  const [addUpdateTitle, setAddUpdateTitle] = useState("Add");
  let token = localStorage.getItem("login_token");

  // const formik = useFormik({
  //   initialValues: {
  //     catagoryName: "",
  //   },
  //   onSubmit: (values, action) => {
  //     addCategoryData(values);

  //     console.log(values);
  //     action.resetForm();
  //   },
  // });

  const formik = useFormik({
    initialValues: { ...initialValues },
    enableReinitialize: true,
    onSubmit: (values, action) => {
      if (editId == null) {
        addCategoryData(values);
      } else {
        updateCategoryData(editId, values);
      }
      // console.log(values);

      setEditId(null);
      setinitialValues({
        catagoryName: "",
      });
      action.resetForm();
      handleClose();
    },
  });

  const getCategoryData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/catagory",
        {
          headers: { Authorization: token },
        }
      );
      // console.log("get category =", res.data.data);
      setCategoryData(res.data.data);
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
      // toast.error(error.response.data.message);
      // console.log(error.response.data);
    } finally {
      setLoader(false);
    }
  };

  const addCategoryData = async (values) => {
    try {
      const data = await axios.post(
        "https://interviewhub-3ro7.onrender.com/catagory/create",
        values,
        {
          headers: { Authorization: token },
        }
      );
      // console.log(data);
      getCategoryData();
      toast.success("Add Category Successfully");
    } catch (error) {
      // console.log("add category ==", error.response.data);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
      // toast.error(error.response.data.message);
    }
  };

  const deleteCategoryData = async (id) => {
    try {
      const data = await axios.delete(
        "https://interviewhub-3ro7.onrender.com/catagory/" + id,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("delete category=",data);
      getCategoryData();
      // toast.success("Delete Category Successfully");
    } catch (error) {
      // console.log(error.response.data);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
      // toast.error(error.response.data.message);
    }
  };

  const updateCategoryData = async (id, values) => {
    try {
      const data = await axios.patch(
        "https://interviewhub-3ro7.onrender.com/catagory/" + id,
        values,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("udate category=", data);
      getCategoryData();
      toast.success("Update Category Successfully");
    } catch (error) {
      // console.log(error.response.data);
      // toast.error(error.response.data.message);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
    }
  };

  const updateStatusCategoryData = async (id, values) => {
    try {
      const data = await axios.patch(
        "https://interviewhub-3ro7.onrender.com/catagory/" + id,
        { status: values },
        {
          headers: { Authorization: token },
        }
      );
      // console.log("udate category=", data);
      getCategoryData();
    } catch (error) {
      // console.log(error.response.data);
      // toast.error(error.response.data.message);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
    }
  };

  const serchCategory = async (searchData) => {
    try {
      const data = await axios.get(
        "https://interviewhub-3ro7.onrender.com/catagory/?search=" + searchData,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("serch data :- ", data.data.data);
      setCategoryData(data.data.data);
    } catch (error) {
      // console.log(error.response.data);
      // toast.error(error.response.data.message);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  // if(loader){
  //   return <div class="loader-container">
  //   <span class="loader"></span>
  // </div>
  // }

  let debounceTimeout;

  const Debugging = (event) => {
    const searchData = event.target.value;

    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      serchCategory(searchData);
    }, 1000);
  };

  return (
    <>
      <DemoDrawer>
        <Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "80%" }}>
              <Autocomplete
                disablePortal
                options={CategoryData.map((category, index) => ({
                  label: category.catagoryName,
                  id: index + 1,
                }))}
                renderInput={(params) => (
                  <TextField
                    className="search-border"
                    {...params}
                    label="Search Category"
                    onChange={Debugging}
                  />
                )}
              />
            </Box>

            <Box sx={{ width: "17%" }}>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpen();
                    setAddUpdateTitle("Add");
                  }}
                  sx={{
                    padding: "15px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    backgroundColor: "#765827",
                  }}
                >
                  Add Category
                </Button>
                <Modal
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="keep-mounted-modal-title"
                  aria-describedby="keep-mounted-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="keep-mounted-modal-description" component="span">
                      <p
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "500",
                          textAlign: "center",
                          margin: "5px 0px 25px",
                          color: "#765827",
                        }}
                      >
                        {addUpdateTitle} Category
                      </p>
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                      <Typography
                        id="keep-mounted-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ margin: "0px 0px 20px" }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Category"
                          variant="outlined"
                          name="catagoryName"
                          className="search-border"
                          onChange={formik.handleChange}
                          value={formik.values.catagoryName}
                        />
                      </Typography>
                      <Typography
                        component="span"
                        id="keep-mounted-modal-description"
                        sx={{
                          mt: 2,
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ backgroundColor: "#765827" }}
                        >
                          Submit
                        </Button>
                      </Typography>
                    </form>
                  </Box>
                </Modal>
              </Box>
            </Box>
          </Box>

          <Box>
            <TableContainer style={{ marginTop: 20 }}>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#765827",
                      "& .MuiTableCell-root": { color: "white !important" },
                    }}
                  >
                    <TableCell>No</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CategoryData.map((item, index) => {
                    const rowStyle = {
                      backgroundColor: index % 2 === 0 ? "#EDDFB3" : "#D8CCA3",
                    };
                    return (
                      <TableRow key={index} style={rowStyle}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.catagoryName}</TableCell>
                        <TableCell>
                          <Switch
                            checked={item.status == "on" ? true : false}
                            onClick={() =>
                              updateStatusCategoryData(
                                item._id,
                                item.status == "on" ? "off" : "on"
                              )
                            }
                            sx={{
                              "& .MuiSwitch-thumb": {
                                color:
                                  item.status == "on" ? "#765827" : "#765827", // Thumb color
                              },
                              "& .MuiSwitch-track": {
                                backgroundColor:
                                  item.status == "on"
                                    ? "#765827 !important"
                                    : "#765827", // Track color
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteCategoryData(item._id);
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success",
                                  });
                                }
                              });
                            }}
                          >
                            <DeleteIcon
                              fontSize="inherit"
                              sx={{ color: "#765827" }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="update"
                            size="large"
                            onClick={() => {
                              setEditId(item._id);
                              setinitialValues(item);
                              setAddUpdateTitle("Update");
                              handleOpen();
                            }}
                          >
                            <EditIcon
                              fontSize="inherit"
                              sx={{ color: "#765827" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {loader && (
              <Box sx={{ textAlign: "center", margin: "20px 0px" }}>
                <div sx={{ display: "block" }}>
                  <span className="loader"></span>
                </div>
              </Box>
            )}
            {CategoryData.length == 0 && !loader && (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "20px",
                  fontWeight: "600",
                }}
              >
                No Data Found
              </Box>
            )}
          </Box>
        </Box>
      </DemoDrawer>
    </>
  );
};

export default Category;
