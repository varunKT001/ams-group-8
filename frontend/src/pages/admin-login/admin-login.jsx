import React, { useState } from "react";
import "../user-login/user-login.css";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import useForm from "../../components/useForm/useForm";

const initialFValues = {
  adminId: "",
  adminPassword: "",
};
export default function AdminLogin() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("adminId" in fieldValues)
      temp.adminId = fieldValues.adminId.length == 5 ? "" : "Invalid Admin Id";

    if ("adminPassword" in fieldValues)
      temp.adminPassword =
        fieldValues.adminPassword.length >= 8
          ? ""
          : "Minimum 8 characters required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  return (
    <div className="main">
      <div className="card">
        <div className="card-head">Admin Login</div>
        <form action="" className="card-form">
          <TextField
            label="Admin Id"
            name="adminId"
            fullWidth
            required
            autoComplete="off"
            margin="dense"
            value={values.adminId}
            onChange={handleInputChange}
            error={errors.adminId ? true : false}
            helperText={errors.adminId}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            name="adminPassword"
            margin="dense"
            value={values.adminPassword}
            onChange={handleInputChange}
            error={errors.adminPassword ? true : false}
            helperText={errors.adminPassword}
          />
          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "#D4EDDA",
              color: "#525759",
              margin: "0.5rem 0",
            }}
          >
            <b>Login</b>
          </Button>
        </form>
        <div className="change-page">
          <Link to="/user-login" className="toggle-link">
            User Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
