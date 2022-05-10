import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import onLogout from "../../store/stores/user/login.store.on-logout";

export default function AccountMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickLogOut = () => {
    dispatch(onLogout());
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 40, height: 40, bgcolor: "#50a2fd" }}>
              <AccountCircleIcon
                sx={{ width: 40, height: 40, bgcolor: "#50a2fd" }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Avatar sx={{ width: 40, height: 40 }}>
            <AccountCircleIcon
              sx={{ width: 40, height: 40, color: "#50a2fd" }}
            />
          </Avatar>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            navigate("/bank-accounts");
          }}
        >
          <ListItemIcon>
            <EventNoteIcon sx={{ color: "#50a2fd" }} fontSize="medium" />
          </ListItemIcon>
          My Appointments
        </MenuItem>
        <MenuItem onClick={handleClickLogOut}>
          <ListItemIcon>
            <Logout sx={{ color: "#50a2fd" }} fontSize="medium" />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
