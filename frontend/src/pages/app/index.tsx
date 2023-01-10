import { chakra } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import BaseView from '../../components/BaseView';
import useSWR from 'swr';
import ProjectGridView from '../../components/ProjectGridView';

const fetcher = (...args: any[]) => fetch(...args).then((res: any) => res.json());

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // TODO: Get auth credentials or some not often changing data
  return {
    props: {},
  };
};

const AppHome: NextPage = (): JSX.Element => {
  const { data, isLoading } = useSWR('https://reqres.in/api/users?page=2', fetcher);

  if (isLoading) return <h1>Loading...</h1>;

  const homeStyles = {
    maxWidth: '1200px',
  };

  return (
    <BaseView>
      <div style={homeStyles}>
        <h1>App Home</h1>
      </div>
      <ProjectGridView />
      {data.data.map((element: any, index: number) => {
        return (
          <chakra.h1 key={index} fontSize={'larger'}>
            {element.email}
          </chakra.h1>
        );
      })}
    </BaseView>
  );
};

export default AppHome;
