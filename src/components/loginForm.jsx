import React, { Component } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import Joi from "joi";

import Copyright from "./common/copyright";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .label("Email"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .label("Password"),
  });

  theme = createTheme();

  validate = () => {
    const { account } = this.state;

    const options = { abortEarly: false };
    const { error } = this.schema.validate(account, options);
    if (!error) return null;

    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema.extract(name) });
    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const data = new FormData(event.currentTarget);
    // Call the server ...
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    errorMessage
      ? (errors[input.name] = errorMessage)
      : delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

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
              Sign in
            </Typography>

            <Box
              component="form"
              onSubmit={this.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Input
                name={"email"}
                label={"Email Address"}
                value={account.email}
                onChange={this.handleChange}
                autoComplete={"email"}
                error={errors.email}
                type="email"
                autoFocus
              />

              <Input
                name={"password"}
                label={"Password"}
                value={account.password}
                onChange={this.handleChange}
                error={errors.password}
                autoComplete={"current-password"}
                type="password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                disabled={this.validate() !== null}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs textAlign={"initial"}>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>

                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default LoginForm;
