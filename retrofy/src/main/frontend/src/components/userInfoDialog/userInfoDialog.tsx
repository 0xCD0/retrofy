import React from "react"
import { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import axios from "axios"
import { useCookies } from "react-cookie"
import { Alert, Snackbar } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function UserInfoDialog(props: any) {
    const navigator = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
    const [isError, setIsError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleDialogResult = (result: Boolean) => {
        if (result) {
            if (props.isUpdateUserId) {
                updateUserId();
            } else {
                updateUserPw();
            }
        } else {
            handleClose();
        }
    }

    const handleClose = () => {
        props.setDialogOpen(false);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    const updateUserId = () => {
        const formData = new FormData();
        formData.append("userId", atob(cookies.userInfo));
        formData.append("newUserId", props.idRef.current.value);

        axios
            .post("/api/v1/auth/updateUserId", formData)
            .then(function (response) {
                setIsError(false);
                setSnackbarOpen(true);

                axios.get("/api/v1/auth/logout").then((response) => {
                    navigator("/login")
                });
            })
            .catch((error) => {
                setIsError(true);
                setSnackbarOpen(true);
                props.setDialogOpen(false);
                console.log(error);
            })
    }

    const updateUserPw = () => {
        const formData = new FormData();
        formData.append("userId", atob(cookies.userInfo));
        formData.append("pw", props.pwRef.current.value);
        axios
            .post("/api/v1/auth/updateUserPw", formData)
            .then(function (response) {
                setIsError(false);
                setSnackbarOpen(true);

                axios.get("/api/v1/auth/logout").then((response) => {
                    navigator("/login");
                })
            })
            .catch((error) => {
                setIsError(true);
                setSnackbarOpen(true);
                props.setDialogOpen(false);
                console.log(error);
            })
    }

    return (
        <React.Fragment>
            <Dialog open={props.dialogOpen} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{props.isUpdateUserId ? "Change user ID" : "Change user Password"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Re-login is required after changing ID or Password. Do you want to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleDialogResult(false);
                        }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            handleDialogResult(true);
                        }}
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={isError ? "error" : "success"}
                    variant="filled"
                    sx={{ width: "100%", color: "#FFFFFF" }}
                >
                    {isError
                        ? props.isUpdateUserId
                            ? "ID change was successful."
                            : "Password change was successful."
                        : props.isUpdateUserId
                        ? "ID change was failed."
                        : "Password change was failed."}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
