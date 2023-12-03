import React from "react";
import styled from "styled-components";
import NavbarComponent from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import Music from "../components/Music";

export default function AppLayout() {
  return (
    <>
      <Welcome />
      <NavbarComponent />
      <Container>
        <ContentLayout>
          <Outlet />
        </ContentLayout>
        <Music />
      </Container>
      <Footer />
    </>
  );
}

const ContentLayout = styled.div`
  padding-top: 2rem;
  position: relative;
`;
