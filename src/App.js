import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./App.css";
import * as Yup from "yup";

function App() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

  return (
    <div className="card m-3">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <h1> Sign Up </h1>
            <div>
              <label>User Name</label>
              <input {...register("username")} />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="form-group col">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <p>{errors.password?.message}</p>
              </div>
            </div>
            <div className="form-group col">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <p>{errors.confirmPassword?.message}</p>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1">
              Register
            </button>
            <a href="">Reset Password</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
