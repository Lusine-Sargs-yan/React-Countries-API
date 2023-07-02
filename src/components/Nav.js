import { Link } from "react-router-dom";
import { Routes } from "../helper/routes";
import "./Nav.css";

export default function Nav() {

  return (
    <div>
      <nav className="main-navbar">
        {Routes.map(({route, title}) => <Link className="link" key={title} to={route}>{title} </Link>)}
      </nav>
    </div>
  )
}