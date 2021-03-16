import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface PostProps {
  title: string;
  text: string;
  points: string;
}

export const Post: React.FC<PostProps> = ({ title, text, points }) => {
  return (
    <Box mb={2} p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{title}</Heading>
      <Flex mt={4} align="center">
        <Text>{text}</Text>
        {text.length > 50 ? (
          <Button ml={1} variant="link" colorScheme="orange">
            Read More
          </Button>
        ) : null}
      </Flex>
      <Badge variant="solid" colorScheme="green">
        {points} points
      </Badge>
    </Box>
  );
};
