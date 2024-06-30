import {
  Home as HomeIcon,
  LibraryBooks as InfoIcon,
  Mail as MailIcon,
  AccountCircleRounded as AccountIcon,
  TravelExplore as ExploreIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

export const VERTICAL_MENU_ITEMS = [
  { text: "Home", icon: <HomeIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Watch List", icon: <InfoIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Explore", icon: <ExploreIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Search", icon: <SearchIcon sx={{ fontSize: "2.5rem" }} /> },
];

export const BOTTOM_MENU_ITEMS = [
  { text: "Contact", icon: <MailIcon sx={{ fontSize: "2.5rem" }} /> },
  { text: "Sign-In", icon: <AccountIcon sx={{ fontSize: "2.5rem" }} /> },
];

export const HORIZONTAL_NAVBAR_TITLES = [
  { name: "Home" },
  { name: "Watch List" },
  { name: "Explore" },
  { name: "Contact" },
];