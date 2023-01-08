import { chakra } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BaseView from '../../../components/BaseView';

interface ISingleProject {
  projectId: number;
}
//! Don't use serverSideProps here. This is SPA and you don't have to control auth here.
const SingleProject: NextPage<ISingleProject> = (props) => {
  const projectId = useRouter().query.projectId;

  return (
    <BaseView>
      <h1>Single Project Page</h1>
      <chakra.h2 fontSize={'3xl'}>{projectId}</chakra.h2>
    </BaseView>
  );
};

export default SingleProject;
