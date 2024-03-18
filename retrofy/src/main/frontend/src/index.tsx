import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import theme from "theme/theme"
import { CssBaseline } from "@mui/material"
import Login from "pages/login"
import GameList from "pages/game"
import Settings from "pages/settings"
import systemList from "statics/systemList"
import { CookiesProvider } from "react-cookie"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <CookiesProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                {systemList.systems.map((system) => {
                    return system.show ? <Route path={system.link} element={<GameList system={system.systemName} />} /> : ""
                })}
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </BrowserRouter>
        </CookiesProvider>
    </ThemeProvider>
)
