import React from "react";
import { Box, Button, Link, Stack, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { Avatar } from "@chakra-ui/react";
const Auth = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const { isLoggedIn, user } = useAuth();

    const handleAuth = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                flexDirection={"column"}
                position={"fixed"}
                top={"5%"}
                right="5%"
            >
                {isLoggedIn && (
                    <Stack alignItems={"center"} m={2}>
                        <Avatar
                            name={user.displayName}
                            src="https://bit.ly/broken-link"
                        />
                        <Text color="green.500" fontWeight="bold">
                            {user.displayName}
                        </Text>
                        <Text
                            color="green.500"
                            fontWeight="bold"
                            fontSize={"xs"}
                        >
                            {user.email}
                        </Text>
                        <Link
                            color="red.500"
                            mt={2}
                            onClick={() => auth.signOut()}
                        >
                            <Button variant="ghost" size="sm">
                                Logout
                            </Button>
                        </Link>
                    </Stack>
                )}
                {!isLoggedIn && (
                    <Button
                        leftIcon={<FaGoogle />}
                        onClick={() => handleAuth()}
                    >
                        Google
                    </Button>
                )}
                <Button
                    onClick={() => toggleColorMode()}
                    px={5}
                    mt={5}
                    w={"4rem"}
                    size={"sm"}
                    variant={"solid"}
                >
                    {colorMode == "dark" ? <FaSun /> : <FaMoon />}
                </Button>
            </Box>
        </>
    );
};

export default Auth;
