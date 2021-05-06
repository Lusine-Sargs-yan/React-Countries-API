import Countries from "../pages/Countries";
import CountryPage from "../pages/CountryPage";
import Home from "../pages/Home";

export const Routes = [
  {
    route: "/",
    component: Home,
    title: 'Home'
  },
  {
    route: "/countries",
    component: Countries,
    title: 'All Countries'
  },
  {
    route: "/countries/:countryId",
    component: CountryPage,
    title: 'Favorite Country'
  }
];