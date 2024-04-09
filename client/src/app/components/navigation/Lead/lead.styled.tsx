"use client";

import styled from "styled-components";
import Link from "next/link";

export const LeadNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  width: 2rem;
  height: 2rem;
  background-color: orange;
`;

export const Navigation = styled("nav")(({ theme }) => ({
  backgroundColor: "#000",
  color: "#000",
  padding: "0.5rem",
}));

export const UserMenu = styled.div`
  display: flex;
  justify-content: flex-end;
`;
