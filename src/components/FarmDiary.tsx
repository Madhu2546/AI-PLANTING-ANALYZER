import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Plus, Trash2, Calendar, IndianRupee, StickyNote, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface DiaryEntry {
  id: string;
  date: string;
  category: "planting" | "fertilizer" | "pesticide" | "irrigation" | "harvest" | "expense" | "observation";
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

const FarmDiary = () => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState("all");

  // Form state
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState<DiaryEntry["category"]>("observation");
  const [crop, setCrop] = useState("Rice");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");

  const addEntry = () => {
    if (!title.trim()) return;
    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date, category, crop, title: title.trim(), notes: notes.trim(),
      amount: amount ? parseFloat(amount) : undefined,
    };
    setEntries(prev => [entry, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
    setTitle(""); setNotes(""); setAmount(""); setShowForm(false);
  };

  const deleteEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id));

  const filtered = filterCat === "all" ? entries : entries.filter(e => e.category === filterCat);

  const totalExpenses = entries.filter(e => e.amount).reduce((s, e) => s + (e.amount || 0), 0);

  const getCatInfo = (cat: string) => CATEGORIES.find(c => c.value === cat) || CATEGORIES[6];

  return (
    <section id="farm-diary" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Farm Diary</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Farm Activity Log
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track daily farming activities, expenses, and observations. Keep a digital record of your crop management.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{entries.length}</p>
              <p className="text-xs text-muted-foreground">Total Entries</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">₹{totalExpenses.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground">Total Expenses</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{new Set(entries.map(e => e.crop)).size}</p>
              <p className="text-xs text-muted-foreground">Crops Tracked</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{new Set(entries.map(e => e.date)).size}</p>
              <p className="text-xs text-muted-foreground">Active Days</p>
            </CardContent></Card>
          </div>

          {/* Add Entry Button / Form */}
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} className="w-full" size="lg">
              <Plus className="w-4 h-4 mr-2" /> Add Activity
            </Button>
          ) : (
            <Card>
              <CardHeader><CardTitle className="text-lg">New Entry</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs">Date</Label>
                    <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Category</Label>
                    <Select value={category} onValueChange={v => setCategory(v as DiaryEntry["category"])}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Crop</Label>
                    <Select value={crop} onValueChange={setCrop}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>{CROP_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Activity Title</Label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Applied Urea to rice field" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Notes / Observations</Label>
                  <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional details..." className="mt-1" rows={2} />
                </div>
                <div>
                  <Label className="text-xs flex items-center gap-1"><IndianRupee className="w-3 h-3" />Expense Amount (optional)</Label>
                  <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="₹0" className="mt-1" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addEntry} className="flex-1">Save Entry</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filter */}
          {entries.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterCat} onValueChange={setFilterCat}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
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
                          {entry.amount !== undefined && (
                            <p className="text-xs font-medium text-primary mt-1">₹{entry.amount.toLocaleString("en-IN")}</p>
                          )}
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

          {entries.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <StickyNote className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No entries yet. Start logging your farm activities!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default FarmDiary;
