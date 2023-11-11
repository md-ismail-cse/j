import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import axios from "axios";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleClickShowPassword3 = () => setShowPassword3((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword3 = (event) => {
    event.preventDefault();
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentThumb, setThumb] = useState("");
  const [loading, setLoading] = useState(false);

  // GET CUSTOMER DETAILS
  const id = localStorage.getItem("cID");
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`/api/admin/customers/${id}`);
      setThumb(data.thumb);
      setEmail(data.email);
      setLoading(true);
    };
    fatchCustomer();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword === conPassword) {
      let updateData = {
        oldPassword,
        newPassword,
        email,
        thumb: currentThumb,
      };
      axios
        .put(`/api/admin/customers/${id}?cthumb=${currentThumb}`, updateData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.message === "Something wrong.") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          } else if (response.data.message === "Old password doesn't match.") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: response.data.message,
              showConfirmButton: false,
              timer: 1000,
            }).then(() => (window.location.href = "/profile"));
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update field!",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Confirm password doesn't match.",
      });
    }
  };

  return (
    <>
      <div className="changePassword">
        <Title title="Change Password" />
        <div className="content">
          <div className="form-box">
            {loading ? (
              <form className="form" onSubmit={submitHandler}>
                <FormControl
                  required
                  fullWidth
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Old password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password1"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <i className="ri-eye-off-fill"></i>
                          ) : (
                            <i className="ri-eye-fill"></i>
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl
                  required
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    New password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password2"
                    type={showPassword2 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                          edge="end"
                        >
                          {showPassword2 ? (
                            <i className="ri-eye-off-fill"></i>
                          ) : (
                            <i className="ri-eye-fill"></i>
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl
                  required
                  fullWidth
                  value={conPassword}
                  onChange={(e) => setConPassword(e.target.value)}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password3"
                    type={showPassword3 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword3}
                          onMouseDown={handleMouseDownPassword3}
                          edge="end"
                        >
                          {showPassword3 ? (
                            <i className="ri-eye-off-fill"></i>
                          ) : (
                            <i className="ri-eye-fill"></i>
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <input type="submit" className="btnPrimary" />
              </form>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
