import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Plus, Trash2, Calendar, IndianRupee, StickyNote, Filter, Download, LogIn, Loader2, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { exportFarmDiaryToPDF } from "@/utils/pdfExport";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface DiaryEntry {
  id: string;
  date: string;
  category: string;
  crop: string;
  title: string;
  notes: string;
  amount?: number;
}

const CATEGORIES = [
  { value: "planting", label: "🌱 Planting", color: "bg-primary/10 text-primary" },
  { value: "fertilizer", label: "🧪 Fertilizer", color: "bg-leaf/20 text-leaf" },
  { value: "pesticide", label: "🛡️ Pesticide", color: "bg-destructive/10 text-destructive" },
  { value: "irrigation", label: "💧 Irrigation", color: "bg-water/20 text-water" },
  { value: "harvest", label: "🌾 Harvest", color: "bg-sun/20 text-sun" },
  { value: "expense", label: "💰 Expense", color: "bg-accent/20 text-accent-foreground" },
  { value: "observation", label: "📝 Observation", color: "bg-muted text-muted-foreground" },
];

const CROP_OPTIONS = ["Rice", "Wheat", "Maize", "Cotton", "Chickpea", "Lentil", "Mango", "Grapes", "Papaya", "Watermelon", "Coconut", "Coffee", "Other"];

const CHART_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#06b6d4", "#84cc16", "#a855f7", "#6366f1", "#10b981"];

