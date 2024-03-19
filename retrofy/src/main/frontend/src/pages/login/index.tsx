import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { MuiIcon } from "components/MuiIcon/muiIcon"
import { Alert, CircularProgress, IconButton } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"

export default function SignIn() {
    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault()
        var formData = new FormData(event.currentTarget)
        axios
            .post("/api/v1/auth/login", formData)
            .then((response) => {
                setCookie("userInfo", btoa(formData.get("id")!!.toString()))
                setIsLoading(false)
                navigator("/")
            })
            .catch((error) => {
                setIsError(true)
                setIsLoading(false)
                console.log("error :" + error)
            })
    }

    useEffect(() => {
        axios
            .get("/api/v1/auth/getLoginStatus")
            .then((response) => {
                var isLoggedin = response.data.data

                if (isLoggedin === true) {
                    navigator("/")
                }

                console.log(isLoggedin)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

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
                <Typography fontSize={20}>Self-Hosted Web-Based Emulator Frontend</Typography>
                {isError && (
                    <Box mt={2}>
                        <Alert severity="error">
                            Login failed! <br />
                            Please check your ID and Password and try again.
                        </Alert>
                    </Box>
                )}

                {isLoading && (
                    <Box mt={2}>
                        <CircularProgress size={"2rem"} color="inherit" />
                    </Box>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" fullWidth id="id" label="ID" name="id" autoFocus />
                    <TextField margin="normal" fullWidth name="password" label="PASSWORD" type="password" id="password" />
                    <Button color="inherit" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 5, mb: 4 }} textAlign={"center"}>
                <IconButton onClick={() => window.open("https://github.com/0xCD0/retrofy", "_blank")}>
                    <MuiIcon icon="GitHub" />
                </IconButton>
            </Box>
        </Container>
    )
}
