import React from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LockOutlined } from "@mui/icons-material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import Joi from "joi";

import auth from "../services/authService";
import Copyright from "./common/copyright";
import Form from "./common/form";
import withRouter from "../utils/withRouter";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  theme = createTheme();

  schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .label("Email")
      .required(),

    password: Joi.string()
      .label("Password")
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .message("“Password” length must be between 3 and 30 characters long")
      .required(),
  });

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const { state } = this.props.router.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to={"/"} />;

    return (
      <ThemeProvider theme={this.theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>

            <Typography component="h1" variant="h5">
              Login
            </Typography>

            <Box
              component="form"
              onSubmit={this.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {this.renderInput("email", "Email Address", "email", {
                autoComplete: "email",
                autoFocus: true,
              })}

              {this.renderInput("password", "Password", "password", {
                autoComplete: "current-password",
              })}

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              {this.renderButton("Login")}

              <Grid container>
                <Grid item xs textAlign={"initial"}>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>

                <Grid item color={"primary"}>
                  <Link variant="body2" component={RouterLink} to={"/register"}>
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default withRouter(LoginForm);
