import React, { useEffect, useState } from "react";
import DemoDrawer from "../../Components/Drawer";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  padding: 3,
};

const CategorySerchData = [
  { label: "The Godfather", id: 1 },
  { label: "Pulp Fiction", id: 2 },
];

const AllCategoryData = [
  { label: "Technology", id: 1 },
  { label: "Demo", id: 2 },
];

const SubCategory = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editId, seteditId] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [addUpdateTitle, setAddUpdateTitle] = useState("Add");
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  let [loader, setLoader] = useState(false);

  let token = localStorage.getItem("login_token");

  const formik = useFormik({
    initialValues: { ...initialValues },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editId == null) {
        addSubCategoryData(values);
      } else {
        updateSubCategory(editId, values);
      }
      // console.log(values);
      seteditId(null);
      setInitialValues({
        subCatagoryname: "",
        catagoryID: "",
      });
      resetForm();
      handleClose();
    },
  });

  const getCategoryData = async () => {
    try {
      const res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/catagory",
        {
          headers: { Authorization: token },
        }
      );

      let categoryResponse = res.data.data;

      categoryResponse = categoryResponse.filter(
        (category) => category.status == "on"
      );

      categoryResponse = categoryResponse.map((category) => {
        return { label: category.catagoryName, id: category._id };
      });

      // console.log("categoryResponse :- ", categoryResponse);
      setCategoryData(categoryResponse);
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

  const getSubCategoryData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/subcatagory",
        {
          headers: { Authorization: token },
        }
      );
      // console.log("get sub category ==",res.data.data);

      const subCategoryData = res.data.data;

      subCategoryData.filter((sub) => {
        if (sub.catagoryID?.status == "off") {
          sub.status = "off";
        }
      });
      setSubCategoryData(subCategoryData);
    } catch (error) {
      // console.log(error.response.data);
      // toast.error(error.response.data.message);
      Swal.fire({
        title: error.response?.data?.message || "An unexpected error occurred",
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
    } finally {
      setLoader(false);
    }
  };

  const addSubCategoryData = async (values) => {
    try {
      // console.log("values :- ", values);

      const data = await axios.post(
        "https://interviewhub-3ro7.onrender.com/subcatagory/create",
        values,
        {
          headers: { Authorization: token },
        }
      );
      // console.log(" add sub-category =", data.data.data);
      getSubCategoryData();
      toast.success("Add SubCategory Successfuly");
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

  const deleteSubCategory = async (id) => {
    try {
      const data = await axios.delete(
        "https://interviewhub-3ro7.onrender.com/subcatagory/" + id,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("delete subCategory", data);
      getSubCategoryData();
      // toast.success("Delete SubCategory Successfully");
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

  const updateSubCategory = async (id, values) => {
    try {
      const data = await axios.patch(
        "https://interviewhub-3ro7.onrender.com/subcatagory/" + id,
        values,
        {
          headers: { Authorization: token },
        }
      );
      // console.log(data);
      toast.success("Update SubCategory Successfuly");
      getSubCategoryData();
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

  const searchSubCategory = async (event) => {
    try {
      const data = await axios.get(
        "https://interviewhub-3ro7.onrender.com/subcatagory/?search=" +
          event.target.value,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("serch subCategory := ", data);
      // getSubCategoryData();
    } catch (error) {
      // console.log(error.response.data);
    }
  };

  const updateStatusSubCategoryData = async (id, values) => {
    try {
      const data = await axios.patch(
        "https://interviewhub-3ro7.onrender.com/subcatagory/" + id,
        { status: values },
        {
          headers: { Authorization: token },
        }
      );
      // console.log("udate category=", data);
      getSubCategoryData();
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
    getSubCategoryData();
  }, []);

  // let debounceTimeout;

  // const Debugging = (event) => {
  //   const searchData = event.target.value;

  //   if (debounceTimeout) clearTimeout(debounceTimeout);

  //   debounceTimeout = setTimeout(() => {
  //     searchSubCategory(searchData);
  //   }, 1000);
  // };

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
                options={CategorySerchData}
                renderInput={(params) => (
                  <TextField
                    className="search-border"
                    {...params}
                    label="Search Sub Category"
                    onChange={(e) => {
                      searchSubCategory(e);
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: "17%" }}>
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
                Add Sub Category
              </Button>
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box sx={style}>
                  <Typography id="keep-mounted-modal-description">
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "500",
                        textAlign: "center",
                        margin: "5px 0px 25px",
                        width: "100%",
                        display: "block",
                        color: "#765827",
                      }}
                    >
                      {addUpdateTitle} Sub Category
                    </span>
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <Typography
                      id="keep-mounted-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ margin: "0px 0px 20px" }}
                    >
                      <TextField
                        className="search-border"
                        id="outlined-basic"
                        label="Sub Category"
                        variant="outlined"
                        name="subCatagoryname"
                        sx={{ width: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.subCatagoryname}
                      />
                    </Typography>

                    <Typography
                      id="keep-mounted-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ margin: "0px 0px 20px" }}
                    >
                      <Autocomplete
                        disablePortal
                        options={CategoryData}
                        getOptionLabel={(option) => option.label || ""}
                        onChange={(event, value) =>
                          formik.setFieldValue(
                            "catagoryID",
                            value ? value.id : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            className="search-border"
                            {...params}
                            label="Category Name"
                          />
                        )}
                      />
                    </Typography>

                    <Typography
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
                    <TableCell>Sub-Category Name</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SubCategoryData.map((item, index) => {
                    const rowStyle = {
                      backgroundColor: index % 2 === 0 ? "#EDDFB3" : "#D8CCA3",
                    };
                    return (
                      <TableRow key={index} style={rowStyle}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.subCatagoryname}</TableCell>
                        <TableCell>
                          {item.catagoryID ? item.catagoryID.catagoryName : "-"}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={item.status == "on"}
                            onClick={() =>
                              updateStatusSubCategoryData(
                                item._id,
                                item.status == "on" ? "off" : "on"
                              )
                            }
                            sx={{
                              "& .MuiSwitch-thumb": {
                                color:
                                  item.status == "on" ? "#765827" : "#765827",
                              },
                              "& .MuiSwitch-track": {
                                backgroundColor:
                                  item.status == "on"
                                    ? "#765827 !important"
                                    : "#765827",
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
                                  deleteSubCategory(item._id);
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
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                              seteditId(item._id);
                              setInitialValues(item);
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
          </Box>
        </Box>
      </DemoDrawer>
    </>
  );
};

export default SubCategory;
