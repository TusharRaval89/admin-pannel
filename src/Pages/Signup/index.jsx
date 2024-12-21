import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";

const Signup = () => {
  let navigate = useNavigate();
  const [clickPass, setClickPass] = useState(false);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter Email Address !!!"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Please Enter Valid Password !!!"),
  });

  const SignupHandler = async (values) => {
    try {
      const data = await axios.post(
        "https://interviewhub-3ro7.onrender.com/admin/signup",
        values
      );
      // console.log(data);
      navigate("/admin/login");

      toast.success("SignUp Successfully..");
    } catch (error) {
      // console.log("signup ERRor", error);
      // alert("signup ERRor :- " + error.response.data.message)
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

  return (
    <>
      <div className="signup-main">
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              // console.log(values);
              SignupHandler(values);
            }}
          >
            <Form>
              <div className="s-content">
                <div style={{ textAlign: "center" }}>
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: "30px" }} />
                  <h1 style={{ textAlign: "center", margin: "0px" }}>
                    Sign Up
                  </h1>
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
                      placeholder="Password"
                      type={`${clickPass ? "text" : "password"}`}
                      className="f-content"
                    />
                    {clickPass ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="pass-icon"
                        onClick={() => setClickPass(!clickPass)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="pass-icon"
                        onClick={() => setClickPass(!clickPass)}
                      />
                    )}
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
                    Already have an account?{" "}
                    <Link to={"/admin/login"}>Login</Link>
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
export default Signup;
