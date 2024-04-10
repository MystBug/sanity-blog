"use client";

import { Claims } from "@auth0/nextjs-auth0";

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  ArrowForwardIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

type ProfileSettingsProps = {
  user: Claims;
};

export const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  if (user) {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          >
            Toggle Mode
          </MenuItem>
          <MenuItem as="a" href="/api/auth/logout" icon={<ArrowForwardIcon />}>
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  } else {
    return <></>;
  }
};
