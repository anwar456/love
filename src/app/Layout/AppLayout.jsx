import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function AppLayout() {
  return (
    <>
      <Container>
        <ContentLayout>
          <Outlet />
        </ContentLayout>
      </Container>
    </>
  );
}

const ContentLayout = styled.div`
  padding-top: 2rem;
  position: relative;
`;
