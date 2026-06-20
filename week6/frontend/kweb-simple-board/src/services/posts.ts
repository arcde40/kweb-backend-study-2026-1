import api from '@/lib/api';

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  username?: string;
  createdAt?: string;
  reply_count?: number;
}

export interface Reply {
  id: number;
  content: string;
  postId: number;
  userId: number;
  username?: string;
  createdAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

export const postsService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get('/posts');
    return response.data;
  },

  async getPost(id: number): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post('/posts', data);
    return response.data;
  },

  async updatePost(id: number, data: UpdatePostData): Promise<Post> {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: number): Promise<void> {
    await api.delete(`/posts/${id}`);
  },

  async getReplies(postId: number): Promise<Reply[]> {
    const response = await api.get(`/posts/${postId}/replies`);
    return response.data;
  },

  async createReply(postId: number, content: string): Promise<Reply> {
    const response = await api.post(`/posts/${postId}/replies`, { content });
    return response.data;
  },

  async deleteReply(replyId: number): Promise<void> {
    await api.delete(`/replies/${replyId}`);
  },
};
