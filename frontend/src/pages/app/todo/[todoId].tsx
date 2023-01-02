import { Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import BaseView from '../../../components/BaseView';
import { fetcher } from '../../../service/api';

const SingleTodo: NextPage = () => {
  const todoId = useRouter().query.todoId;

  const [url, setUrl] = useState(`http://localhost:8080/todos/${todoId}/`);

  // To only re-render when todoId changes
  useEffect(() => {
    setUrl(`http://localhost:8080/todos/${todoId}/`);
  }, [todoId]);

  const { data, isLoading, error } = useSWR(() => url, fetcher);

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  console.log(data);
  return (
    <BaseView>
      <h1>Single Todo Page</h1>
      <p>{todoId}</p>
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
    </BaseView>
  );
};

export default SingleTodo;
