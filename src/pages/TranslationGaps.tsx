import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronLeft, Download, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

import en from "@/i18n/translations/en.json";
import hi from "@/i18n/translations/hi.json";
import ta from "@/i18n/translations/ta.json";
import te from "@/i18n/translations/te.json";
import bn from "@/i18n/translations/bn.json";
import mr from "@/i18n/translations/mr.json";
import gu from "@/i18n/translations/gu.json";
import kn from "@/i18n/translations/kn.json";
import ml from "@/i18n/translations/ml.json";
import pa from "@/i18n/translations/pa.json";

type AnyObj = Record<string, unknown>;

const LANGS: Record<string, { name: string; data: AnyObj }> = {
  hi: { name: "Hindi", data: hi as AnyObj },
  ta: { name: "Tamil", data: ta as AnyObj },
  te: { name: "Telugu", data: te as AnyObj },
  bn: { name: "Bengali", data: bn as AnyObj },
  mr: { name: "Marathi", data: mr as AnyObj },
  gu: { name: "Gujarati", data: gu as AnyObj },
  kn: { name: "Kannada", data: kn as AnyObj },
  ml: { name: "Malayalam", data: ml as AnyObj },
  pa: { name: "Punjabi", data: pa as AnyObj },
};

interface Leaf {
  path: string;
  section: string;
  enValue: string;
}

function walk(obj: unknown, prefix: string, out: Leaf[]) {
  if (obj == null) return;
  if (typeof obj === "string") {
    if (obj.trim().length >= 2) {
      const section = prefix.split(/[.[]/, 1)[0];
      out.push({ path: prefix, section, enValue: obj });
    }
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walk(v, `${prefix}[${i}]`, out));
    return;
  }
  if (typeof obj === "object") {
    Object.entries(obj as AnyObj).forEach(([k, v]) =>
      walk(v, prefix ? `${prefix}.${k}` : k, out),
    );
  }
}

function getAtPath(obj: unknown, path: string): unknown {
  const parts = path.match(/[^.[\]]+|\[\d+\]/g) ?? [];
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    if (p.startsWith("[")) {
      const idx = parseInt(p.slice(1, -1), 10);
      cur = Array.isArray(cur) ? cur[idx] : undefined;
    } else {
      cur = (cur as AnyObj)[p];
    }
  }
  return cur;
}

const TranslationGaps = () => {
  const [filterSection, setFilterSection] = useState<string>("all");

  const enLeaves = useMemo(() => {
    const out: Leaf[] = [];
    walk(en, "", out);
    return out;
  }, []);

  const allSections = useMemo(() => {
    const set = new Set(enLeaves.map((l) => l.section));
    return ["all", ...Array.from(set).sort()];
  }, [enLeaves]);

  const stats = useMemo(() => {
    return Object.entries(LANGS).map(([code, { name, data }]) => {
      const issues: { kind: "missing" | "untranslated"; leaf: Leaf }[] = [];
      for (const leaf of enLeaves) {
        const v = getAtPath(data, leaf.path);
        if (v === undefined || v === null || v === "") {
          issues.push({ kind: "missing", leaf });
        } else if (typeof v === "string" && v === leaf.enValue && leaf.enValue.length > 3) {
          issues.push({ kind: "untranslated", leaf });
        }
      }
      const total = enLeaves.length;
      const translated = total - issues.length;
      const pct = Math.round((translated / total) * 100);
      const bySection: Record<string, number> = {};
      for (const i of issues) bySection[i.leaf.section] = (bySection[i.leaf.section] ?? 0) + 1;
      return { code, name, total, translated, issues, pct, bySection };
    });
  }, [enLeaves]);

  const downloadCSV = () => {
    const header = ["language_code", "language_name", "section", "total_strings", "translated", "missing_or_english", "coverage_pct"];
    const sectionTotals: Record<string, number> = {};
    for (const l of enLeaves) sectionTotals[l.section] = (sectionTotals[l.section] ?? 0) + 1;
    const rows: string[] = [header.join(",")];
    for (const s of stats) {
      for (const [section, total] of Object.entries(sectionTotals)) {
        const gaps = s.bySection[section] ?? 0;
        const tr = total - gaps;
        const pct = Math.round((tr / total) * 100);
        rows.push([s.code, s.name, section, total, tr, gaps, pct].join(","));
      }
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translation-coverage.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Translation Gaps · AgriAI</title>
        <meta name="description" content="Track untranslated dataset fields across 10 Indian languages." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Translation Coverage
              </h1>
              <p className="text-sm text-muted-foreground">
                {enLeaves.length} source strings across {allSections.length - 1} sections
              </p>
            </div>
          </div>
          <Button onClick={downloadCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </Button>
        </div>

        {/* Coverage cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {stats.map((s) => (
            <Card key={s.code}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs uppercase text-muted-foreground">{s.code}</span>
                  {s.pct === 100 ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-sun" />
                  )}
                </div>
                <p className="font-semibold text-sm text-foreground">{s.name}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{s.pct}%</p>
                <Progress value={s.pct} className="h-1.5 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {s.translated} / {s.total}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed gaps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Untranslated Fields by Language</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={stats.find((s) => s.pct < 100)?.code ?? "hi"}>
              <ScrollArea className="w-full">
                <TabsList className="inline-flex">
                  {stats.map((s) => (
                    <TabsTrigger key={s.code} value={s.code} className="text-xs">
                      {s.code} ({s.issues.length})
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>

              {stats.map((s) => (
                <TabsContent key={s.code} value={s.code} className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {allSections.map((sec) => {
                      const count = sec === "all" ? s.issues.length : s.bySection[sec] ?? 0;
                      if (sec !== "all" && count === 0) return null;
                      return (
                        <button
                          key={sec}
                          onClick={() => setFilterSection(sec)}
                          className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                            filterSection === sec
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background hover:bg-muted border-border"
                          }`}
                        >
                          {sec} ({count})
                        </button>
                      );
                    })}
                  </div>
                  {s.issues.length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                      <p className="text-foreground font-medium">Fully translated!</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[500px] rounded-md border">
                      <div className="divide-y">
                        {s.issues
                          .filter((i) => filterSection === "all" || i.leaf.section === filterSection)
                          .slice(0, 500)
                          .map((i, idx) => (
                            <div key={idx} className="p-3 hover:bg-muted/30">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <code className="text-xs text-muted-foreground break-all">
                                    {i.leaf.path}
                                  </code>
                                  <p className="text-sm text-foreground mt-1 line-clamp-2">
                                    {i.leaf.enValue}
                                  </p>
                                </div>
                                <Badge
                                  variant={i.kind === "missing" ? "destructive" : "secondary"}
                                  className="text-xs shrink-0"
                                >
                                  {i.kind}
                                </Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranslationGaps;
