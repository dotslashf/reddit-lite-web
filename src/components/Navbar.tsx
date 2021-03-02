import { Box, Button, ButtonGroup, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
    //data is loading
  } else if (!data?.me) {
    // user is not logged in
    body = (
      <ButtonGroup>
        <NextLink href="/login">
          <Button colorScheme="blue">Login</Button>
        </NextLink>
        <NextLink href="/register">
          <Button colorScheme="green">Register</Button>
        </NextLink>
      </ButtonGroup>
    );
  } else {
    // user is logged in
    body = (
      <ButtonGroup>
        <Button colorScheme="blue">
          {data.me.username.charAt(0).toUpperCase() + data.me.username.slice(1)}
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </ButtonGroup>
    );
  }
  return (
    <Flex bg="gray.200" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
