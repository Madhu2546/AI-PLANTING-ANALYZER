import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Menu, X, LogIn, LogOut, User, ChevronDown, BookOpen, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const name = session.user.user_metadata?.display_name || session.user.email?.split("@")[0] || "User";
        setDisplayName(name);
      } else {
        setDisplayName("");
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setDisplayName(session.user.user_metadata?.display_name || session.user.email?.split("@")[0] || "User");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: "crop-comparison", labelKey: "navbar.compareCrops" },
    { id: "seasonal-calendar", labelKey: "navbar.calendar" },
    { id: "regional-recommendations", labelKey: "navbar.regional" },
    { id: "crop-rotation", labelKey: "navbar.rotation" },
    { id: "crop-diseases", labelKey: "navbar.diseases" },
    { id: "profit-calculator", labelKey: "navbar.calculator" },
    { id: "weather-alerts", labelKey: "navbar.weather" },
    { id: "market-trends", labelKey: "navbar.trends" },
    { id: "yield-prediction", labelKey: "navbar.yield" },
    { id: "soil-health", labelKey: "navbar.soil" },
    { id: "government-schemes", labelKey: "navbar.schemes" },
    { id: "nutrient-guide", labelKey: "navbar.nutrients" },
    { id: "irrigation-scheduler", labelKey: "navbar.irrigation" },
    { id: "farm-diary", labelKey: "navbar.farmDiary" },
    { id: "india-map", labelKey: "nav.cropMap" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl md:text-2xl font-bold text-foreground">
              AgriAI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("how-it-works")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.howItWorks")}
            </button>

            {/* Features Menu Box */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <LayoutGrid className="w-4 h-4" />
                  {t("navbar.features")}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 max-h-[70vh] overflow-y-auto">
                <DropdownMenuLabel>{t("navbar.allFeatures")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {menuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="cursor-pointer"
                    >
                      {t(item.labelKey)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
            <LanguageSwitcher />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="max-w-[100px] truncate text-xs">{displayName}</span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => scrollTo("farm-diary")} className="cursor-pointer">
                    <BookOpen className="w-4 h-4 mr-2" /> {t("navbar.farmDiary")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" /> {t("navbar.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                <LogIn className="w-4 h-4 mr-1" /> {t("navbar.login")}
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={() => scrollTo("recommendation-form")}
            >
              {t("nav.tryNow")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-card rounded-b-2xl shadow-card border-t border-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col p-4 gap-1 max-h-[70vh] overflow-y-auto">
              <button onClick={() => scrollTo("how-it-works")} className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2">{t("nav.howItWorks")}</button>
              <div className="border-t border-border my-1" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 py-1">{t("navbar.allFeatures")}</p>
              {menuItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2 pl-2">{t(item.labelKey)}</button>
              ))}
              <div className="border-t border-border my-1" />
              <div className="flex items-center gap-2 py-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              {user ? (
                <div className="border-t border-border pt-2 mt-1">
                  <div className="flex items-center gap-2 px-1 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleLogout} className="w-full mt-1">
                    <LogOut className="w-4 h-4 mr-1" /> {t("navbar.logout")}
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => { navigate("/auth"); setIsMobileMenuOpen(false); }} className="w-full mt-2">
                  <LogIn className="w-4 h-4 mr-1" /> {t("navbar.login")}
                </Button>
              )}
              <Button
                variant="default"
                onClick={() => scrollTo("recommendation-form")}
                className="w-full mt-2"
              >
                {t("nav.tryNow")}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
