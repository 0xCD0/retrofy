import React, { useEffect } from "react"
import { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import axios from "axios"
import { Alert, LinearProgress, Snackbar, Typography } from "@mui/material"
import systemList from "statics/systemList"

export default function UpdateAllGameListDialog(props: any) {
    const [progress, setProgess] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [isError, setIsError] = useState(false)
    const [nowSystem, setNowSystem] = useState("")

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

    const updateGameLists = async () => {
        try {
            await Promise.all(
                systemList.systems.map(async (system) => {
                    if (system.show) {
                        const formData = new FormData()
                        formData.append("system", system.systemName!!)

                        await axios
                            .post("/api/v1/romList/update", formData)
                            .then(function (response) {
                                setNowSystem(system.fullSystemName!!)
                                setIsError(false)
                                console.log(`Refresh complete : ${system.systemName}`)
                            })
                            .catch((error) => {
                                throw error
                            })
                    }
                })
            )
        } catch (e) {
            setIsError(true)
        } finally {
            setSnackbarOpen(true)
            props.setDialogOpen(false)
            setProgess(false)
            setNowSystem("")
        }
    }

    useEffect(() => {}, [nowSystem])

    return (
        <React.Fragment>
            {!progress ? (
                <Dialog
                    open={props.dialogOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Update game list for All systems</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`This action updates the list of all games in the All Games directory. Games on all systems that were previously listed are initialized. Depending on your server specifications and the number of games, this can take a long time. Are you sure you want to proceed?`}
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

                            <Typography mb={3}>Completed scan : {nowSystem}</Typography>
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
                    {isError ? "Update failed : An error occurred while updating game lists" : "Successfully updated the all systems game list !"}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
