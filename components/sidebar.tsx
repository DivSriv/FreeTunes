import { FunctionComponent, useEffect } from "react";
import NextImage from 'next/image';
import { 
    Box,
    List,
    ListItem,
    Divider,
    Center,
    ListIcon,
    LinkBox,
    LinkOverlay
 } from "@chakra-ui/layout";

import NextLink from 'next/link';
import { useRouter } from 'next/router'


 import {
    MdHome,
    MdSearch,
    MdLibraryMusic,
    MdPlaylistAdd,
    MdFavorite
 } from "react-icons/md";
import { usePlaylist } from "../lib/hooks";
import { Spinner } from '@chakra-ui/react'


 const navMenuDummyData = [
     {
         name: 'Home',
         icon: MdHome,
         route: '/'
     },
     {
         name: 'Search',
         icon: MdSearch,
         route: '/search'
     },
     {
         name: 'Your Library',
         icon: MdLibraryMusic,
         route: '/library'
     },
]

const playlistMenuDummyData = [
     {
         name: 'Create Playlist',
         icon: MdPlaylistAdd,
         route: '/'
     },
     {
         name: 'Favourites',
         icon: MdFavorite,
         route: '/favourites'
     },
]




const SideBar: FunctionComponent = () => {
    const {playlists, isLoading} = usePlaylist();
    const router = useRouter(); 
    useEffect(() => {
        if(playlists.error) {
            router.push('/signin');
        }
    }, [playlists])
    console.log(playlists)
    return ( 
        <Box sx={{
            width: "100%",
            height: "calc(100vh - 100px)",
            bg: "black",
            paddingX: "5px",
            color: "gray.200"
        }}>
            <Box  height="100%">
                <Box sx={{
                    width: "130px",
                    marginBottom: "1.6rem",
                    paddingX: "1.1rem",
                    paddingTop: "1.6rem",
                }}>
                    <NextLink href={navMenuDummyData[0].route} passHref> 
                    <LinkOverlay>
                    <NextImage 
                        src="/Divlogo4.svg" 
                        alt="logo" 
                        height={80}
                        width={200}
                    />
                    </LinkOverlay>
                    </NextLink>
                </Box>
                <Box marginTop="20px" marginBottom="20px">
                    <List spacing={2}>
                        {
                            navMenuDummyData.map(menuItem => (
                                <ListItem paddingX={"1.1rem"} fontSize="1rem" key={menuItem.name}>
                                    <LinkBox>
                                        <NextLink href={menuItem.route} passHref> 
                                            <LinkOverlay>
                                                <ListIcon as={menuItem.icon} color="white" marginRight="1.2rem"/>
                                                {menuItem.name}
                                            </LinkOverlay>
                                        </NextLink>
                                    </LinkBox>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
                <Divider color="gray.800" />
                <Box marginTop="20px" marginBottom="20px">
                    <List spacing={2}>
                        {
                            playlistMenuDummyData.map(menuItem => (
                                <ListItem paddingX={"1.1rem"} fontSize="1rem" key={menuItem.name}>
                                    <LinkBox>
                                        <NextLink href={menuItem.route} passHref>
                                            <LinkOverlay>
                                                <ListIcon as={menuItem.icon} color="white" marginRight="1.2rem"/>
                                                {menuItem.name}
                                            </LinkOverlay>
                                        </NextLink>
                                    </LinkBox>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
                <Divider marginLeft="1.1rem" width="calc(100% - 2.2rem)" borderColor="gray.700" marginTop="20px" marginBottom="20px"/>
                <Box 
                    height="64%" 
                    overflowY="auto"
                    paddingY="1.1rem"
                >
                    <List spacing={2}>
                        {   
                        isLoading || playlists.error ? (
                            null
                        ) :
                        (
                            playlists?.map((playlist) => (
                                <ListItem paddingX={"1.1rem"} fontSize="1rem" key={playlist.id}>
                                    <LinkBox>
                                        <NextLink href={{
                                            pathname: `/playlist/[id]`,
                                            query: {id: playlist.id}
                                            }}
                                            passHref>
                                            <LinkOverlay>
                                                {playlist.name}
                                            </LinkOverlay> 
                                        </NextLink>
                                    </LinkBox>
                                </ListItem>
                            ))
                        )
                        }
                    </List>
                </Box>
            </Box>
        </Box>
     );
}
 
export default SideBar;