import * as React from "react"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { EmulatorJS, defaultPathToData } from "react-emulatorjs"

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function RetrofyGameScreen(props: any) {
    const handleClose = () => {
        props.setOpen(false)
    }

    return (
        <React.Fragment>
            <Dialog
                // fullScreen
                maxWidth="lg"
                open={props.open}
                onClose={(event, reason) => {
                    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
                        handleClose()
                    }
                }}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <Typography
                            sx={{
                                ml: {
                                    md: 1,
                                    sm: 1,
                                    xs: 0,
                                },
                                flex: 1,
                                fontSize: {
                                    md: 20,
                                    sm: 20,
                                    xs: 15,
                                },
                            }}
                            variant="h6"
                            component="div"
                        >
                            {props.romTitle}
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <EmulatorJS
                    EJS_core={props.system}
                    EJS_gameUrl={props.romPath}
                    EJS_startOnLoaded={true}
                    EJS_pathtodata={defaultPathToData}
                    width={props.width}
                    height={props.height}
                />
            </Dialog>
        </React.Fragment>
    )
}
