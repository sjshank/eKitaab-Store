import { styled, CardProps } from "@mui/material";
import Card from "@mui/material/Card";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

export const MetricIcons: any = Object.seal({
  "Books Listed": <LibraryBooksRoundedIcon fontSize="large" color="primary" />,
  "Authors Registered": (
    <SupervisedUserCircleRoundedIcon fontSize="large" color="primary" />
  ),
  "Genres Available": <CategoryRoundedIcon fontSize="large" color="primary" />,
  "Book Instances": <ContentCopyRoundedIcon fontSize="large" color="primary" />,
  "Copies Available": (
    <EventAvailableRoundedIcon fontSize="large" color="primary" />
  ),
});

const CustomizedCard = styled(Card)<CardProps>(({ theme }) => ({
  "&.MuiCard-root": {
    backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    transition: "transform 0.4s",
    "&:hover": {
      transform: "scale(1.1)",
      "& .metric-label": {
        color: `${theme.palette.primary.main}`,
      },
      "& .metric-count": {
        fontSize: "1.55rem",
      },
      "& .MuiSvgIcon-root": {
        transform: "rotate(180deg)",
      },
    },
  },
}));

export default CustomizedCard;
