import * as React from "react"
import { useEffect, useRef, useState } from "react"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
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
import GameDatabaseDialog from "components/gameDatabaseDialog/gameDatabaseDialog"
import RetrofyDrawer from "components/RetrofyDrawer/retrofyDrawer"
import RetrofyAppBar from "components/RetrofyAppBar/retrofyAppBar"
import { AccountCircle, Key, Visibility, VisibilityOff } from "@mui/icons-material"
import { useCookies } from "react-cookie"
import UpdateAllGameListDialog from "components/updateAllGameListDialog/updateAllGameListDialog"
import UserInfoDialog from "components/userInfoDialog/userInfoDialog"

export default function Settings(props: any) {
    const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
    
    // Drawer
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const drawerWidth = 250

    const [tabVaule, setTabValue] = useState(0)
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    // GameDatabaseDialog
    const [gameDatabaseDialogOpen, setGameDatabaseDialogOpen] = React.useState(false)
    const [updateAllGameListDialogOpen, setUpdateAllGameListDialogOpen] = React.useState(false)
    const [userInfoDialogOpen, setUserInfoDialogOpen] = React.useState(false)


    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const updateGameDatabase = () => {
        setGameDatabaseDialogOpen(true);
    }

    const updateAllGameLists = () => {
        setUpdateAllGameListDialogOpen(true);
    }

    const updateUserId = () => {
        console.log(cookies.userInfo);
    }

    const updateUserPassword = () => {
        console.log("test");
    }
    

    useEffect(() => {}, [props.system])

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
                                                        Anyone is welcome to comment with suggested changes to the thumbnail link entry using Google spread sheets 😄
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button variant="contained" onClick={updateGameDatabase}>Update Game database</Button>
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
                                                        <Button variant="contained" onClick={updateAllGameLists}>Update game list for All systems</Button>
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
                                                            id="text_userId"
                                                            label="Enter the user ID you want to replace"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <AccountCircle />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            variant="standard"
                                                            sx={{
                                                                width: {
                                                                    xs: 280,
                                                                    md: 400,
                                                                },
                                                            }}
                                                        />
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button variant="contained" onClick={updateUserId}>Update username</Button>
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
                                                                id="text_userPw"
                                                                label="Enter the user ID you want to replace"
                                                                type={showPassword ? "text" : "password"}
                                                                onClick={updateUserPassword}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <Key />
                                                                        </InputAdornment>
                                                                    ),

                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                onClick={handleClickShowPassword}
                                                                            >
                                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                variant="standard"
                                                                sx={{
                                                                    width: {
                                                                        xs: 280,
                                                                        md: 400,
                                                                    },
                                                                }}
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

            <GameDatabaseDialog
                dialogOpen={gameDatabaseDialogOpen}
                setDialogOpen={setGameDatabaseDialogOpen}
            />
            <UpdateAllGameListDialog
                dialogOpen={updateAllGameListDialogOpen}
                setDialogOpen={setUpdateAllGameListDialogOpen}
            />
            {/* <UserInfoDialog
                dialogOpen={UserInfoDialog}
                setDialogOpen={userInfoDialogOpen}
            /> */}
        </Box>
    )
}
