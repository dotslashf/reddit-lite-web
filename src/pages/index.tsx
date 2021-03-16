import { Center, Flex, Heading, Stack } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import { AddIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Button, IconButton } from '@chakra-ui/react';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
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
    <Layout variant="regular">
      <Flex align="center" mb={4}>
        <Heading>RedditLite</Heading>
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
          {data.posts.map(p => (
            <Post
              title={p.title}
              text={p.textSnippet}
              key={p.id}
              points={p.points}
            />
          ))}
        </Stack>
      )}
      {data ? (
        <Flex>
          <Button mx="auto" my={4} isLoading={fetching}>
            Load More Posts
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
