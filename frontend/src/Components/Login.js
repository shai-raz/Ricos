import React from "react"
import logo from "../img/logo.png"
import ricos from "../img/ricos.png"
import { useForm } from "react-hook-form"
import axios from 'axios'
import "../css/login.css"
import { useHistory } from "react-router-dom"
import { LOGIN_API_URL } from "../consts"

const Login = () => {
  const history = useHistory()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log("data: ", data)
    console.log(LOGIN_API_URL)
    axios
      .post(LOGIN_API_URL, data)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          localStorage.setItem('jwt', res.data)
          history.go(0) // refresh page and be re-routed to main
        }
      })
      .catch((err) => {
        //console.error(err)
        if (err.response.status === 401) {
          alert("Invalid username or password")
        }
      })
  }

  return (
      <div className="login-main">
        <div id="login-container">
          <div className="logbox">
            <div id="login-logo">
              <img src={logo} alt="Logo" />
            </div>
            <div id="login-ricos">
              <img src={ricos} alt="Ricos" />
            </div>
            <div className="login-form-wrap">
              <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="login-input-box">
                  <input
                    {...register("name", {
                      required: true,
                      maxLength: 30,
                    })}
                    className={`specific-login-input login-input`}
                    type="text"
                    id="name"
                    placeholder="Username or email"
                    required
                  />
                </div>
                <div className="login-input-box">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 30,
                    })}
                    className={`specific-login-input login-input`}
                    type="password"
                    id="pass"
                    placeholder="Password"
                    required
                  />
                </div>
                {
                  /* Error Message - Password */
                  errors.password && (
                    <p className="login-validation-error">
                      Password must contain at least 6 characters
                    </p>
                  )
                }
                <div className="login-button-box">
                  <button className="login-btn" type="submit" name="submit">
                    Log in
                  </button>
                </div>
                <div className="login-forgot-box">
                  <a className="login-forgot" href="/">
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
            <div className="logbox login-register-box">
              <p className="text">
                Don't have an account?
                <a href="/register">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login
