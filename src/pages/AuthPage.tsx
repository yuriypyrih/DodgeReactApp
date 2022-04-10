import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { login, register, setStatusMsg } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import CustomTextfield from "../components/CustomTextfield";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "100%",
    background: "#2b2b2c",
    position: "relative",
  },
  title: {
    background: `linear-gradient(
                180deg,
               ${theme.palette.primary.dark} 45%,
               ${theme.palette.primary.main} 65%
            )`,
    " -webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    userSelect: "none",
    textAlign: "center",
    fontWeight: 500,
    fontSize: 32,
    top: 8,
    left: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  menuContainer: {
    width: 400,
  },
  btn: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
    background: "#00AFA3",
    width: "100%",
    border: "2px solid #2DD5C4",
    borderRadius: 99,
    fontSize: 18,
    color: "white",
  },
}));

const AuthPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState<"login" | "register">("login");

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPass, setLoginPass] = useState<string>("");

  const [regEmail, setRegEmail] = useState<string>("");
  const [regPass, setRegPass] = useState<string>("");
  const [regConfPass, setRegConfPass] = useState<string>("");
  const [regName, setRegName] = useState<string>("");

  const { msgIsError, statusMsg } = useSelector(
    (state: RootState) => state.authSlice.meta
  );

  useEffect(() => {
    dispatch(setStatusMsg({ statusMsg: "", msgIsError: true }));
  }, [
    loginEmail,
    loginPass,
    regEmail,
    regPass,
    regConfPass,
    regName,
    dispatch,
  ]);

  const handleLogin = () => {
    if (!loginEmail || !loginEmail) {
      dispatch(
        setStatusMsg({ statusMsg: "Fill all the fields!", msgIsError: true })
      );
    } else {
      dispatch(login({ email: loginEmail, password: loginPass }));
    }
  };

  const handleRegister = () => {
    if (!regEmail || !regPass || !regConfPass || !regName) {
      dispatch(
        setStatusMsg({ statusMsg: "Fill all the fields!", msgIsError: true })
      );
    } else {
      dispatch(
        register({
          body: {
            name: regName,
            email: regEmail,
            password: regPass,
            passwordConfirm: regConfPass,
          },
          successCallback: () => {
            dispatch(
              setStatusMsg({
                statusMsg: "Your account has been created!",
                msgIsError: false,
              })
            );
            setState("login");
          },
        })
      );
    }
  };

  const getStatusMsg = () => {
    return (
      statusMsg && (
        <Grid
          item
          xs={12}
          style={{
            textAlign: "right",
            margin: 8,
            position: "absolute",
            bottom: -38,
            right: 0,
          }}
        >
          <Typography style={{ color: msgIsError ? "#EC5151" : "#63EC51" }}>
            {statusMsg}
          </Typography>
        </Grid>
      )
    );
  };

  const getLogin = () => {
    return (
      <Grid
        container
        item
        xs={12}
        style={{ maxWidth: 360, position: "relative" }}
      >
        <Grid item xs={12} container justify={"center"}>
          <Typography color={"primary"} style={{ fontSize: 24 }}>
            Welcome Dodger
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify={"center"}
          style={{ marginTop: 24 }}
        >
          <CustomTextfield
            label={"Email"}
            value={loginEmail}
            setValue={setLoginEmail}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify={"center"}
          style={{ marginTop: 16 }}
        >
          <CustomTextfield
            label={"Password"}
            type={"password"}
            value={loginPass}
            setValue={setLoginPass}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            color={"primary"}
            style={{
              fontSize: 12,
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: 8,
              marginTop: 4,
            }}
            onClick={() => setState("register")}
          >
            Create Account?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.btn} onClick={handleLogin}>
            Login
          </Button>
        </Grid>
        {getStatusMsg()}
      </Grid>
    );
  };

  const getRegister = () => {
    return (
      <Grid
        container
        item
        xs={12}
        style={{ maxWidth: 360, position: "relative" }}
      >
        <Grid item xs={12} container justify={"center"}>
          <CustomTextfield
            label={"Name"}
            value={regName}
            setValue={setRegName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify={"center"}
          style={{ marginTop: 16 }}
        >
          <CustomTextfield
            label={"Email"}
            value={regEmail}
            setValue={setRegEmail}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify={"center"}
          style={{ marginTop: 16 }}
        >
          <CustomTextfield
            label={"Password"}
            type={"password"}
            value={regPass}
            setValue={setRegPass}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify={"center"}
          style={{ marginTop: 16 }}
        >
          <CustomTextfield
            label={"Confirm Password"}
            type={"password"}
            value={regConfPass}
            setValue={setRegConfPass}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            color={"primary"}
            style={{
              fontSize: 12,
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: 8,
              marginTop: 4,
            }}
            onClick={() => setState("login")}
          >
            Login?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.btn} onClick={handleRegister}>
            Register
          </Button>
        </Grid>
        {getStatusMsg()}
      </Grid>
    );
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>DODGE</Box>
      <Grid
        container
        justify={"center"}
        alignItems={"center"}
        style={{ width: "100%", height: "100%" }}
      >
        {state === "login" ? getLogin() : getRegister()}
      </Grid>
    </Box>
  );
};

export default AuthPage;
