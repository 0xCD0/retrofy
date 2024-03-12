import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GameList from "pages/game"
import { ThemeProvider } from "@emotion/react"
import theme from "theme/theme"
import { CssBaseline } from "@mui/material"
import Login from "pages/login"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/game/gb" element={<GameList system={"gb"} />} />
                <Route path="/game/gba" element={<GameList system={"gba"} />} />
                <Route path="/game/nes" element={<GameList system={"nes"} />} />
                <Route path="/game/snes" element={<GameList system={"snes"} />} />
                <Route path="/game/n64" element={<GameList system={"n64"} />} />
                <Route path="/game/psx" element={<GameList system={"psx"} />} />
                <Route path="/game/sega32x" element={<GameList system={"sega32x"} />} />
                <Route path="/game/segacd" element={<GameList system={"segaCD"} />} />
                <Route path="/game/segagg" element={<GameList system={"segaGG"} />} />
                <Route path="/game/segams" element={<GameList system={"segaMS"} />} />
                <Route path="/game/segamd" element={<GameList system={"segaMD"} />} />
                <Route path="/game/segasaturn" element={<GameList system={"segasaturn"} />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
)
