import {
  Card,
  CardHeader,
  Text,
  Stack,
  CardBody,
  AvatarGroup,
  Avatar,
  CardFooter,
  Button,
} from '@chakra-ui/react';

const ProjectGridView = (): JSX.Element => {
  return (
    <Stack direction={['column', 'row']}>
      <Card
        border="1px solid rgba(255, 0, 255, 0.1)"
        _hover={{ backgroundColor: 'rgba(255, 0, 255, 0.1)' }}
      >
        <CardHeader mb={'-5'}>
          <Text fontWeight={'bold'} fontSize={'lg'}>
            Project Name
          </Text>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </Text>
          <ShowProjectUserAvatars />
        </CardBody>
        <CardFooter>
          <Button w={'full'}>Go To Project</Button>
        </CardFooter>
      </Card>
      <Card
        border="1px solid rgba(255, 0, 0, 0.1)"
        _hover={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
      >
        <CardHeader mb={'-5'}>
          <Text fontWeight={'bold'} fontSize={'lg'}>
            Header
          </Text>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </Text>
        </CardBody>
      </Card>
      <Card
        border="1px solid rgba(255, 0, 0, 0.1)"
        _hover={{
          bg: 'red',
          transform: 'backgroundColor',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        <CardHeader mb={'-5'}>
          <Text fontWeight={'bold'} fontSize={'lg'}>
            Header
          </Text>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </Text>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default ProjectGridView;

const ShowProjectUserAvatars = () => {
  return (
    <AvatarGroup size="md" max={4}>
      <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
      <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
      <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
      <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
      <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
      <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
      <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
      <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
    </AvatarGroup>
  );
};
