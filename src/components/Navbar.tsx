import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { AddIcon, ArrowForwardIcon, PlusSquareIcon } from '@chakra-ui/icons';

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
          <Button
            leftIcon={<ArrowForwardIcon />}
            variant="ghost"
            colorScheme="orange"
          >
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button
            variant="ghost"
            colorScheme="orange"
            leftIcon={<PlusSquareIcon />}
          >
            Register
          </Button>
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
        <NextLink href="/create-post">
          <IconButton
            aria-label="Add Post"
            colorScheme="green"
            icon={<AddIcon />}
          />
        </NextLink>
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
    <Flex position="sticky" top={0} zIndex="100" bg="orange.300" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