const FarmDiary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [filterCat, setFilterCat] = useState("all");

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("observation");
  const [crop, setCrop] = useState("Rice");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthChecked(true);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthChecked(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchEntries = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("farm_diary_entries")
      .select("*")
      .order("date", { ascending: false });
    if (error) { toast.error("Failed to load entries"); }
    else {
      setEntries((data || []).map(d => ({
        id: d.id,
        date: d.date,
        category: d.category,
        crop: d.crop,
        title: d.title,
        notes: d.notes || "",
        amount: d.amount != null ? Number(d.amount) : undefined,
      })));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  const addEntry = async () => {
    if (!title.trim() || !user) return;
    const { error } = await supabase.from("farm_diary_entries").insert({
      user_id: user.id,
      date, category, crop, title: title.trim(), notes: notes.trim(),
      amount: amount ? parseFloat(amount) : null,
    });
    if (error) { toast.error("Failed to save entry"); return; }
    toast.success("Entry saved!");
    setTitle(""); setNotes(""); setAmount(""); setShowForm(false);
    fetchEntries();
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("farm_diary_entries").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const filtered = filterCat === "all" ? entries : entries.filter(e => e.category === filterCat);
  const totalExpenses = entries.filter(e => e.amount).reduce((s, e) => s + (e.amount || 0), 0);
  const getCatInfo = (cat: string) => CATEGORIES.find(c => c.value === cat) || CATEGORIES[6];

  // Crop cost data for chart
  const cropCostData = Object.entries(
    entries.filter(e => e.amount).reduce<Record<string, number>>((acc, e) => {
      acc[e.crop] = (acc[e.crop] || 0) + (e.amount || 0);
      return acc;
    }, {})
  ).map(([crop, total]) => ({ crop, total })).sort((a, b) => b.total - a.total);

  return (
    <section id="farm-diary" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">{t("diary.badge")}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t("diary.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("diary.description")}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Auth gate */}
          {authChecked && !user ? (
            <Card>
              <CardContent className="py-12 text-center space-y-4">
                <LogIn className="w-12 h-12 text-muted-foreground/50 mx-auto" />
                <p className="text-muted-foreground">{t("diary.signInPrompt")}</p>
                <Button onClick={() => navigate("/auth")}>{t("diary.signInButton")}</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {loading && <div className="text-center py-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>}

              {/* Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card><CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{entries.length}</p>
                  <p className="text-xs text-muted-foreground">{t("diary.totalEntries")}</p>
                </CardContent></Card>
                <Card><CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">₹{totalExpenses.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-muted-foreground">{t("diary.totalExpenses")}</p>
                </CardContent></Card>
                <Card><CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{new Set(entries.map(e => e.crop)).size}</p>
                  <p className="text-xs text-muted-foreground">{t("diary.cropsTracked")}</p>
                </CardContent></Card>
                <Card><CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{new Set(entries.map(e => e.date)).size}</p>
                  <p className="text-xs text-muted-foreground">{t("diary.activeDays")}</p>
                </CardContent></Card>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {!showForm && <Button onClick={() => setShowForm(true)} className="flex-1" size="lg"><Plus className="w-4 h-4 mr-2" />{t("diary.addActivity")}</Button>}
                {entries.length > 0 && (
                  <>
                    <Button variant="outline" size="lg" onClick={() => exportFarmDiaryToPDF(entries)}><Download className="w-4 h-4 mr-2" />{t("diary.exportPdf")}</Button>
                    <Button variant="outline" size="lg" onClick={() => setShowChart(!showChart)}><BarChart3 className="w-4 h-4 mr-2" />{showChart ? t("diary.hideChart") : t("diary.costChart")}</Button>
                  </>
                )}
              </div>

              {/* Cost Chart */}
              {showChart && cropCostData.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t("diary.cropExpenseChart")}</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={cropCostData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="crop" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v.toLocaleString("en-IN")}`} />
                        <Tooltip formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Total Cost"]} />
                        <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                          {cropCostData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Form */}
              {showForm && (
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t("diary.newEntry")}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div><Label className="text-xs">{t("diary.date")}</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1" /></div>
                      <div><Label className="text-xs">{t("diary.category")}</Label>
                        <Select value={category} onValueChange={setCategory}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select>
                      </div>
                      <div><Label className="text-xs">{t("diary.crop")}</Label>
                        <Select value={crop} onValueChange={setCrop}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>{CROP_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                      </div>
                    </div>
                    <div><Label className="text-xs">{t("diary.activityTitle")}</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder={t("diary.activityPlaceholder")} className="mt-1" /></div>
                    <div><Label className="text-xs">{t("diary.notes")}</Label><Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={t("diary.notesPlaceholder")} className="mt-1" rows={2} /></div>
                    <div><Label className="text-xs flex items-center gap-1"><IndianRupee className="w-3 h-3" />{t("diary.expense")}</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="₹0" className="mt-1" /></div>
                    <div className="flex gap-2"><Button onClick={addEntry} className="flex-1">Save Entry</Button><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button></div>
                  </CardContent>
                </Card>
              )}

              {/* Filter */}
              {entries.length > 0 && (
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={filterCat} onValueChange={setFilterCat}>
                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All Categories</SelectItem>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}

              {/* Entries */}
              <div className="space-y-3">
                {filtered.map(entry => {
                  const catInfo = getCatInfo(entry.category);
                  return (
                    <motion.div key={entry.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center gap-1 shrink-0 w-14">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-medium text-sm text-foreground">{entry.title}</span>
                                <Badge className={`${catInfo.color} text-xs`}>{catInfo.label}</Badge>
                                <Badge variant="outline" className="text-xs">{entry.crop}</Badge>
                              </div>
                              {entry.notes && <p className="text-xs text-muted-foreground">{entry.notes}</p>}
                              {entry.amount !== undefined && <p className="text-xs font-medium text-primary mt-1">₹{entry.amount.toLocaleString("en-IN")}</p>}
                            </div>
                            <Button variant="ghost" size="icon" className="shrink-0" onClick={() => deleteEntry(entry.id)}>
                              <Trash2 className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {!loading && entries.length === 0 && (
                <Card><CardContent className="py-12 text-center">
                  <StickyNote className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No entries yet. Start logging your farm activities!</p>
                </CardContent></Card>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FarmDiary;
