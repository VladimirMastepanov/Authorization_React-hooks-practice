import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={authFailed}
                  required
                />
                <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary">Submit</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// const LoginPage = () => {
//   const inputForFocus = useRef(null);
//   const [error, setError] = useState(false)
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logIn } = useAuth();

//   const from = location.state?.from?.pathname || '/';

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//     },
//     onSubmit: async (values) => {
//       const data = {
//         username: values.username,
//         password: values.password,
//       };
//       try {
//         const response = await axios.post(routes.loginPath(), data);
//         setError(false);
//         window.localStorage.setItem('userId', JSON.stringify(response.data));
//         logIn();
//         navigate(from);
//       } catch (e) {
//         setError(true);
//       }
//     },
//   })

//   useEffect(() => {
//     if (inputForFocus.current) {
//       inputForFocus.current.focus();
//     }
//   }, [])

//   return (
//     <Form noValidate onSubmit={formik.handleSubmit}>
//       <Form.Group>
//         <Form.Label htmlFor="username">Username</Form.Label>
//         <Form.Control
//           value={formik.values.username}
//           onChange={formik.handleChange}
//           ref={inputForFocus}
//           isInvalid={error}
//           placeholder="username"
//           name="username"
//           required
//           id="username" />
//       </Form.Group>
//       <Form.Group>
//         <Form.Label htmlFor="password">Password</Form.Label>
//         <Form.Control
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           isInvalid={error}
//           placeholder="password"
//           name="password"
//           required
//           id="password"
//           type="password" />
//         <Form.Control.Feedback type="invalid">
//           The username or password is incorrect
//         </Form.Control.Feedback>
//       </Form.Group>
//       <Button type="submit">Submit</Button>
//     </Form>
//   )
// };
