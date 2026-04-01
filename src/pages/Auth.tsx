import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgot) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Check your email for password reset link!");
        setIsForgot(false);
        return;
      }
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Check your email for verification link!");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="font-serif text-3xl font-bold text-foreground">AgriAI</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{isForgot ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
            <CardDescription>{isForgot ? "Enter your email to receive a reset link" : isLogin ? "Sign in to access your farm diary" : "Sign up to start tracking your farm activities"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isForgot && (
                <div>
                  <Label>Display Name</Label>
                  <Input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" className="mt-1" required />
                </div>
              )}
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" required />
              </div>
              {!isForgot && (
                <div>
                  <Label>Password</Label>
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" required minLength={6} />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait..." : isForgot ? "Send Reset Link" : isLogin ? <><LogIn className="w-4 h-4 mr-2" />Sign In</> : <><UserPlus className="w-4 h-4 mr-2" />Sign Up</>}
              </Button>
            </form>
            <div className="mt-4 text-center space-y-2">
              {isLogin && !isForgot && (
                <button onClick={() => setIsForgot(true)} className="text-sm text-muted-foreground hover:text-primary block w-full">
                  Forgot your password?
                </button>
              )}
              <button onClick={() => { setIsLogin(!isLogin); setIsForgot(false); }} className="text-sm text-primary hover:underline">
                {isLogin || isForgot ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
              {isForgot && (
                <button onClick={() => setIsForgot(false)} className="text-sm text-muted-foreground hover:text-foreground">
                  Back to sign in
                </button>
              )}
            </div>
            <div className="mt-4 text-center">
              <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to home
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
