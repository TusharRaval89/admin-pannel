import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Category,
  ControlPointDuplicate,
  HelpOutline,
  MeetingRoom,
  SpaceDashboard,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect } from "react";



const drawerWidth = 240;

let pages = [
  {
    name: "Dashboard",
    path: "/admin/",
    icon: <SpaceDashboard />,
  },
  {
    name: "Category",
    path: "/admin/category",
    icon: <Category />,
  },
  {
    name: " Sub Category",
    path: "/admin/subcategory",
    icon: <ControlPointDuplicate />,
  },
  {
    name: "Q & A",
    path: "/admin/qa",
    icon: <HelpOutline />,
  },
];

function DemoDrawer(props) {
  let navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    // console.log("location :- ", location.pathname);
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  let token = localStorage.getItem("login_token");

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    navigate("/admin/login");
    // console.log("Token after removal:", localStorage.getItem("login_token")); 
  };

  useEffect(() => {
    if(!token){
        navigate('/admin/login')
    }
  }, [token]);

  const drawer = (
    <div>
      <Toolbar sx={{  backgroundColor:"#765827"  }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ textDecoration: "none", color: "#fff"}}
        >
          Interview Portal
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {pages.map((text, index) => (
          <Link key={index} to={text.path}>
            <ListItem disablePadding>
              <ListItemButton className="icon-btn">
                <ListItemIcon sx={{color:'#765827'}}>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} sx={{color:'#765827'}}/>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // let logoutPanel = () => {
  //   localStorage.removeItem("Token");
  //   navigate("/login");
  // };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline  />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar  sx={{backgroundColor:"#765827"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box >
              <Typography variant="h6" noWrap component="div">
                Dashboard
                {location.pathname == "/admin/category"
                  ? " / Category"
                  : location.pathname == "/admin/subcategory"
                  ? " / Sub Category"
                  : location.pathname == "/admin/qa"
                  ? " / Question Answer"
                  : ""}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" noWrap component="div">
                <IconButton onClick={handleLogout}>
                  <MeetingRoom sx={{ color: "#fff" }} />
                </IconButton>
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
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
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

DemoDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DemoDrawer;
