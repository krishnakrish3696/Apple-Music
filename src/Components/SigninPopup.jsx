"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import { Portal } from "@mui/base/Portal";
import { FocusTrap } from "@mui/base/FocusTrap";
import { Button } from "@mui/base/Button";
import { unstable_useModal as useModal } from "@mui/base/unstable_useModal";
import Fade from "@mui/material/Fade";
import { BsApple } from "react-icons/bs";
import Btn from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SiHandshake } from "react-icons/si";
import { SlClose } from "react-icons/sl"; 
import "../Styles/SigninPopup.css";
import { toast } from "react-toastify";



const theme = createTheme({
  palette: {
    primary: red,
  },
});

export default function UseModal() {
  const [open, setOpen] = React.useState(false);
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const navigate = useNavigate();
  const [name, usernamechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [appType, appTypechange] = useState("music");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const Username = localStorage.getItem("Token");
  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';
    if (name === null || name === '') {
        isproceed = false;
        errormessage += ' Fullname';
    }
    if (password === null || password === '') {
        isproceed = false;
        errormessage += ' Password';
    }
    if (email === null || email === '') {
        isproceed = false;
        errormessage += ' Email';
    }

    if(!isproceed){
        toast.warning(errormessage)
    }else{
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

        }else{
            isproceed = false;
            toast.warning('Please enter the valid email')
        }
    }
    return isproceed;
}

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateAccount = () => {
    setShowSignUpModal(true);
  };

const handlesubmit = (e) => {
  e.preventDefault();
  let regobj = { name, email, password, appType };
  if (IsValidate()) {
      fetch("https://academics.newtonschool.co/api/v1/user/signup", {
          method: "POST",
          headers: {
              'content-type': 'application/json',
              'projectID': 'knjxpr9vh9wr'
          },
          body: JSON.stringify(regobj)
      }).then((res) => {
          if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json(); // Assuming the response is in JSON format
      }).then((data) => {
          localStorage.setItem("Token",data.token);
          localStorage.setItem("UserData",JSON.stringify(data.data.user));
          toast.success('Registered successfully.');
          window.location.reload();
      }).catch((err) => {
          toast.error('Failed: ' + err.message);
      });
      setShowSignUpModal(false);
      setOpen(false);
  }
}

const handleContinue = (e) => {
  e.preventDefault();
  let signinObj = { email, password, appType };
  if(email != null || email != '' && password != null || password != '')
  {
    fetch("https://academics.newtonschool.co/api/v1/user/login", {
          method: "POST",
          headers: {
              'content-type': 'application/json',
              'projectID': 'knjxpr9vh9wr'
          },
          body: JSON.stringify(signinObj)
      }).then((res) => {
          if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json(); // Assuming the response is in JSON format
      }).then((data) => {
          localStorage.setItem("Token",data.token);
          localStorage.setItem("UserData",JSON.stringify(data.data.user));
          toast.success('Registered successfully.');
          window.location.reload();
          setShowSignUpModal(false);
          setOpen(false);
      }).catch((err) => {
          alert("Enter Valid Email and Password");
          toast.error('Failed: ' + err.message);
      });

  }

}

  return (
    <div> 
      <TriggerButton id="Siginbtn" onClick={handleOpen}>Sign In</TriggerButton> 
      {!showSignUpModal && Username === null && (
      <Modal
        id="SignInModel"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <div>
              <SlClose size={30}/>
            </div>
            <div className="Icon">
              <BsApple size={50} />
            </div>
            <h2 id="transition-modal-title" className="modal-title">
              Sign In or Sign Up
            </h2>
            <h3 id="transition-modal-description" className="modal-description">
              Enter your email to get started.
            </h3>
            <div className="txtMail">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "400px" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Email or Apple ID"
                  variant="outlined"
                  required value={email} onChange={e => emailchange(e.target.value)} 
                />
              </Box>
            </div>
            <div className="txtMail">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "400px" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  required value={password} onChange={e => passwordchange(e.target.value)}
                />
              </Box>
            </div>
            <div className="lnkForgetPwd">
              <a href="https://iforgot.apple.com/password/verify/appleid">
                Forgot Apple ID or Password?
              </a>
            </div>
            <div className="lnkMediaServices">
              <a href="https://www.apple.com/legal/privacy/data/en/apple-id-media-services/">
                See how your data is managed...
              </a>
            </div>
            <div className="btnClass">
              <ThemeProvider theme={theme}>
                <Btn className="continuebtn" variant="contained" onClick={handleContinue}>
                  Continue
                </Btn>
              </ThemeProvider>
            </div>
            <div className="btnClass">
              <ThemeProvider theme={theme}>
                <Btn id="CreateButton" onClick={handleCreateAccount} className="continuebtn" variant="contained">
                  Create Account
                </Btn>
              </ThemeProvider>
            </div>
          </ModalContent>
        </Fade>
      </Modal>
      )}
      {showSignUpModal && Username === null && (
        <Modal
          id="SignUpModel"
          open={showSignUpModal}
          onClose={() => setShowSignUpModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={open}>
          <ModalContent sx={style}>
            <div>
              <SlClose size={30} />
            </div>
            <div className="Icon">
              <BsApple size={50} />
            </div>
            <h2 id="transition-modal-title" className="modal-title">
              Create Account
            </h2>
            <h3 id="transition-modal-description" className="modal-description">
              Enter your details to get started.
            </h3>
            <div className="txtMail">
              <Box component="form" sx={{"& > :not(style)": { m: 1, width: "500px" },}} noValidate autoComplete="off">
                  <TextField id="txtUsername" required value={name} onChange={e => usernamechange(e.target.value)} className="outlined-basic" error={nameError} helperText={nameError} label="UserName" variant="outlined"/>
              </Box>
            </div>
            <div className="txtMail">
              <Box component="form" sx={{"& > :not(style)": { m: 1, width: "500px" },}} noValidate autoComplete="off">
                <TextField id="txtEmail" required value={email} onChange={e => emailchange(e.target.value)} className="outlined-basic" label="Email" type="email" error={emailError} helperText={emailError} variant="outlined"/>
              </Box>
            </div>
            <div className="txtMail">
              <Box component="form" sx={{"& > :not(style)": { m: 1, width: "500px" },}} noValidate autoComplete="off">
                <TextField id="txtPassword" required value={password} onChange={e => passwordchange(e.target.value)} className="outlined-basic" label="Password" type="password" error={passwordError} helperText={passwordError} variant="outlined"/>
              </Box>
            </div>
            <div className="btnClass">
              <ThemeProvider theme={theme}>
                <Btn className="continuebtn" variant="contained" onClick={handlesubmit}>
                  SignUp
                </Btn>
              </ThemeProvider>
            </div>
          </ModalContent>
          </Fade>
        </Modal>
      )}
    </div> 
  );
}

