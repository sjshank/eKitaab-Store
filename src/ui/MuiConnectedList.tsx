import React, { useMemo } from "react";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";

type TConnectedListProps = {
  list: any[];
  href: string;
  titleIdentifierKey: string;
};

const MuiConnectedList: React.FunctionComponent<TConnectedListProps> = ({
  list,
  href,
  titleIdentifierKey,
}) => {
  const OpenIconComponent = useMemo(
    () => (
      <OpenInNewIcon
        fontSize="small"
        color="primary"
        sx={{
          verticalAlign: "top",
          marginLeft: 1,
        }}
      />
    ),
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <List sx={{ listStyle: "decimal", ml: "2rem" }}>
        {list.map((lData: any) => {
          const title = lData[titleIdentifierKey];
          return (
            <ListItem
              key={lData._id}
              sx={{ display: "list-item", paddingLeft: 0, paddingRight: 0 }}>
              <Link
                href={`${href}${lData._id}`}
                component={NextLink}
                role="link"
                color="text.primary"
                tabIndex={0}
                sx={{
                  ":hover": {
                    "& .MuiSvgIcon-root": {
                      transform: "scale(1.3)",
                    },
                  },
                }}>
                {title}
                {OpenIconComponent}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default MuiConnectedList;
