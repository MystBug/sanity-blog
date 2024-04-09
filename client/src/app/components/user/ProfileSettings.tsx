"use client";

import { Claims } from "@auth0/nextjs-auth0";

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";

type ProfileSettingsProps = {
  user: Claims;
};

export const ProfileSettings = ({ user }: ProfileSettingsProps) => {
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
