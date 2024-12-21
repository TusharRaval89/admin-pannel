import React, { useEffect, useState } from "react";
import DemoDrawer from "../../Components/Drawer";
import {
  Autocomplete,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SubCategory from "../SubCategory";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "600px",
    maxWidth: "80%",
  },
}));

const AllCategoryData = [
  { label: "React", id: "6483dabc1234567890abcdef" },
  { label: "Node.js", id: "6483dabc1234567890abcdf1" },
];

const QA = () => {
  const [QuestionData, setQuestionData] = useState([
    // {
    //   id: 1,
    //   questions: "how r u?",
    //   answer: "i am fine..",
    //   subCatagoryname: "React",
    //   catagoryName: "IT",
    // },
  ]);
  const [CategoryData, setCategoryData] = useState([]);
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [editId, seteditId] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  let [loader, setLoader] = useState(false);
  

  const [open, setOpen] = React.useState(false);
  let token = localStorage.getItem("login_token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: { ...initialValues },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      // console.log(values);
      if (editId == null) {
        addQuestionData(values);
      } else {
        updateQuestionData(editId, values);
      }
      seteditId(null);
      setInitialValues({
        questions: "",
        answer: "",
        subcatagoryID: "",
      });
      resetForm();
    },
  });

  // const getSubCategoryData = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://interviewhub-3ro7.onrender.com/subcatagory",
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );

  //     let SubCategoryResponse = res.data.data;

  //     SubCategoryResponse = SubCategoryResponse.map((subcategory) => {
  //       return {
  //         label: subcategory.subCatagoryname,
  //         id: subcategory._id,
  //         catagoryName: subcategory.catagoryID.catagoryName,
  //       };
  //     });
  //     console.log(" get subcategory ==", res.data.data);
  //     setSubCategoryData(SubCategoryResponse);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  // const getSubCategoryData = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://interviewhub-3ro7.onrender.com/subcatagory",
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
  //     console.log("=======>",res);

  //   } catch (error) {
  //     console.log(error.response.data);

  //   }
  // };

  const getSubCategoryData = async () => {
    try {
      const res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/subcatagory",
        {
          headers: { Authorization: token },
        }
      );

      if (res && res.data && res.data.data) {
        const SubCategoryResponse = res.data.data.map((subcategory) => ({
          label: `${subcategory.subCatagoryname || "Unknown Subcategory"} (${
            subcategory.catagoryID?.catagoryName || "Unknown Category"
          })`,
          id: subcategory._id || "Unknown ID",
          catagoryName:
            subcategory.catagoryID?.catagoryName || "Unknown Category",
        }));

        // console.log("Fetched SubCategoryData:", SubCategoryResponse);
        setSubCategoryData(SubCategoryResponse);
      } else {
        console.error("Unexpected response format:", res);
        setSubCategoryData([]);
      }
    } catch (error) {
      console.error(
        "Error fetching subcategories:",
        error.response?.data || error.message
      );
      setSubCategoryData([]);
    }
  };

  const getCategoryData = async () => {
    try {
      const res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/catagory",
        {
          headers: { Authorization: token },
        }
      );

      let categoryResponse = res.data.data;

      categoryResponse = categoryResponse.map((category) => {
        return { label: category.catagoryName, id: category._id };
      });

      // console.log("categoryResponse :- ", categoryResponse);
      setCategoryData(categoryResponse);
    } catch (error) {
      // console.log(error.response.data);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
    }
  };

  const getQuestionData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/questions/",
        {
          headers: { Authorization: token },
        }
      );
      // console.log("getQa =", res.data.data);
      setQuestionData(res.data.data);
    } catch (error) {
      // console.log(error.response.data);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
    }finally {
      setLoader(false);
    }
  };

  const addQuestionData = async (values) => {
    try {
      // console.log("add value ====",values);

      const data = await axios.post(
        "https://interviewhub-3ro7.onrender.com/questions/create",
        values,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("add qa=", data.data.data);
      getQuestionData();
      toast.success("Add Q & A Successfuly");
    } catch (error) {
      // console.log(error.response.data);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        customClass: {
          title: "custom-title",
        },
      });
    }
  };

  const deleteQuestionData = async (id) => {
    try {
      const data = await axios.delete(
        "https://interviewhub-3ro7.onrender.com/questions/" + id,
        {
          headers: { Authorization: token },
        }
      );
      // console.log(data.data);
      getQuestionData();
    } catch (error) {
      // console.log(error.response.data);
    }
  };

  const updateQuestionData = async (id, values) => {
    try {
      const data = await axios.patch(
        "https://interviewhub-3ro7.onrender.com/questions/" + id,
        values,
        {
          headers: { Authorization: token },
        }
      );
      // console.log(data);
      getQuestionData();
      toast.success("Update Q & A Successfuly");
    } catch (error) {
      // console.log(error.response.data);
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
    getQuestionData();
  }, []);

  return (
    <>
      <DemoDrawer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "80%" }}></Box>
          <Box sx={{ width: "17%" }}>
            <React.Fragment>
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                  padding: "15px",
                  width: "100%",
                  backgroundColor: "#765827",
                }}
              >
                ADD Q & A
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle
                  sx={{ m: 0, p: 2, color: "#765827" }}
                  id="customized-dialog-title"
                >
                  Add Q & A
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
                <form onSubmit={formik.handleSubmit}>
                  <DialogContent dividers>
                    <Typography
                      id="keep-mounted-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ margin: "0px 0px 20px" }}
                    >
                      <TextField
                        className="search-border"
                        id="outlined-basic"
                        label="Questions"
                        variant="outlined"
                        name="questions"
                        sx={{ width: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.questions}
                      />
                    </Typography>

                    <Typography
                      id="keep-mounted-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ margin: "0px 0px 20px" }}
                    >
                      <TextField
                        className="search-border"
                        id="outlined-basic"
                        label="Answers"
                        variant="outlined"
                        name="answer"
                        sx={{ width: "100%" }}
                        onChange={formik.handleChange}
                        value={formik.values.answer}
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
                        options={SubCategoryData || []}
                        getOptionLabel={(option) => option.label || ""}
                        onChange={(event, value) =>
                          formik.setFieldValue(
                            "subcatagoryID",
                            value ? value.id : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            className="search-border"
                            {...params}
                            label="Sub-Category (Category)"
                          />
                        )}
                      />
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ backgroundColor: "#765827" }}
                      autoFocus
                      onClick={handleClose}
                    >
                      SUBMIT
                    </Button>
                  </DialogActions>
                </form>
              </BootstrapDialog>
            </React.Fragment>
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
                  <TableCell>Questions</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Sub-Category</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {QuestionData.map((item, index) => {
                  const rowStyle = {
                    backgroundColor: index % 2 === 0 ? "#EDDFB3" : "#D8CCA3",
                  };
                  return (
                    <TableRow key={index} style={rowStyle}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.questions}</TableCell>
                      <TableCell>{item.answer}</TableCell>
                      <TableCell>
                        {item.subcatagoryID
                          ? item.subcatagoryID.subCatagoryname
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {item.subcatagoryID
                          ? item.subcatagoryID.catagoryID.catagoryName
                          : "-"}
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
                                deleteQuestionData(item._id);
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
                            seteditId(item._id);
                            setInitialValues(item);
                            handleClickOpen();
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
      </DemoDrawer>
    </>
  );
};

export default QA;
