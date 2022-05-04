import {Box, Flex, Text} from '@chakra-ui/layout';
import { Image, Spinner } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { chakraColor } from '../ts/types';

interface GradientLayoutProps {
    children?:       React.ReactNode;
    color:           chakraColor;
    title?:          string;
    subtitle?:       string;
    image?:          string;
    description?:    string;
    roundImage?:     boolean;
} 

const GradientLayout: FunctionComponent<GradientLayoutProps> = ({
    color,
    title,
    subtitle,
    description,
    image,
    roundImage,
    children,
    }) => {
        return (
            <Box 
                sx={{height: '100%', overflowY: "auto", color: '#fff'}} 
                bgGradient={`linear(${color}.500 0%, ${color}.600 20%, ${color}.700 40%, #242424)`}
            >
                <Flex 
                    sx={{bgColor: `${color}.700`, p: '2.4rem',
                    }}
                    align="end" 
                >
                    <Box padding="1.3rem">
                        <Image boxSize="160px" sx={{minWidth: "160px"}} boxShadow="2xl" src={image} borderRadius={roundImage ? '100%' : '3px'}/>
                    </Box>
                    <Box padding="1.3rem" lineHeight={"1.6rem"}>
                        <Text fontSize="xs" fontWeight="bold">{subtitle}</Text>
                        {
                            !title ? <Spinner size="xl" color="red.500" />
                            : <Text fontSize="4xl" fontWeight="regular" mb="0.6rem">{title}</Text>
                        }
                        <Text fontSize="xs" fontWeight="regular">{description}</Text>
                    </Box>
                </Flex>
                <Box p="2.4rem">
                    {children}
                </Box>
            </Box>
    )
};

export default GradientLayout;