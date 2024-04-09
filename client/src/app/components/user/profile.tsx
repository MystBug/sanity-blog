import { getSession } from "@auth0/nextjs-auth0";
import { Avatar } from "@chakra-ui/avatar";
import { ProfileSettings } from "./ProfileSettings";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Menu, MenuItem } from "@chakra-ui/menu";

export default async function ProfileServer() {
  const { user } = (await getSession()) || {};

  return (
    <Flex
      w="100%"
      p="2"
      align="center"
      border="1px"
      borderColor="gray.200"
      bg="gray.100"
      h={58}
    >
      <a href="/">logo</a>
      <Spacer />
      <Flex gap="2" align="center">
        {user ? (
          <>
            <Avatar size="sm" name={user.name} src={user.picture} />
            <p>{user.nickname}</p>
            <ProfileSettings user={user} />
          </>
        ) : (
          <Menu>
            <MenuItem as="a" href="/api/auth/login">
              Login
            </MenuItem>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
}
