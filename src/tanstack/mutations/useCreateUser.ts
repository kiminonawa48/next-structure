import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../queries/useUsers";

interface CreateUserInput {
  name: string;
  email: string;
}

// Create user function
const createUser = async (userData: CreateUserInput): Promise<User> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

// Mutation hook
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      // Invalidate and refetch the users query
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Optionally update the cache directly
      queryClient.setQueryData<User[]>(["users"], (oldData) => {
        return oldData ? [...oldData, newUser] : [newUser];
      });
    },
  });
}
