import React, { useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { SIDEBAR_NAVIGATIONS } from "@/utils/constants";
import ListItemIcon from "@mui/material/ListItemIcon";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { TChildrenNav, TNavigation } from "@/types/common-type";

const SideBar: React.FunctionComponent<{}> = (): React.JSX.Element => {
  const router = useRouter();

  const NavButton = (nav: TChildrenNav) => {
    const selected = useMemo(() => router.pathname === nav.path, [nav.path]);
    return (
      <ListItemButton
        onClick={() => router.push(nav.path)}
        disableRipple
        disableTouchRipple
        sx={{ mb: 1, padding: 0.5, maxWidth: "80%" }}
        selected={selected}>
        {selected && RoundIconComponent}
        <ListItemText
          primary={nav.label}
          primaryTypographyProps={{
            fontSize: 14,
          }}
        />
      </ListItemButton>
    );
  };

  const MemoizedNavButton = React.memo(NavButton);

  const RoundIconComponent = useMemo(
    () => (
      <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
        <VerifiedRoundedIcon color="primary" fontSize="small" />
      </ListItemIcon>
    ),
    []
  );

  const NavContent = (nav: TChildrenNav) => {
    return (
      <ListItem disablePadding sx={{ pl: 1 }}>
        <MemoizedNavButton {...nav} />
      </ListItem>
    );
  };

  return (
    <nav>
      <List sx={{ width: "100%" }}>
        {SIDEBAR_NAVIGATIONS &&
          SIDEBAR_NAVIGATIONS.map((nav: TNavigation<string, TChildrenNav>) => {
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

const MemoizedSidebar = React.memo(SideBar);

export default MemoizedSidebar;
