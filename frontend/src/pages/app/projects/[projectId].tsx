import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  chakra,
  Divider,
  List,
  ListItem,
  Spacer,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BaseView from '../../../components/BaseView';

interface ISingleProject {
  projectId: number;
}
//! Don't use serverSideProps here. This is SPA and you don't have to control auth here.
const SingleProject: NextPage<ISingleProject> = (props) => {
  const projectId = useRouter().query.projectId;

  const listItemStyle = {
    position: 'relative',
    my: '2rem',
    height: '1rem',
    _before: {
      background: 'green',
      opacity: 0.5,
      content: '""',
      position: 'absolute',
      top: '-1rem',
      left: '-.75rem',
      width: '5px',
      height: '3rem',
    },
    _after: {
      border: '2px solid green',
      backgroundColor: 'green',
      opacity: 0.5,
      borderRadius: '100%',
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-20px',
      width: '20px',
      height: '20px',
    },
  };

  return (
    <BaseView>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>ProjectName</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>TaskName</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <header>
        <Tabs mt={5}>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Activities</Tab>
            <Tab>Teilnehmer</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>Content of a primary tab details</TabPanel>
            <TabPanel>
              <List>
                <ListItem sx={listItemStyle}>
                  12 April 2922, 11:20: John Doe added new pariticipant: Jane Doe.
                </ListItem>
                <ListItem sx={listItemStyle}>
                  10 April 2922, 09:20: Max Mustermann changed the title of task.
                </ListItem>
                <ListItem sx={listItemStyle}>
                  08 April 2922, 14:20: Derya karakaya aminin fotografini taska ekledi.
                </ListItem>
              </List>
            </TabPanel>
            <TabPanel>
              <TaskParticipantTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </header>
      <h1>Single Project Page</h1>
      <chakra.h2 fontSize={'3xl'}>{projectId}</chakra.h2>
    </BaseView>
  );
};

export default SingleProject;

const TaskParticipantTable = (): JSX.Element => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Td fontWeight={'bold'}>Display Name</Td>
            <Td fontWeight={'bold'}>Assigned On</Td>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>John Doe</Td>
            <Td>22.10.2013</Td>
          </Tr>
          <Tr>
            <Td>Jane Doe</Td>
            <Td>22.08.2012</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
