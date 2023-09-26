import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";

const AddTodo = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);

    const toast = useToast();

    const { isLoggedIn, user } = useAuth();

    const handleTodoCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "Not logged in",
                description: "Please login to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (title.trim() === "") {
            toast({
                title: "Title cannot be empty",
                description: "Please enter a title for your todo",
                status: "error",
                duration: 1500,
            });
            return;
        }

        setIsLoading(true);
        const todo = {
            title,
            description,
            status,
            userId: user.uid,
        };
        await addTodo(todo);
        setIsLoading(false);

        setTitle("");
        setDescription("");
        setStatus("pending");

        toast({
            title: "Todo created successfully",
            status: "success",
        });
    };

    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Title of the todo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Textarea
                    placeholder="Description of the todo"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Select
                    value={status}
                    variant={"outline"}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option
                        value={"pending"}
                        style={{ color: "yellow", fontWeight: "bold" }}
                    >
                        Pending ⌛
                    </option>
                    <option
                        value={"completed"}
                        style={{ color: "green", fontWeight: "bold" }}
                    >
                        Completed ✅
                    </option>
                </Select>

                <Button
                    onClick={() => handleTodoCreate()}
                    disabled={
                        title.length < 1 || description.length < 1 || isLoading
                    }
                    isLoading={isLoading}
                    variant="solid"
                >
                    Add
                </Button>
            </Stack>
        </Box>
    );
};

export default AddTodo;
