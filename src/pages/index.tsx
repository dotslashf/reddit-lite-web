import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import { AddIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Button, IconButton } from '@chakra-ui/react';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error
      </Alert>
    );
  }

  return (
    <Box background="orange.100">
      <Layout variant="regular">
        <Flex align="center" mb={4}>
          <Heading textColor="orange.400">RedditLite</Heading>
          <NextLink href="/create-post">
            <IconButton
              ml="auto"
              size="sm"
              aria-label="Add Post"
              colorScheme="orange"
              icon={<AddIcon />}
            />
          </NextLink>
        </Flex>
        {!data && fetching ? (
          <div>Loading...</div>
        ) : (
          <Stack>
            {data.posts.map(p => {
              return (
                <Post
                  title={p.title}
                  text={p.textSnippet}
                  key={p.id}
                  points={p.points}
                  date={p.createdAt}
                />
              );
            })}
          </Stack>
        )}
        <Flex pt={4} pb={8}>
          <Center width="full">
            {data?.posts.length > 0 ? (
              <Button
                onClick={() =>
                  setVariables({
                    limit: variables.limit,
                    cursor: data.posts[data.posts.length - 1].createdAt,
                  })
                }
                isLoading={fetching}
              >
                Load More Posts
              </Button>
            ) : (
              'Youve reached the end of the post'
            )}
          </Center>
        </Flex>
      </Layout>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
