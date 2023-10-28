import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  //   MDBIcon,
  MDBInput
  // MDBCheckbox
} from 'mdb-react-ui-kit';
import { Alert } from '@mui/material';
import { validateEmail, validatePhoneNumber } from 'Functions/MyFunctions';
import { AlertTitle } from '@mui/material';
import axios from '../../node_modules/axios/index';
const Auth = () => {
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');
  // SignUp form details
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // login form details
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [element, setElement] = useState([]);
  const [time, setTime] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTime(false);
    }, 5000);
  }, [element]);
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  const handleSignUp = () => {
    if (!userName || !email || !phoneno || !password || !confirmPassword) {
      setTime(true);
      setElement([
        <Alert
          key={'fillAllRequireFieldSignup'}
          style={{ position: 'fixed', bottom: '10px', width: '80%', margin: 'auto' }}
          variant="filled"
          severity="error"
        >
          {' '}
          <AlertTitle>Error</AlertTitle> Please filled all required fields.
        </Alert>
      ]);
    } else if (!validatePhoneNumber(phoneno)) {
      setTime(true);
      setElement([
        <Alert
          key={'phoneValid'}
          style={{ position: 'fixed', bottom: '10px', width: '80%', margin: 'auto' }}
          variant="filled"
          severity="error"
        >
          {' '}
          <AlertTitle>Error</AlertTitle> Enter Correct Phone no
        </Alert>
      ]);
    } else if (!validateEmail(email)) {
      setTime(true);
      setElement([
        <Alert
          key={'emailValid'}
          style={{ position: 'fixed', bottom: '10px', width: '80%', margin: 'auto' }}
          variant="filled"
          severity="error"
        >
          {' '}
          <AlertTitle>Error</AlertTitle> Enter Correct email.
        </Alert>
      ]);
    } else if (password != confirmPassword) {
      setTime(true);
      setElement([
        <Alert
          key={'passConfirm'}
          style={{ position: 'fixed', bottom: '10px', width: '80%', margin: 'auto' }}
          variant="filled"
          severity="error"
        >
          {' '}
          <AlertTitle>Error</AlertTitle> Password and confirm password must be same.
        </Alert>
      ]);
    } else if (password.length <= 5) {
      setTime(true);
      setElement([
        <Alert
          key={'passwordMinLen'}
          style={{ position: 'fixed', bottom: '10px', width: '80%', margin: 'auto' }}
          variant="filled"
          severity="error"
        >
          {' '}
          <AlertTitle>Error</AlertTitle> Password must be of minimum 5 length
        </Alert>
      ]);
    } else {
      // signUp post request
      const data = {
        name: userName,
        email: email,
        phone: phoneno,
        password: password
      };
      axios
        .post('https://sasefied-backend.onrender.com/api/user', data)
        .then((response) => {
          // Handle the successful response here
          console.log('Response data:', response.data);
          // storing user authentication information in localstorage
          localStorage.setItem('authToken', JSON.stringify(response.data));
          navigate('/');
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          setTime(true);

          setElement(
            <Alert
              key={'signUpresponseError'}
              style={{ position: 'fixed', bottom: '10px', width: '80%', margin: 'auto' }}
              variant="filled"
              severity="error"
            >
              {' '}
              <AlertTitle>Error</AlertTitle> {error.response.data.msg}
            </Alert>
          );
        });
    }
  };
  const handleLogin = () => {
    if (!loginEmail && !loginPassword) {
      setTime(true);
      setElement([
        <Alert
          key={'filledAllFieldLogin'}
          style={{ position: 'fixed', bottom: '10px', width: '80%', margin: 'auto' }}
          variant="filled"
          severity="error"
        >
          {' '}
          <AlertTitle>Error</AlertTitle>Please filled all required fields.
        </Alert>
      ]);
    } else {
      const data = {
        email: loginEmail,
        password: loginPassword
      };
      axios
        .post('https://sasefied-backend.onrender.com/api/user/login', data)
        .then((response) => {
          // Handle the successful response here
          console.log('Response data:', response.data);
          // storing user authentication information in localstorage
          localStorage.setItem('authToken', JSON.stringify(response.data));
          navigate('/');
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          setTime(true);

          setElement([
            <Alert
              key={'invalidCredential'}
              style={{ position: 'fixed', bottom: '10px', width: '80%', margin: 'auto' }}
              variant="filled"
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              {error.response.data.msg}
            </Alert>
          ]);
        });
    }
  };
  return (
    <div style={{ width: '70%', margin: 'auto' }}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50" style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>
        <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between">
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === 'tab1'}>
            <div className="text-center mb-3">
              {/* <p>Sign in with:</p> */}

              {/* <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div> */}

              {/* <p className="text-center mt-3">or:</p> */}
            </div>

            <MDBInput wrapperClass="mb-4" label="Email address" onChange={(e) => setLoginEmail(e.target.value)} id="form6" type="email" />
            <MDBInput wrapperClass="mb-4" label="Password" onChange={(e) => setLoginPassword(e.target.value)} id="form7" type="password" />

            {/* <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div> */}

            <MDBBtn className="mb-4 w-100" onClick={handleLogin}>
              Sign in
            </MDBBtn>
            <p className="text-center">
              Not a member?{' '}
              <a href="#!!" onClick={() => setJustifyActive('tab2')}>
                Register
              </a>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'tab2'}>
            {/* 
          <div className="text-center mb-3">
            <p>Sign up with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p> 
          </div> */}

            <MDBInput wrapperClass="mb-4" onChange={(e) => setUserName(e.target.value)} label="UserName" id="form1" type="text" />
            <MDBInput wrapperClass="mb-4" onChange={(e) => setPhoneNo(e.target.value)} label="Phone no." id="form2" type="text" />
            <MDBInput wrapperClass="mb-4" onChange={(e) => setEmail(e.target.value)} label="Email" id="form3" type="email" />
            <MDBInput wrapperClass="mb-4" onChange={(e) => setPassword(e.target.value)} label="Password" id="form4" type="password" />
            <MDBInput
              wrapperClass="mb-4"
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              id="form5"
              type="password"
            />

            {/* <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div> */}
            <MDBBtn className="mb-4 w-100" onClick={handleSignUp}>
              Sign Up
            </MDBBtn>
            <p className="text-center">
              Already have account?{' '}
              <a href="#!!" onClick={() => setJustifyActive('tab1')}>
                Login
              </a>
            </p>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
      {time && element}
    </div>
  );
};

export default Auth;
