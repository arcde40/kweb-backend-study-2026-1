import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ModeToggle';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        if (password !== confirmPassword) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }
        await register(username, password);
      }
    } catch (err: any) {
      setError(
        err.message ||
          (isLogin ? '로그인에 실패했습니다.' : '회원가입에 실패했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ModeToggle variant="secondary" />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
            <img
              src="https://kwebofficial.com/_next/static/media/logo.70756afb.png"
              alt="logo"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">환영합니다</h1>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>{isLogin ? '로그인' : '회원가입'}</CardTitle>
            <CardDescription>
              {isLogin
                ? '글을 보고 쓰려면 로그인이 필요합니다.'
                : '새로운 계정을 만들어보세요.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="아이디"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>
              )}
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? '로그인 중...' : '가입 중...'}
                  </>
                ) : isLogin ? (
                  '로그인'
                ) : (
                  '회원가입'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4 bg-muted/20">
            <p className="text-xs text-muted-foreground">
              {isLogin ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            </p>
            <Button
              variant="link"
              className="text-xs text-primary"
              onClick={toggleMode}
            >
              {isLogin ? '회원가입' : '로그인'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
