import { useQuery } from "@tanstack/react-query";

export interface User {
  id: number;
  name: string;
  email: string;
}

// Fetch function
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// Query hook
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

// Get a specific user by ID
const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// Query hook for a specific user
export function useUser(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id, // Only run the query if an ID is provided
  });
}
