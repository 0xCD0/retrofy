import * as React from "react"
import { useEffect, useRef, useState } from "react"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Input,
    InputAdornment,
    Link,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import axios from "axios"
import AlertDialog from "components/AlertDialog/alertDialog"
import RetrofyDrawer from "components/RetrofyDrawer/retrofyDrawer"
import RetrofyAppBar from "components/RetrofyAppBar/retrofyAppBar"
import { AccountCircle, Key, Visibility, VisibilityOff } from "@mui/icons-material"

export default function Settings(props: any) {
    // Drawer
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const drawerWidth = 250

    const [tabVaule, setTabValue] = useState(0)
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    // Dialog
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [fetchItem, setFetchItem] = React.useState(false)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    useEffect(() => {}, [props.system, fetchItem])

    return (
        <Box sx={{ display: "flex" }}>
            <RetrofyAppBar isClosing={isClosing} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />

            <RetrofyDrawer drawerWidth={drawerWidth} setIsClosing={setIsClosing} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />

                <Paper elevation={1} sx={{ width: "100%", overflow: "hidden", borderRadius: 3 }}>
                    <Box
                        sx={{
                            padding: {
                                md: 4,
                                xs: 2,
                            },
                        }}
                    >
                        <Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                sx={{
                                    fontSize: {
                                        md: 35,
                                        xs: 20,
                                        left: 0,
                                    },
                                }}
                            >
                                Settings
                            </Typography>
                        </Box>

                        <Box mb={2}>
                            <Tabs value={tabVaule} onChange={handleTabChange}>
                                <Tab value={0} label="Game Database" />
                                <Tab value={1} label="Acccount" />
                            </Tabs>
                        </Box>

                        <Box>
                            {tabVaule === 0 && (
                                <>
                                    <Card variant="outlined">
                                        <Box p={2} mb={1}>
                                            <React.Fragment>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        Game database update
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        <br />
                                                        Updates the game database. Updates the thumbnails and information for each game.
                                                        <br />
                                                        Updated information will be updated based on this{" "}
                                                        <Link
                                                            href="https://docs.google.com/spreadsheets/d/1nR25dvRT_Yvf8pwR9lY2ds0w4iXxCJtT/edit?usp=sharing&ouid=115369061728830783232&rtpof=true&sd=true"
                                                            rel="noopener"
                                                            target="_blank"
                                                        >
                                                            [LINK]
                                                        </Link>
                                                        <br />
                                                        Anyone is welcome to comment with suggested changes to the Thumbnail link entry using Google
                                                        Sheets 😄
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button variant="contained">Update Game database</Button>
                                                </CardActions>
                                            </React.Fragment>
                                        </Box>
                                    </Card>
                                    <Box mt={2}>
                                        <Card variant="outlined">
                                            <Box p={2} mb={1}>
                                                <React.Fragment>
                                                    <CardContent>
                                                        <Typography variant="h5" component="div">
                                                            Update game list for All systems
                                                        </Typography>

                                                        <Typography variant="body2">
                                                            <br />
                                                            Updates the list of games on all currently supported game systems. Depending on the number
                                                            of games, this can take a long time.
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button variant="contained">Update game list for All systems</Button>
                                                    </CardActions>
                                                </React.Fragment>
                                            </Box>
                                        </Card>
                                    </Box>
                                </>
                            )}
                            {tabVaule === 1 && (
                                <>
                                        <Card variant="outlined">
                                        <Box p={2} mb={1}>
                                            <React.Fragment>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        Change user account name
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        <br />
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            label="Enter the user ID you want to replace"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <AccountCircle />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            variant="standard"
                                                            sx={{ width: 400 }}
                                                        />
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button variant="contained">Update username</Button>
                                                </CardActions>
                                            </React.Fragment>
                                            </Box>
                                        </Card>
                                    <Box mt={2}>
                                        <Card variant="outlined">
                                        <Box p={2} mb={1}>
                                            <React.Fragment>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        Change user password
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        <br />
                                                        <TextField
                                                            id="standard-adornment-password"
                                                            label="Enter the user ID you want to replace"
                                                            type={showPassword ? "text" : "password"}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Key />
                                                                    </InputAdornment>
                                                                ),

                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                        >
                                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            variant="standard"
                                                            sx={{ width: 400 }}
                                                        />
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button variant="contained">Update Password</Button>
                                                </CardActions>
                                            </React.Fragment>
                                            </Box>
                                        </Card>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>

            <AlertDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                fetchItem={fetchItem}
                setFetchItem={setFetchItem}
                system={props.system}
            />
        </Box>
    )
}
