import { Box } from "@chakra-ui/layout";
import { redirect } from "next/dist/server/api-utils";
import router from "next/router";
import { FunctionComponent, useEffect } from "react";
import GradientLayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import {prisma} from "../../lib/prisma";
import {chakraColor} from "../../ts/types";

const getRandomColor = (id) => {
    const colors: chakraColor[] = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "teal",
        "purple",
        "pink",
        "blackAlpha",
        "gray"
    ];
    return colors[id -1] || colors[Math.floor(Math.random() * colors.length)]
}

interface PlaylistProps {
    playlist: any;
}
 
const Playlist: FunctionComponent<PlaylistProps> = ({playlist}) => {
    const color = getRandomColor(playlist.id);
    return ( 
        <GradientLayout 
            color={color} 
            roundImage={false} 
            title={playlist.name}
            subtitle="playlist"
            description={`${playlist.songs.length} songs`}
            image={`https://picsum.photos/200/300?random=${playlist.id}`}
        >
            <SongsTable songs={playlist.songs}/>
        </GradientLayout>
     );
}
 
export const getServerSideProps = async ({query, req}) => {
    let user;
    try {
        user = validateToken(req.cookies.jwt_token_access);
    } catch (error) {
        return {
            redirect: {
                permament: false,
                destination: '/signin',
            }
        }
    }

    const [playlist] = await prisma.playlist.findMany({
        where: {
            id: +query.id,
            userId: user.id
        }, 
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            }
        }
    })
    return {
        props: {
            playlist
        }
    }
}
export default Playlist;