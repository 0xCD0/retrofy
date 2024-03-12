import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IconNames, MuiIcon } from "../MuiIcon/muiIcon";

interface DrawerListItems {
  name?: string;
  link?: string;
  icon?: string;
  show: boolean;
}

export default function DrawerListItems(props: any) {
  const navigate = useNavigate();
  const emulListItems: DrawerListItems[] = [
    {
      name: "Favorite",
      link: "/",
      icon: "Star",
      show: false,
    },
    {
      name: "GB / GBC",
      link: "/game/gb",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "GBA",
      link: "/game/gba",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "NES",
      link: "/game/nes",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "SNES",
      link: "/game/snes",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "N64",
      link: "/game/n64",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "PSX",
      link: "/game/psx",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "Sega32X",
      link: "/game/sega32x",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "SegaCD",
      link: "/game/segacd",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "SegaGG",
      link: "/game/segagg",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "SegaMS",
      link: "/game/segams",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "SegaMD",
      link: "/game/segamd",
      icon: "SportsEsports",
      show: true,
    },
    {
      name: "SegaSaturn",
      link: "/game/segasaturn",
      icon: "SportsEsports",
      show: true,
    },
  ];

  const otherListItems: DrawerListItems[] = [
    {
      name: "Settings",
      link: "/",
      icon: "Settings",
      show: true,
    },
  ];

  return (
    <React.Fragment>
      {emulListItems.map((list, idx) => {
        return (
          <>
            {list.show && (
              <ListItemButton
                key={idx}
                onClick={() => {
                  navigate(list.link!!);
                  props.setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <MuiIcon icon={list.icon as IconNames} />
                </ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItemButton>
            )}
          </>
        );
      })}
      <Divider sx={{ my: 1 }} />
      {otherListItems.map((list, idx) => {
        return (
          <>
            {list.show && (
              <ListItemButton
                key={idx}
                onClick={() => {
                  navigate(list.link!!);
                }}
              >
                <ListItemIcon>
                  <MuiIcon icon={list.icon as IconNames} />
                </ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItemButton>
            )}
          </>
        );
      })}
    </React.Fragment>
  );
}
