import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Auth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        toast.success(t("auth.resetEmailSent"));
        setIsForgot(false);
        return;
      }
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(t("auth.loginSuccess"));
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
        toast.success(t("auth.signupSuccess"));
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
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
            <CardTitle className="text-xl">{isForgot ? t("auth.resetPassword") : isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}</CardTitle>
            <CardDescription>{isForgot ? t("auth.resetDesc") : isLogin ? t("auth.signInDesc") : t("auth.signUpDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isForgot && (
                <div>
                  <Label>{t("auth.displayName")}</Label>
                  <Input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder={t("auth.yourName")} className="mt-1" required />
                </div>
              )}
              <div>
                <Label>{t("auth.email")}</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t("auth.emailPlaceholder")} className="mt-1" required />
              </div>
              {!isForgot && (
                <div>
                  <Label>{t("auth.password")}</Label>
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t("auth.passwordPlaceholder")} className="mt-1" required minLength={6} />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("auth.pleaseWait") : isForgot ? t("auth.sendResetLink") : isLogin ? <><LogIn className="w-4 h-4 mr-2" />{t("auth.signIn")}</> : <><UserPlus className="w-4 h-4 mr-2" />{t("auth.signUp")}</>}
              </Button>
            </form>
            <div className="mt-4 text-center space-y-2">
              {isLogin && !isForgot && (
                <button onClick={() => setIsForgot(true)} className="text-sm text-muted-foreground hover:text-primary block w-full">
                  {t("auth.forgotPassword")}
                </button>
              )}
              <button onClick={() => { setIsLogin(!isLogin); setIsForgot(false); }} className="text-sm text-primary hover:underline">
                {isLogin || isForgot ? t("auth.noAccount") : t("auth.hasAccount")}
              </button>
              {isForgot && (
                <button onClick={() => setIsForgot(false)} className="text-sm text-muted-foreground hover:text-foreground">
                  {t("auth.backToSignIn")}
                </button>
              )}
            </div>
            <div className="mt-4 text-center">
              <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> {t("auth.backToHome")}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
