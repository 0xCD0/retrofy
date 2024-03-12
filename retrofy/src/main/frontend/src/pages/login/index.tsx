import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MuiIcon } from "components/MuiIcon/muiIcon";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigator = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var formData = new FormData(event.currentTarget);
    axios
      .post("/api/v1/auth/login", formData)
      .then((response) => {
        console.log(response);
        navigator("/");
      })
      .catch((error) => {
        console.log("error :" + error);
      })
      .then(() => {});
  };

  React.useEffect(() => {
    axios
      .get("/api/v1/auth/getLoginStatus")
      .then((response) => {
        var isLoggedin = response.data.data;

        if (isLoggedin === true) {
          navigator("/");
        }

        console.log(isLoggedin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize={55}>Retrofy</Typography>

        <Typography fontSize={20}>Self-Hosted Web Emulator Frontend</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="id"
            label="Id"
            name="id"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            color="inherit"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 5, mb: 4 }} textAlign={"center"}>
        <IconButton>
          <MuiIcon icon="GitHub" />
        </IconButton>
      </Box>
    </Container>
  );
}
