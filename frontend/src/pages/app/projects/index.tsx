import { NextPage } from 'next';
import { fetcher } from '../../../service/api';
import useSWR from 'swr';
import { Text, List, ListItem } from '@chakra-ui/react';
import BaseView from '../../../components/BaseView';

const ProjectIndex: NextPage = (): JSX.Element => {
  const { data, isLoading, error } = useSWR('http://localhost:8080/projects/', fetcher);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error occured while fetching the data.</Text>;

  console.log(data);

  return (
    <BaseView>
      <h1>Project Index View.</h1>
      <List>
        {data.map((item: any, index: number) => (
          <ListItem key={index}>{item.title}</ListItem>
        ))}
      </List>
    </BaseView>
  );
};

export default ProjectIndex;
