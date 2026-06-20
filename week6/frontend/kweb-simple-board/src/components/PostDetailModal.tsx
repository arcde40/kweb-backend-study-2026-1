import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { postsService, type Post, type Reply } from '@/services/posts';
import { Loader2, Send, User } from 'lucide-react';

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PostDetailModal({
  post,
  isOpen,
  onClose,
}: PostDetailModalProps) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post && isOpen) {
      fetchReplies(post.id);
    } else {
      setReplies([]);
      setNewReply('');
    }
  }, [post, isOpen]);

  const fetchReplies = async (postId: number) => {
    try {
      setIsLoading(true);
      const data = await postsService.getReplies(postId);
      setReplies(data);
    } catch (err) {
      console.error('Failed to fetch replies', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!post || !newReply.trim()) return;

    try {
      setIsSubmitting(true);
      const reply = await postsService.createReply(post.id, newReply);
      setReplies([...replies, reply]);
      setNewReply('');
    } catch (err) {
      console.error('Failed to create reply', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col p-0 gap-0 bg-white dark:bg-white">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://avatar.vercel.sh/${post.username}`} />
              <AvatarFallback>
                {post.username ? getInitials(post.username) : '?'}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <DialogTitle className="text-xl">{post.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {post.username}
                </span>
                <span>•</span>
                <span>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : 'Unknown date'}
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 p-6 pt-0">
            <div className="space-y-6">
              <div className="text-base leading-relaxed whitespace-pre-wrap border-b pb-6">
                {post.content}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  댓글 ({replies.length})
                </h3>

                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : replies.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">
                    아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex gap-3 bg-muted/30 p-3 rounded-lg"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${reply.username}`}
                          />
                          <AvatarFallback>
                            {reply.username ? getInitials(reply.username) : '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {reply.username}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/90">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="p-4 border-t bg-background mt-auto">
          <div className="flex gap-2">
            <Textarea
              placeholder="댓글을 써보세요!"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              className="min-h-[40px] max-h-[120px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitReply();
                }
              }}
            />
            <Button
              size="icon"
              onClick={handleSubmitReply}
              disabled={isSubmitting || !newReply.trim()}
              className="h-10 w-10 shrink-0"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">댓글 전송</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
