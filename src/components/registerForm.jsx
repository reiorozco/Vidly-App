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
import { Link as RouterLink } from "react-router-dom";
import Joi from "joi";

import Copyright from "./common/copyright";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  theme = createTheme();

  schema = Joi.object({
    name: Joi.string().min(3).max(30).label("Name").required(),

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
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
              Register
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={this.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid item xs={12}>
                {this.renderInput("name", "Name", "text", {
                  id: "firstName",
                  autoComplete: "given-name",
                  autoFocus: true,
                })}
              </Grid>

              <Grid item xs={12}>
                {this.renderInput("email", "Email Address", "email", {
                  id: "email",
                  autoComplete: "email",
                })}
              </Grid>

              <Grid item xs={12}>
                {this.renderInput("password", "Password", "password", {
                  id: "password",
                  autoComplete: "new-password",
                })}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive promotions and updates via email."
                />
              </Grid>

              {this.renderButton("Register")}

              <Grid container justifyContent="flex-end">
                <Grid item color={"primary"}>
                  <Link variant="body2" component={RouterLink} to={"/login"}>
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default RegisterForm;
