import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../Signup/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Login = () => {
  let navigate = useNavigate()
  let token = localStorage.getItem("login_token");
  let [loader, setLoader] = useState(false);
  const [clickPass, setClickPass] = useState(false)


  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token]);

  if(loader){
    return <div class="loader-container">
    <span class="loader"></span>
  </div>
  }



  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter Valid Email"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Please Enter Valid Password"),
  });

  const LoginHandler = async (values) => {
    try {
      const data = await axios.post(
        "https://interviewhub-3ro7.onrender.com/admin/login",
        values
      );
      console.log(data.data.token);
      localStorage.setItem("login_token",data.data.token)
  
      toast.success("Login Successfully..");
      navigate("/admin")
    } catch (error) {
      // console.log("Login ERRor", error);
      // alert("Login Error :- " +  error.response.data.message)
      // toast.error(error.response.data.message);
      Swal.fire({
        title: (error.response.data.message),
        icon: "error",
        customClass: {
          title: 'custom-title'
        }
      });
    }finally{
      setLoader(false)
    }
  };
  return (
    <>
      <div className="signup-main">
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              console.log(values);
              setLoader(true);
              LoginHandler(values);
            }}
          >
            <Form>
              <div className="s-content">
                <div style={{ textAlign: "center", paddingTop: "40px" }}>
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: "30px" }} />
                  <h1 style={{ textAlign: "center", margin: "0px" }}>Login</h1>
                </div>
                <div className="field">
                  <div style={{ textAlign: "center" }}>
                    <label htmlFor="email"></label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      className="f-content"
                    />
                    <p className="error">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <br />

                  <div className="f-pass" style={{ textAlign: "center" }}>
                    <label htmlFor="password"></label>
                    <Field
                      id="password"
                      name="password"
                      type={`${clickPass ? "text" : "password"}`}
                      placeholder="Password"
                      className="f-content"
                    />
                    {
                      clickPass ? (
                        <FontAwesomeIcon icon={faEyeSlash} className="pass-icon" onClick={() => setClickPass(!clickPass)} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} className="pass-icon" onClick={() => setClickPass(!clickPass)} />
                      )
                    }
                    <p className="error">
                      <ErrorMessage name="password" />
                    </p>
                  </div>
                  <br />

                  <div style={{ textAlign: "center" }}>
                    <button type="submit" className="f-content1">
                      Submit
                    </button>
                  </div>

                  <p className="text-center login">
                    Don't have an account? <Link to={"/admin/signup"}>Signup</Link>
                  </p>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
