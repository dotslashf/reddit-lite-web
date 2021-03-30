import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import ago from 's-ago';
import React from 'react';

interface PostProps {
  title: string;
  text: string;
  points: string;
  date: string;
}

export const Post: React.FC<PostProps> = ({ title, text, points, date }) => {
  return (
    <Box mb={2} p={5} shadow="md" borderWidth="1px" bg="white" rounded="xl">
      <Heading fontSize="xl">{title}</Heading>
      <Flex mt={4} align="center">
        <Text>{text}</Text>
        {text.length > 50 ? (
          <Button ml={1} variant="link" textColor="orange.600">
            Read More
          </Button>
        ) : null}
      </Flex>
      <Box
        color="gray.700"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
      >
        Posted {ago(new Date(parseInt(date)))}
      </Box>
      <Badge variant="solid" colorScheme="green">
        {points} points
      </Badge>
    </Box>
  );
};
