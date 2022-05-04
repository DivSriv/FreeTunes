import {
    Box, 
    Flex, 
    Input, 
    Button,
    Text
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import { FunctionComponent, useState } from 'react';
import {useSWRConfig} from 'swr';
import { auth } from '../lib/mutations';


interface AuthFormProps {
    mode: 'signin' | 'signup';
}
 
const AuthForm: FunctionComponent<AuthFormProps> = ({mode}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        let password_confirm = mode === 'signup' ? passwordConfirm : null;
        const data = await auth(mode, {email, password, password_confirm});
        if (!data.error) {
            router.push('/')
        } else {
            setIsLoading(false);
            /// show error
        }
    }

    return (
        <Box sx={{
            height: "100vh",
            width: "100vw",
            bg: "black",
            color: "white"
        }}>
            <Flex justify="center" align="center" height="110px" borderBottom="white 1px solid">
                <NextImage  src="/Divlogo4.svg" height="80px" width={175} />
            </Flex>
            <Flex justify="center" align="center" height="calc(100vh - 200px)">
                <Box sx={{
                    padding: "100px",
                    backgroundColor: "gray.900",
                    borderRadius: "6px"
                }}>
                    <form onSubmit={handleSubmit} >
                        <Input width="300px" border="4px" placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)}/><br></br>
                        <Input width="300px" border="4px" marginTop="25px"  placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/><br></br>
                        {
                            mode === 'signup' && (
                            <Input width="300px" border="4px" marginTop="25px" placeholder='Password confirmation' type='password' onChange={(e) => setPasswordConfirm(e.target.value)}/>
                            )
                        }<br></br>
                        <Flex justifyContent="center" marginTop="20px">
                        <Button 
                            type="submit" 
                            bg="green.600" 
                            isLoading={isLoading}
                            loadingText="loading..."
                            sx={{
                                "&:hover": {
                                    bg: "green.400"
                                }
                            }}
                        >
                            <Text>{mode.toUpperCase()}</Text>
                        </Button>
                        </Flex>
                        <Box>
                            {
                                mode === 'signup' && (
                                    <Flex align='center' direction='column'>
                                        <Text>
                                            Already have an account?
                                        </Text>
                                        <Text color='blue.400' sx={{
                                            "&:hover": {
                                                color: "blue.200"
                                            }
                                        }}>
                                            <Link href="/signin">Sign In</Link>
                                        </Text>
                                    </Flex>
                                )
                            }
                        </Box>
                    </form>
                </Box>
            </Flex>
        </Box>
      );
}
 
export default AuthForm;
