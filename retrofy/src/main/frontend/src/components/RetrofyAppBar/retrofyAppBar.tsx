import { useNavigate } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import MenuIcon from "@mui/icons-material/Menu"
import axios from "axios"
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { MuiIcon } from "components/MuiIcon/muiIcon"

export default function TitleBar(props: any) {
    const navigator = useNavigate();

    const handleDrawerToggle = () => {
        if (!props.isClosing) {
            props.setMobileOpen(!props.mobileOpen);
        }
    }

    const handleLogout = () => {
        axios.get("/api/v1/auth/logout").then((response) => {
            navigator("/login");
        })
    }

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div">
                    Retrofy
                </Typography>

                <Box mr={2} sx={{ position: "absolute", right: 0 }}>
                    <Button color="inherit" onClick={handleLogout} aria-label="close" variant="outlined">
                        <MuiIcon icon="Logout" />
                        <Box mr={1} />
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
