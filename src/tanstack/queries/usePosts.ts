import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsQueryParams {
  userId?: number;
  _limit?: number;
  _page?: number;
}

// Using the API client for fetching
const fetchPosts = async (params?: PostsQueryParams): Promise<Post[]> => {
  return apiClient.get<Post[]>("/posts", {
    params: params as Record<string, string>,
  });
};

// Query hook with parameters
export function usePosts(params?: PostsQueryParams) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  });
}

// Get a specific post by ID
const fetchPostById = async (id: number): Promise<Post> => {
  return apiClient.get<Post>(`/posts/${id}`);
};

// Query hook for a specific post
export function usePost(id: number) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id, // Only run the query if an ID is provided
  });
}

// Get posts by user ID
export function useUserPosts(userId: number) {
  return usePosts({ userId });
}
