import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Shield } from "lucide-react";

// Local typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthResult = {
  data?: { redirect_url?: string; redirect_to?: string; client?: { name?: string; redirect_uris?: string[] }; scope?: string; scopes?: string[] } | null;
  error?: { message: string } | null;
};
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthResult["data"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data ?? null);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-serif text-2xl font-bold text-foreground">AgriAI</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Authorize access
            </CardTitle>
            <CardDescription>
              {details?.client?.name
                ? `Connect ${details.client.name} to your AgriAI account`
                : "Review this connection request"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <p className="text-sm text-destructive">Could not load this authorization request: {error}</p>
            )}
            {!error && !details && <p className="text-sm text-muted-foreground">Loading…</p>}
            {details && (
              <>
                <p className="text-sm text-foreground">
                  This will let <strong>{details.client?.name ?? "the client"}</strong> use AgriAI as you — including
                  reading and creating your farm diary entries and profile.
                </p>
                <p className="text-xs text-muted-foreground">
                  This does not bypass AgriAI's permissions or backend policies. You can revoke access at any time.
                </p>
                <div className="flex gap-2 pt-2">
                  <Button disabled={busy} onClick={() => decide(true)} className="flex-1">
                    Approve
                  </Button>
                  <Button disabled={busy} variant="outline" onClick={() => decide(false)} className="flex-1">
                    Deny
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