const Modal = React.forwardRef(function Modal(props, forwardedRef) {
  const {
    children,
    closeAfterTransition = false,
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onClose,
    open,
    onTransitionEnter,
    onTransitionExited,
    ...other
  } = props;

  const propsWithDefaults = {
    ...props,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
  };

  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition,
  } = useModal({
    ...propsWithDefaults,
    rootRef: forwardedRef,
  });

  const classes = {
    hidden: !open && exited,
  };

  const childProps = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = "-1";
  }

  // It's a Transition like component
  if (hasTransition) {
    const { onEnter, onExited } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }

  const rootProps = {
    ...other,
    className: clsx(classes),
    ...getRootProps(other),
  };

  const backdropProps = {
    open,
    ...getBackdropProps(),
  };

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  return (
    <Portal ref={portalRef} container={container} disablePortal={disablePortal}>
      <CustomModalRoot {...rootProps}>
        {!hideBackdrop ? <CustomModalBackdrop {...backdropProps} /> : null}
        <FocusTrap
          disableEnforceFocus={disableEnforceFocus}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          isEnabled={isTopModal}
          open={open}
        >
          {React.cloneElement(children, childProps)}
        </FocusTrap>
      </CustomModalRoot>
    </Portal>
  );
});

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeAfterTransition: PropTypes.bool,
  container: PropTypes.oneOfType([
    function (props, propName) {
      if (props[propName] == null) {
        return new Error(
          "Prop '" + propName + "' is required but wasn't specified"
        );
      } else if (
        typeof props[propName] !== "object" ||
        props[propName].nodeType !== 1
      ) {
        return new Error(
          "Expected prop '" + propName + "' to be of type Element"
        );
      }
    },
    PropTypes.func,
  ]),
  disableAutoFocus: PropTypes.bool,
  disableEnforceFocus: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  disablePortal: PropTypes.bool,
  disableRestoreFocus: PropTypes.bool,
  disableScrollLock: PropTypes.bool,
  hideBackdrop: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onClose: PropTypes.func,
  onTransitionEnter: PropTypes.func,
  onTransitionExited: PropTypes.func, 
  open: PropTypes.bool.isRequired,
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
};

const ModalContent = styled("div")(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#FFF"};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.20)"
  };
  padding: 1rem;
  color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    text-align: center;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    text-align: center;
    color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
  }
  `
);

const CustomModalRoot = styled("div")`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center; 
  justify-content: center;
`;

const CustomModalBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const TriggerButton = styled(Button)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
`
);
