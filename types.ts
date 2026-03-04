export interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iconName: string; // Representing an icon key
}

export interface ThemeConfig {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  cardBackground: string;
  fontFamily: string;
  secondaryColor?: string;
  gradient?: string;
  patternOpacity?: number;
}

export interface AppState {
  slides: Slide[];
  activeSlideIndex: number;
  logoUrl: string | null;
  theme: ThemeConfig;
  customCSS: string;
}

export const PRESET_THEMES: ThemeConfig[] = [
  {
    id: 'deep-ocean',
    name: 'المحيط العميق',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#38bdf8',
    cardBackground: 'rgba(30, 41, 59, 0.7)',
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    secondaryColor: '#1e293b',
    patternOpacity: 0.1,
  },
  {
    id: 'minimal-nordic',
    name: 'مينيمال نورديك',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    accentColor: '#6366f1',
    cardBackground: 'rgba(241, 245, 249, 0.5)',
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
    gradient: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
    secondaryColor: '#f1f5f9',
    patternOpacity: 0.05,
  },
  {
    id: 'luxury-obsidian',
    name: 'أوبسيديان فاخر',
    backgroundColor: '#0a0a0a',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
    cardBackground: 'rgba(23, 23, 23, 0.8)',
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
    gradient: 'linear-gradient(to bottom, #171717, #000000)',
    secondaryColor: '#262626',
    patternOpacity: 0.15,
  },
  {
    id: 'emerald-royal',
    name: 'الزمرد الملكي',
    backgroundColor: '#064e3b',
    textColor: '#ecfdf5',
    accentColor: '#10b981',
    cardBackground: 'rgba(6, 78, 59, 0.6)',
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
    gradient: 'radial-gradient(circle at top right, #065f46, #022c22)',
    secondaryColor: '#065f46',
    patternOpacity: 0.1,
  },
  {
    id: 'sunset-gradient',
    name: 'تدرج الغروب',
    backgroundColor: '#4c1d95',
    textColor: '#ffffff',
    accentColor: '#f472b6',
    cardBackground: 'rgba(88, 28, 135, 0.4)',
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
    gradient: 'linear-gradient(45deg, #4c1d95 0%, #db2777 100%)',
    secondaryColor: '#701a75',
    patternOpacity: 0.08,
  },
  {
    id: 'corporate-slate',
    name: 'سليت الشركات',
    backgroundColor: '#334155',
    textColor: '#f1f5f9',
    accentColor: '#94a3b8',
    cardBackground: 'rgba(71, 85, 105, 0.5)',
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
    gradient: 'linear-gradient(to right, #1e293b, #334155)',
    secondaryColor: '#1e293b',
    patternOpacity: 0.12,
  },
];

export const AVAILABLE_ICONS = [
  "Zap",
  "TrendingUp",
  "Shield",
  "Target",
  "Users",
  "DollarSign",
  "Briefcase",
  "Award",
  "Globe",
  "Smartphone",
];

export interface PresetLogo {
  id: string;
  name: string;
  url: string;
}

export const PRESET_LOGOS: PresetLogo[] = [
  { id: "logo1", name: "شعار 1", url: "/logos/logo1.png" },
  { id: "logo2", name: "شعار 2", url: "/logos/logo2.png" },
  { id: "logo3", name: "شعار 3", url: "/logos/logo3.png" },
  { id: "logo4", name: "شعار 4", url: "/logos/logo4.png" },
];
