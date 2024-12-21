import React, { useEffect, useState } from "react";
import DemoDrawer from "../../Components/Drawer";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DashBoard = () => {
  let [categoryCount, setCategoryCount] = useState(0);
  let [subCategoryCount, setSubCategoryCount] = useState(0);
  let [questionCount,setQuestionCount]= useState(0)
  let token = localStorage.getItem("login_token");

  const getCategorydata = async () => {
    try {
      let res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/catagory/count",
        {
          headers: { Authorization: token },
        }
      );
      // console.log(res.data.data);
      setCategoryCount(res.data.data);
    } catch (error) {
      // console.log(error.response.data);
      // toast.error(error.response.data.message);
      Swal.fire({
        title: (error.response.data.message),
        icon: "error",
        customClass: {
          title: 'custom-title'
        }
      });

    }
  };

  const getSubCategory = async () => {
    try {
      let res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/subcatagory/count",
        {
          headers: { Authorization: token },
        }
      );
      // console.log("subcategory res==", res.data.data);
      setSubCategoryCount(res.data.data);
    } catch (error) {
      // console.log(error.response.data);
      // toast.error(error.response.data.message);
      Swal.fire({
        title: (error.response.data.message),
        icon: "error",
        customClass: {
          title: 'custom-title'
        }
      });

    }
  };

  const getQA = async () => {
    try {
      let res = await axios.get(
        "https://interviewhub-3ro7.onrender.com/questions/count",
        {
          headers: { Authorization: token },
        }
      );
      // console.log("qa res=", res.data.data);
      setQuestionCount(res.data.data)
    } catch (error) {
      // console.log(error.response.data);
      // toast.error(error.response.data.message);
      Swal.fire({
        title: (error.response.data.message),
        icon: "error",
        customClass: {
          title: 'custom-title'
        }
      });

      
    }
  };

  useEffect(() => {
    getCategorydata();
    getSubCategory();
    getQA();
  }, []);

  return (
    <Box>
      <DemoDrawer>
        <Box>
          <Grid sx={{ display: "flex", gap: "15px" }}>
            <Grid item xs={4}>
              <Card
                sx={{
                  minWidth: 350,
                  width: "33.33%",
                  boxShadow: "rgb(204, 204, 204) 0px 0px 5px",
                  backgroundColor:"#765827",
                  color:'white',
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography component="div">
                    <h2 style={{ marginTop: "0" }}>Total Category</h2>
                    <h1 style={{ fontSize: "48px", margin: "0 auto" }}>
                      {categoryCount}
                    </h1>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                sx={{
                  minWidth: 350,
                  width: "33.33%",
                  boxShadow: "rgb(204, 204, 204) 0px 0px 5px",
                  backgroundColor:"#765827",
                  color:'white',
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography component="div">
                    <h2 style={{ marginTop: "0 " }}>Total Sub Category</h2>
                    <h1 style={{ fontSize: "48px", margin: "0 auto" }}>
                      {subCategoryCount}
                    </h1>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                sx={{
                  minWidth: 350,
                  width: "33.33%",
                  boxShadow: "rgb(204, 204, 204) 0px 0px 5px",
                  backgroundColor:"#765827",
                  color:'white',
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography component="div">
                    <h2 style={{ marginTop: "0" }}>Total Q / A</h2>
                    <h1 style={{ fontSize: "48px", margin: "0 auto" }}>{questionCount}</h1>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </DemoDrawer>
    </Box>
  );
};

export default DashBoard;
