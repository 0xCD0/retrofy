import React from "react"
import { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import axios from "axios"
import { Alert, LinearProgress, Snackbar, Typography } from "@mui/material"

export default function GameDatabaseDialog(props: any) {
    const [progress, setProgess] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleDialogResult = (result: Boolean) => {
        if (result) {
            setProgess(true)
            updateGameLists()
        } else {
            handleClose()
        }
    }

    const handleClose = () => {
        props.setDialogOpen(false)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const updateGameLists = () => {
        axios
            .get("/api/v1/gameDatabase/updateDatabase")
            .then(function (response) {
                setSnackbarOpen(true)
                props.setDialogOpen(false)
                setProgess(false)
            })
            .catch((error) => {
                console.log(error)
                setIsError(true)
                setProgess(false)
            })
    }

    return (
        <React.Fragment>
            {!progress ? (
                <Dialog
                    open={props.dialogOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Update Game Database</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`This task fetches information from Game Database spreadsheet to obtain information about each game and its thumbnail. Depending on the server's specifications, this task may take a long time. Do you want to continue?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleDialogResult(false)
                            }}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                handleDialogResult(true)
                            }}
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            ) : (
                <Dialog open={props.dialogOpen}>
                    <DialogTitle id="alert-dialog-title">Refreshing game lists...</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Typography mb={3}>We're currently updating Game Databases. This may take a long time..</Typography>
                            <LinearProgress />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            )}

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
                    {isError ? "Game Database update failed" : "Successfully updated the game databases"}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
