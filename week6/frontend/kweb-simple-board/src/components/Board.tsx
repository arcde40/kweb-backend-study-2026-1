import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Trash2, Calendar, User, MessageSquare } from 'lucide-react';
import { postsService, type Post } from '@/services/posts';
import PostDetailModal from '@/components/PostDetailModal';
import { useAuth } from '@/contexts/AuthContext';

export default function Board() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await postsService.getPosts();
      setPosts(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = async () => {
    if (newTitle.trim() && newContent.trim()) {
      try {
        setIsLoading(true);
        const newPost = await postsService.createPost({
          title: newTitle,
          content: newContent,
        });
        setPosts([...posts, newPost]);
        setNewTitle('');
        setNewContent('');
        setError('');
      } catch (err) {
        setError('Failed to create post');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deletePost = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent opening modal when clicking delete
    try {
      setIsLoading(true);
      await postsService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete post');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              KWEB 준회원 BE 스터디
            </h1>
            <p className="text-muted-foreground">무슨 생각을 하고 있나요?</p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Post Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>게시글 작성</CardTitle>
                <CardDescription>새로운 토론을 시작해보세요!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="제목"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    disabled={isLoading}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="무슨 내용이 좋을까요?"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    disabled={isLoading}
                    className="min-h-[150px] bg-background/50 resize-none"
                  />
                </div>
                <Button
                  onClick={addPost}
                  className="w-full"
                  disabled={isLoading || !newTitle.trim() || !newContent.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isLoading ? 'Posting...' : 'Post'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Posts List Section */}
          <div className="lg:col-span-2 space-y-4">
            {posts.length === 0 && !isLoading ? (
              <Card className="border-dashed border-2 bg-muted/10">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">게시글이 없습니다.</h3>
                  <p className="text-muted-foreground max-w-sm mt-2">
                    첫번째 게시글을 작성해보세요!
                  </p>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card
                  key={post.id}
                  className="group transition-all hover:shadow-md border-border/50 cursor-pointer hover:border-primary/50"
                  onClick={() => handlePostClick(post)}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${post.username}`}
                        />
                        <AvatarFallback>
                          {post.username ? getInitials(post.username) : '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <CardTitle className="text-base font-semibold leading-none">
                          {post.title}
                        </CardTitle>
                        {post.username && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.username}
                          </p>
                        )}
                      </div>
                    </div>
                    {post.userId === user?.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => deletePost(e, post.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">게시글 삭제</span>
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap line-clamp-3">
                      {post.content}
                    </p>
                    <div className="mt-4 flex items-center text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>댓글 {post.reply_count}개</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {isLoading && posts.length === 0 && (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-muted rounded" />
                          <div className="h-3 w-20 bg-muted rounded" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-16 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <PostDetailModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}
