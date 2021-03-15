import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = ({ }) => {
  useIsAuth()
  const router = useRouter();
  const [, createPost] = useCreatePostMutation()
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Your post title"
              label="Title"
            />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="text..."
                label="Post Text"
                textArea
              />
            </Box>
            <ButtonGroup mt={4}>
              <Button isLoading={isSubmitting} type="submit" colorScheme="green">
                Create Post
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
      </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);