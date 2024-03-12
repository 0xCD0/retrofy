import { Box, Divider, Drawer, List, Toolbar } from "@mui/material";
import DrawerListItems from "./menuItems";

export default function RetrofyDrawer(props: any) {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List component="nav">
        <DrawerListItems setMobileOpen={props.setMobileOpen}/>
      </List>
    </div>
  );

  const handleDrawerClose = () => {
    props.setIsClosing(true);
    props.setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    props.setIsClosing(false);
  };

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={props.mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: props.drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: props.drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
