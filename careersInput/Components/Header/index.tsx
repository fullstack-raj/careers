import * as React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import "./Header.scss";

export const Header: FC = () => {
  return (
    <>
      <div className="mainHeader">
        <div className="warpper">
          <div className="logo">
            <img src={logo} />{" "}
          </div>
          <div className="menu">
            <Link to="view">View Profiles</Link>
            <Link to="create">Add Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
};
