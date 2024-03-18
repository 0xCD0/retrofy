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

export default function gameListDialog(props: any) {
    const [progress, setProgess] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleDialogResult = (result: Boolean) => {
        console.log(result)
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
        const formData = new FormData()
        formData.append("system", props.system)

        axios
            .post("/api/v1/romList/update", formData)
            .then(function (response) {
                setSnackbarOpen(true)
                props.setDialogOpen(false)
                setProgess(false)
                props.setFetchItem(!props.fetchItem)
            })
            .catch((error) => {
                console.log(error)
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
                    <DialogTitle id="alert-dialog-title">Refresh Game list</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`This action updates the list of games currently in the game directory. Any games on the ${props.system} system that were previously listed will be reset. Depending on your server's specifications and the number of games, this may take a long time. Are you sure you want to continue?`}
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
                            <Typography mb={3}>
                                We're currently updating the list of games. This may take a long time depending on how many games are preserved.
                            </Typography>
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
                <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: "100%", color: "#FFFFFF" }}>
                    Successfully updated the game list !
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
