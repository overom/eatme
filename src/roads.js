import ContMain from "./components/ContMain";
import ContFavoris from "./components/ContFavoris";
import withUser from "./components/withUser";
import ContRating from "./components/ContRating";
import ContLogin from "./components/ContLogin";
import ContProfil from "./components/ContProfil";
import ContCreateAccount from "./components/ContCreateAccount";

export const mainRoad = () => [
  { path: "/", component: withUser(ContMain), exact: true },
  { path: "/favoris", component: withUser(ContFavoris) },
  { path: "/note", component: withUser(ContRating) },
  { path: "/profil", component: withUser(ContProfil), exact: true },
  { path: "/connexion", component: ContLogin, exact: true },
  { path: "/connexion/creation", component: ContCreateAccount, exact: true }
];
