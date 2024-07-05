import {
  Home as HomeIcon,
  LibraryBooks as InfoIcon,
  // Mail as MailIcon,
  // TravelExplore as ExploreIcon,
  // Search as SearchIcon,
} from "@mui/icons-material";

export const VERTICAL_MENU_ITEMS = [
  { text: "Home", icon: <HomeIcon sx={{ fontSize: "2.5rem" }} />, path: "/" },
  {
    text: "Watch List",
    icon: <InfoIcon sx={{ fontSize: "2.5rem" }} />,
    path: "/watchlist",
  },
  // {
  //   text: "Explore",
  //   icon: <ExploreIcon sx={{ fontSize: "2.5rem" }} />,
  //   path: "/explore",
  // },
  // {
  //   text: "Search",
  //   icon: <SearchIcon sx={{ fontSize: "2.5rem" }} />,
  // },
  // {
  //   text: "Contact",
  //   icon: <MailIcon sx={{ fontSize: "2.5rem" }} />,
  //   path: "/contact",
  // },
];

export const HORIZONTAL_NAVBAR_TITLES = [
  { name: "Home", path: "/" },
  { name: "Watch List", path: "/watchlist" },
  // { name: "Explore", path: "/explore" },
  // { name: "Contact", path: "/contact" },
];
