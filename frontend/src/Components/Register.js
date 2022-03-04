import "../css/register.css"
import "../css/login.css"
import axios from "axios"
import logo from '../img/logo.png'
import ricos from '../img/ricos.png'
import { useForm } from 'react-hook-form'
import { REGISTER_API_URL } from "../consts"
import { useHistory } from 'react-router-dom'

const Register = () => {
  const history = useHistory()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log("dfgsdfgsdfgs")
    console.log(data)
    axios
      .post(REGISTER_API_URL, data)
      .then((e) => {
        if (e.status === 200) {
          history.push('/login')
        }
      })
      .catch((err) => {
        console.error(err)
        if (err.response.status === 500) {
          alert("Username or Email already exists, please try again")
        }
      })
  }

  return (
    <>
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
                    {...register("firstName", {
                      required: true,
                      maxLength: 30,
                    })}
                    className={`specific-login-input login-input`}
                    name="firstName"
                    type="text"
                    id="first-name"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="login-input-box">
                  <input
                    {...register("lastName", {
                      required: true,
                      maxLength: 30,
                    })}
                    className={`specific-login-input login-input`}
                    name="lastName"
                    type="text"
                    id="last-name"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="login-input-box">
                  <input
                    {...register("username", {
                      required: true,
                      maxLength: 30,
                    })}
                    className={`specific-login-input login-input`}
                    name="username"
                    type="text"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="login-input-box">
                  <input
                    {...register("mail", {
                      required: true,
                      maxLength: 100,
                    })}
                    className={`specific-login-input login-input`}
                    name="mail"
                    type="email"
                    id="mail"
                    placeholder="Email"
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
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
