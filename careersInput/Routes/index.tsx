import * as React from "react";
import { FC, ComponentState, ReactElement } from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Components/Header";
import { CreateProfile } from "../Views/CreateProfile";
import { IInputs } from "./../generated/ManifestTypes.d";
import { ViewProfiles } from "./../Views/ViewProfiles/index";
import "../assets/css/style.scss";

export interface ImainRouter {
  context: ComponentFramework.Context<IInputs>;
}
export interface IReactComponentState extends ComponentState, ImainRouter {}

export const MainRoute: FC<IReactComponentState> = (): ReactElement => {
  return (
    <>
    <MemoryRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ViewProfiles />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/create/:id" element={<CreateProfile />} />
        <Route path="/view" element={<ViewProfiles />} />
      </Routes>
      </MemoryRouter>
    </>
  );
};
