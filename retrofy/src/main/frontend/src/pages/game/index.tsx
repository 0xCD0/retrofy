import * as React from "react"
import { useEffect, useRef, useState } from "react"
import {
    Avatar,
    Button,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    TextFieldProps,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import axios from "axios"
import { MuiIcon } from "components/MuiIcon/muiIcon"
import { romInfo } from "interfaces/romInfo"
import { ReactComponent as NoRom } from "svg/norom.svg"
import NoImage from "svg/noimage.svg"
import RetrofyGameScreen from "components/RetrofyGameScreen/retrofyGameScreen"
import GameListDialog from "components/gameListDialog/gameListDialog"
import RetrofyDrawer from "components/RetrofyDrawer/retrofyDrawer"
import RetrofyAppBar from "components/RetrofyAppBar/retrofyAppBar"

export default function GameList(props: any) {
    // Drawer
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const drawerWidth = 250;

    // Game screen
    const [gameScreenWidth, setGameScreenWidth] = useState(640);
    const [gameScreenHeight, setGameScreenHeight] = useState(480);
    const [openGameScreen, setOpenGameScreen] = useState(false);
    const [romPath, setRomPath] = useState("");
    const [romTitle, setRomTitle] = useState("");

    // Screen size
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
    const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

    // Dialog
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [fetchItem, setFetchItem] = React.useState(false);

    // Table
    const textRef = useRef<TextFieldProps>();
    const [romList, setRomList] = useState<romInfo[]>([]);
    const [searchedRomList, setSearchedRomList] = useState<romInfo[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageViewString, setPageViewString] = useState("Page View");

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleSearchBarChange = (keyword: React.ChangeEvent<any>) => {
        setPage(0);
        const filteredRows = romList.filter((row) => {
            return row.title?.toLowerCase().includes(keyword.target.value.toLowerCase());
        })
        setSearchedRomList(filteredRows);
    }

    useEffect(() => {
        if (greaterThanMid) {
            setGameScreenWidth(800);
            setGameScreenHeight(600);
            setPageViewString("Page View");
        } else if (smallToMid) {
            setPageViewString("Page View");
        } else if (lessThanSmall) {
            setGameScreenWidth(320);
            setGameScreenHeight(240);
            setPageViewString("");
        }
    }, [greaterThanMid, smallToMid, setGameScreenWidth, window.innerHeight]);

    const fetchGameList = () => {
        const formData = new FormData();
        formData.append("system", props.system);
        setPage(0);

        try {
            textRef.current!!.value = "";
        } catch (e) {}

        axios
            .post("/api/v1/romList/getRomList", formData)
            .then(function (response) {
                setRomList(response.data.data);
                setSearchedRomList(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchGameList();
    }, [props.system, fetchItem]);

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
                                {props.fullSystemName}
                            </Typography>

                            <Button
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setDialogOpen(true);
                                }}
                                startIcon={<MuiIcon icon="Refresh" />}
                                variant="contained"
                                sx={{ right: 0 }}
                            >
                                <Typography display={{ xs: "none", md: "block" }}>Refresh game list</Typography>
                                <Typography display={{ xs: "block", md: "none" }}>Refresh</Typography>
                            </Button>
                        </Box>

                        {romList.length > 0 ? (
                            <Box>
                                <TextField
                                    inputRef={textRef}
                                    size="medium"
                                    id="text_searchbar"
                                    variant="outlined"
                                    placeholder="Search for games here"
                                    onChange={(keyword) => {
                                        handleSearchBarChange(keyword);
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MuiIcon icon="Search" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ width: "100%", borderRadius: 3 }}
                                />

                                <Box border={1} borderColor={"#616161"} p={1} mt={1} borderRadius={3}>
                                    <TableContainer
                                        sx={
                                            {
                                                // maxHeight: {
                                                //   md: tableHeight - 370,
                                                //   sm: tableHeight - 310,
                                                //   xs: tableHeight - 300,
                                                //   left: 0,
                                                // },
                                            }
                                        }
                                    >
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Image</TableCell>
                                                    <TableCell>Title</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {searchedRomList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={row.id}
                                                            onClick={() => {
                                                                setRomPath(row.filePath!!);
                                                                setRomTitle(row.title!!);
                                                                setOpenGameScreen(true);
                                                            }}
                                                        >
                                                            <TableCell
                                                                sx={{
                                                                    width: {
                                                                        md: 100,
                                                                        sm: 50,
                                                                        xs: 20,
                                                                    },
                                                                }}
                                                            >
                                                                {row.thumbnailBase64 !== "" ? (
                                                                    <Avatar
                                                                        src={`data:image/png; base64, ${row.thumbnailBase64}`}
                                                                        variant="rounded"
                                                                        sx={{
                                                                            width: {
                                                                                md: 100,
                                                                                sm: 50,
                                                                                xs: 30,
                                                                            },
                                                                            height: {
                                                                                md: 100,
                                                                                sm: 50,
                                                                                xs: 30,
                                                                            },
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Avatar
                                                                        src={NoImage}
                                                                        variant="square"
                                                                        sx={{
                                                                            width: {
                                                                                md: 100,
                                                                                sm: 50,
                                                                                xs: 30,
                                                                            },
                                                                            height: {
                                                                                md: 100,
                                                                                sm: 50,
                                                                                xs: 30,
                                                                            },
                                                                        }}
                                                                    />
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    fontSize={{
                                                                        md: 20,
                                                                        sm: 15,
                                                                        xs: 15,
                                                                    }}
                                                                >
                                                                    {row.title}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={searchedRomList.length}
                                        rowsPerPage={rowsPerPage}
                                        labelRowsPerPage={pageViewString}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Box>
                            </Box>
                        ) : (
                            <Box textAlign={"center"} pt={20} pb={20}>
                                <NoRom width={100} height={100} />
                                <Typography color={"#878787"}>Games not found. Please scan game lists.</Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>
            <RetrofyGameScreen
                system={props.system}
                open={openGameScreen}
                setOpen={setOpenGameScreen}
                romPath={romPath}
                romTitle={romTitle}
                width={gameScreenWidth}
                height={gameScreenHeight}
            />
            <GameListDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                fetchItem={fetchItem}
                setFetchItem={setFetchItem}
                system={props.system}
            />
        </Box>
    )
}
