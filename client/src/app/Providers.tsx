"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../styles/theme";

const Providers = (props: React.PropsWithChildren) => {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
    </UserProvider>
  );
};

export default Providers;
