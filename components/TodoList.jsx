import {
    Badge,
    Box,
    Button,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
const TodoList = () => {
    const [todos, setTodos] = React.useState([]);

    const { user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
        if (!user) {
            setTodos([]);
            return;
        }
        const q = query(collection(db, "todo"), where("user", "==", user.uid));

        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setTodos(ar);
        });
    };

    useEffect(() => {
        refreshData();
    }, [user]);

    const handleTodoDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this todo?")) {
            deleteTodo(id);
            toast({
                title: "Deleted 🪣",
                description: "Todo deleted successfully",
                status: "success",
            });
        }
    };

    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleTodoStatus({ docId: id, status: newStatus });
        toast({
            title: `Todo marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };

    return (
        <Box mt={10}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {todos &&
                    todos.map((todo) => (
                        <>
                            <Card
                                direction={{ base: "column", sm: "row" }}
                                overflow="hidden"
                                variant="outline"
                            >
                                <Stack w="100%">
                                    <CardBody>
                                        <Stack
                                            direction={"row"}
                                            justifyContent="space-between"
                                        >
                                            <Heading size="md">
                                                {todo.title}{" "}
                                            </Heading>
                                            <Stack
                                                direction={"row"}
                                                justifyContent="space-between"
                                            >
                                                <Badge
                                                    float="right"
                                                    opacity="0.8"
                                                    px={2}
                                                    fontSize="0.8em"
                                                    maxWidth={"5rem"}
                                                    bg={
                                                        todo.status == "pending"
                                                            ? "yellow.500"
                                                            : "green.500"
                                                    }
                                                >
                                                    {todo.status}
                                                </Badge>
                                                <Button
                                                    maxWidth={"5rem"}
                                                    color={
                                                        todo.status == "pending"
                                                            ? "gray.500"
                                                            : "green.500"
                                                    }
                                                    bg="inherit"
                                                    transition={"0.2s"}
                                                    _hover={{
                                                        bg: "inherit",
                                                        transform: "scale(1.2)",
                                                    }}
                                                    float="right"
                                                    size="xs"
                                                    px={1}
                                                    onClick={() =>
                                                        handleToggle(
                                                            todo.id,
                                                            todo.status
                                                        )
                                                    }
                                                >
                                                    {todo.status ==
                                                    "pending" ? (
                                                        <FaToggleOff
                                                            size={20}
                                                        />
                                                    ) : (
                                                        <FaToggleOn size={20} />
                                                    )}
                                                </Button>
                                            </Stack>
                                        </Stack>
                                        <Text py="2">{todo.description}</Text>
                                    </CardBody>

                                    <CardFooter>
                                        <Button
                                            w="30%"
                                            variant="solid"
                                            colorScheme="red"
                                            onClick={() =>
                                                handleTodoDelete(todo.id)
                                            }
                                            size="sm"
                                        >
                                            <FaTrash /> Delete
                                        </Button>
                                    </CardFooter>
                                </Stack>
                            </Card>
                        </>
                    ))}
            </SimpleGrid>
        </Box>
    );
};

export default TodoList;
