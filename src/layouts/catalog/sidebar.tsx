import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { SIDEBAR_NAVIGATIONS } from "@/utils/constants";
import ListItemIcon from "@mui/material/ListItemIcon";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

const SideBar = () => {
  const router = useRouter();

  const NavContent = (nav: any) => {
    const selected = router.pathname === nav.path;
    return (
      <ListItem disablePadding sx={{ pl: 1 }}>
        <ListItemButton
          onClick={() => router.push(nav.path)}
          disableRipple
          disableTouchRipple
          sx={{ mb: 1, padding: 0.5, maxWidth: "80%" }}
          selected={selected}>
          {selected && (
            <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
              <VerifiedRoundedIcon color="primary" fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText
            primary={nav.label}
            primaryTypographyProps={{
              fontSize: 14,
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <nav>
      <List sx={{ width: "100%" }}>
        {SIDEBAR_NAVIGATIONS.map((nav) => {
          return (
            <ListItem
              key={nav.label}
              disablePadding
              disableGutters
              sx={{ display: "list-item" }}>
              <ListItemText secondary={nav.label} />
              {nav.children.length > 0 && (
                <List>
                  {nav.children.map((childNav) => (
                    <NavContent key={childNav.label} {...childNav} />
                  ))}
                </List>
              )}
            </ListItem>
          );
        })}
      </List>
    </nav>
  );
};

export default SideBar;
