import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Divider, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { IconNames, MuiIcon } from "../MuiIcon/muiIcon"
import { systemListItems } from "interfaces/systemListItems"
import systemLists from "statics/systemList"

export default function DrawerListItems(props: any) {
    const navigate = useNavigate()
    const topItems: systemListItems[] = [
        {
            title: "Favorite",
            link: "/",
            icon: "Star",
            show: false,
        },
    ]

    const otherListItems: systemListItems[] = [
        {
            title: "Settings",
            link: "/settings",
            icon: "Settings",
            show: true,
        },
    ]

    return (
        <React.Fragment>
            {topItems.map((list, idx) => {
                return (
                    <>
                        {list.show && (
                            <ListItemButton
                                key={idx}
                                onClick={() => {
                                    navigate(list.link!!)
                                    props.setMobileOpen(false)
                                }}
                            >
                                <ListItemIcon>
                                    <MuiIcon icon={list.icon as IconNames} />
                                </ListItemIcon>
                                <ListItemText primary={list.title} />
                            </ListItemButton>
                        )}
                    </>
                )
            })}

            {systemLists.systems.map((list, idx) => {
                return (
                    <>
                        {list.show && (
                            <ListItemButton
                                key={idx}
                                onClick={() => {
                                    navigate(list.link!!)
                                    props.setMobileOpen(false)
                                }}
                            >
                                <ListItemIcon>
                                    <MuiIcon icon={list.icon as IconNames} />
                                </ListItemIcon>
                                <ListItemText primary={list.title} />
                            </ListItemButton>
                        )}
                    </>
                )
            })}

            <Divider sx={{ my: 1 }} />
            {otherListItems.map((list, idx) => {
                return (
                    <>
                        {list.show && (
                            <ListItemButton
                                key={idx}
                                onClick={() => {
                                    navigate(list.link!!)
                                }}
                            >
                                <ListItemIcon>
                                    <MuiIcon icon={list.icon as IconNames} />
                                </ListItemIcon>
                                <ListItemText primary={list.title} />
                            </ListItemButton>
                        )}
                    </>
                )
            })}
        </React.Fragment>
    )
}
