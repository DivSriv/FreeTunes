import { Box,  Text } from '@chakra-ui/layout'
import { Grid, GridItem} from '@chakra-ui/react';
import CardComponent from '../components/cardComponent';
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks';
import { prisma } from '../lib/prisma'

const Home = ({artists}) => {
  const {user, isLoading, isError} = useMe();

  
  return (
    <GradientLayout 
      color="blackAlpha"
      subtitle='Profile'
      title={isLoading ? null : (`${user.firstName} ${user.lastName}`)}
      description={'9 public playlists'}
      image={isLoading ? null : (`https://picsum.photos/200/300?random=${user.id}`)}
    >
      <Box p="1.3rem">
        <Text fontSize="2xl" fontWeight="bold">Top artist of this month</Text>
        <Text>Only visible to you</Text>
      </Box>
      <Grid templateColumns='repeat(8, 1fr)' gap={4} p="1.3rem">
        {
          artists.map(artist => (
            <GridItem w="100%" key={artist.name}>
              <CardComponent
                name={artist.name}
              />
            </GridItem>
          ))
        }
      </Grid>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  console.log(artists);
  return {
    props: {artists}
  }
}

export default Home
