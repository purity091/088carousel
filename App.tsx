import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Settings, 
  Download, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft,
  Palette,
  Code,
  Upload
} from 'lucide-react';
import { Canvas } from './components/Canvas';
import { IconDisplay } from './components/IconDisplay';
import { AppState, PRESET_THEMES, Slide, AVAILABLE_ICONS, PRESET_LOGOS } from './types';

const INITIAL_SLIDES: Slide[] = [
  {
    id: '1',
    title: 'حلول استثمارية ذكية',
    description: 'نقدم لك أفضل الفرص الاستثمارية في السوق العقاري والتقني لضمان نمو أموالك بأمان.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    iconName: 'TrendingUp',
  },
  {
    id: '2',
    title: 'تحليل مالي دقيق',
    description: 'تقارير دورية ومفصلة حول أداء محفظتك الاستثمارية مع توصيات خبراء السوق.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    iconName: 'ChartBar',
  },
];

export default function App() {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'settings' | 'css'>('content');
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [state, setState] = useState<AppState>({
    slides: INITIAL_SLIDES,
    activeSlideIndex: 0,
    logoUrl: null,
    theme: PRESET_THEMES[0],
    customCSS: '/* يمكنك إضافة تنسيقات CSS مخصصة هنا */\n.canvas-node h2 { text-shadow: 0 2px 4px rgba(0,0,0,0.1); }',
  });

  // --- Handlers ---

  const handleSlideChange = (direction: 'next' | 'prev') => {
    setState(prev => {
      let newIndex = direction === 'next' ? prev.activeSlideIndex + 1 : prev.activeSlideIndex - 1;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= prev.slides.length) newIndex = prev.slides.length - 1;
      return { ...prev, activeSlideIndex: newIndex };
    });
  };

  const handleUpdateSlide = (key: keyof Slide, value: string) => {
    setState(prev => {
      const newSlides = [...prev.slides];
      newSlides[prev.activeSlideIndex] = {
        ...newSlides[prev.activeSlideIndex],
        [key]: value
      };
      return { ...prev, slides: newSlides };
    });
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'عنوان جديد',
      description: 'أضف وصفاً مميزاً لخدمتك أو منتجك هنا...',
      imageUrl: `https://picsum.photos/800/600?random=${Date.now()}`,
      iconName: 'Star',
    };
    setState(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide],
      activeSlideIndex: prev.slides.length // Move to new slide
    }));
  };

  const handleDeleteSlide = () => {
    if (state.slides.length <= 1) return;
    setState(prev => {
      const newSlides = prev.slides.filter((_, i) => i !== prev.activeSlideIndex);
      return {
        ...prev,
        slides: newSlides,
        activeSlideIndex: Math.max(0, prev.activeSlideIndex - 1)
      };
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setState(prev => ({ ...prev, logoUrl: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleUpdateSlide('imageUrl', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = useCallback(async () => {
    if (canvasRef.current === null) return;
    setIsExporting(true);

    try {
      // Need a small delay to ensure rendering is stable if images were just swapped
      await new Promise(r => setTimeout(r, 500)); 

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High quality
        style: {
           transform: 'scale(1)', // Ensure it exports at natural 100% scale even if zoomed in UI
        }
      });

      const link = document.createElement('a');
      link.download = `radar-slide-${state.activeSlideIndex + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
      alert('حدث خطأ أثناء تحميل الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsExporting(false);
    }
  }, [state.activeSlideIndex]);

  // --- Render ---

  const activeSlide = state.slides[state.activeSlideIndex];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 text-slate-800">
      
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
             <IconDisplay name="Radar" className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">رادار المستثمر</h1>
            <p className="text-xs text-gray-500">منصة بناء الكاروسيل الاحترافي</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={handleDownload}
             disabled={isExporting}
             className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50"
           >
             {isExporting ? (
               <span>جاري المعالجة...</span>
             ) : (
               <>
                 <Download size={18} />
                 <span>تصدير PNG</span>
               </>
             )}
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Right Sidebar (Controls) - RTL layout means this is physically on the right */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {[
              { id: 'content', icon: Type, label: 'المحتوى' },
              { id: 'design', icon: Palette, label: 'التصميم' },
              { id: 'settings', icon: Settings, label: 'الإعدادات' },
              { id: 'css', icon: Code, label: 'CSS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center justify-center py-4 text-xs font-medium gap-1 transition-colors relative
                  ${activeTab === tab.id ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:bg-gray-50'}
                `}
              >
                <tab.icon size={18} />
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 flex-1 space-y-6">
            
            {/* CONTENT TAB */}
            {activeTab === 'content' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">عنوان الشريحة</label>
                  <input 
                    type="text" 
                    value={activeSlide.title}
                    onChange={(e) => handleUpdateSlide('title', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-right"
                    placeholder="اكتب العنوان الرئيسي"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">الوصف</label>
                  <textarea 
                    value={activeSlide.description}
                    onChange={(e) => handleUpdateSlide('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-right resize-none"
                    placeholder="اكتب تفاصيل الخدمة أو المنتج..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">الصورة الرئيسية</label>
                  <div className="relative group cursor-pointer">
                    <img src={activeSlide.imageUrl} alt="preview" className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <label className="cursor-pointer flex flex-col items-center text-white">
                        <Upload size={24} />
                        <span className="text-xs mt-1">تغيير الصورة</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">الأيقونة</label>
                  <div className="grid grid-cols-5 gap-2">
                    {AVAILABLE_ICONS.map(icon => (
                       <button
                         key={icon}
                         onClick={() => handleUpdateSlide('iconName', icon)}
                         className={`aspect-square rounded-md flex items-center justify-center border transition-all
                           ${activeSlide.iconName === icon 
                             ? 'bg-indigo-100 border-indigo-500 text-indigo-700' 
                             : 'bg-white border-gray-200 hover:border-gray-300 text-gray-500'}
                         `}
                       >
                         <IconDisplay name={icon} className="w-5 h-5" />
                       </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DESIGN TAB */}
            {activeTab === 'design' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-900">الثيمات الجاهزة</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {PRESET_THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setState(prev => ({ ...prev, theme }))}
                        className={`p-3 rounded-lg border flex items-center gap-3 transition-all ${state.theme.id === theme.id ? 'ring-2 ring-indigo-500 border-transparent' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                         <div 
                           className="w-10 h-10 rounded-full shadow-md border-2" 
                           style={{ 
                             backgroundColor: theme.backgroundColor, 
                             backgroundImage: theme.gradient || 'none',
                             borderColor: theme.accentColor 
                           }}
                         ></div>
                         <div className="text-right flex-1">
                           <div className="text-sm font-medium text-gray-800">{theme.name}</div>
                         </div>
                         {state.theme.id === theme.id && <div className="w-2 h-2 rounded-full bg-indigo-500"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">ألوان مخصصة (قريباً)</h3>
                    <p className="text-xs text-gray-500">يمكنك استخدام محرر CSS لتخصيص الألوان بدقة أكبر.</p>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
               <div className="space-y-6 animate-fadeIn">
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-gray-700 block">شعار المنصة (Logo)</label>
                   
                   <div className="mb-4">
                     <p className="text-xs text-gray-500 mb-2">اختر شعاراً من القائمة الجاهزة:</p>
                     <div className="grid grid-cols-4 gap-2 pb-2">
                       {PRESET_LOGOS.map((logo) => (
                         <button
                           key={logo.id}
                           onClick={() => setState(prev => ({ ...prev, logoUrl: logo.url }))}
                           className={`aspect-square rounded-md border-2 overflow-hidden bg-white p-1 transition-all ${state.logoUrl === logo.url ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'}`}
                         >
                           <img src={logo.url} alt={logo.name} className="w-full h-full object-contain bg-slate-100/50" />
                         </button>
                       ))}
                     </div>
                     <div className="flex items-center">
                       <div className="flex-grow border-t border-gray-200"></div>
                       <span className="flex-shrink-0 mx-4 text-gray-400 text-xs text-center">أو</span>
                       <div className="flex-grow border-t border-gray-200"></div>
                     </div>
                   </div>

                   <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                       {state.logoUrl ? (
                         <img src={state.logoUrl} className="w-full h-full object-contain" alt="Logo" />
                       ) : (
                         <span className="text-xs text-gray-400 text-center">لا يوجد<br/>شعار</span>
                       )}
                     </div>
                     <label className="flex-1">
                       <span className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-2 w-full transition-colors">
                         <Upload size={16} />
                         رفع الشعار
                       </span>
                       <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                     </label>
                   </div>
                 </div>

                 <div className="pt-4 border-t border-gray-100">
                   <button 
                     onClick={handleDeleteSlide}
                     disabled={state.slides.length <= 1}
                     className="w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <Trash2 size={18} />
                     حذف الشريحة الحالية
                   </button>
                 </div>
               </div>
            )}

            {/* CSS TAB */}
            {activeTab === 'css' && (
              <div className="h-full flex flex-col animate-fadeIn">
                <p className="text-xs text-gray-500 mb-2">
                  أضف أكواد CSS مخصصة هنا. سيتم تطبيقها مباشرة على نطاق الكاروسيل.
                  استخدم الكلاس <code>.canvas-node</code> كبادئة.
                </p>
                <textarea 
                  value={state.customCSS}
                  onChange={(e) => setState(prev => ({ ...prev, customCSS: e.target.value }))}
                  className="flex-1 w-full bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg outline-none resize-none border border-gray-700 focus:border-indigo-500"
                  spellCheck={false}
                />
              </div>
            )}

          </div>
        </aside>

        {/* Center: Canvas Area */}
        <main className="flex-1 bg-gray-100 relative overflow-hidden flex flex-col">
           
           {/* Zoom/Controls Toolbar */}
           <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-full px-4 py-2 flex items-center gap-4 z-40">
             <button 
                onClick={() => handleSlideChange('prev')} 
                disabled={state.activeSlideIndex === 0}
                className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors"
             >
               <ChevronRight size={24} />
             </button>
             
             <span className="text-sm font-bold font-mono text-gray-600">
               {state.activeSlideIndex + 1} / {state.slides.length}
             </span>

             <button 
                onClick={() => handleSlideChange('next')} 
                disabled={state.activeSlideIndex === state.slides.length - 1}
                className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors"
             >
               <ChevronLeft size={24} />
             </button>
           </div>

           <div className="absolute top-4 left-6 z-40">
             <button 
               onClick={handleAddSlide}
               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-105"
               title="إضافة شريحة جديدة"
             >
               <Plus size={24} />
             </button>
           </div>

           {/* Canvas Scroller */}
           <div className="flex-1 overflow-auto flex items-center justify-center p-10">
              <Canvas 
                ref={canvasRef}
                slide={activeSlide}
                theme={state.theme}
                logoUrl={state.logoUrl}
                totalSlides={state.slides.length}
                currentIndex={state.activeSlideIndex}
                customCSS={state.customCSS}
                scale={0.9} // Slight scale down to fit comfortably
              />
           </div>

           {/* Strip Preview (Bottom) */}
           <div className="h-24 bg-white border-t border-gray-200 flex items-center gap-4 px-6 overflow-x-auto">
             {state.slides.map((slide, idx) => (
               <button
                 key={slide.id}
                 onClick={() => setState(prev => ({ ...prev, activeSlideIndex: idx }))}
                 className={`relative h-16 aspect-[4/5] rounded-md overflow-hidden border-2 transition-all flex-shrink-0
                   ${state.activeSlideIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300 opacity-60 hover:opacity-100'}
                 `}
               >
                 <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/20" />
                 <div className="absolute bottom-1 right-1 bg-white/90 p-0.5 rounded-sm">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: state.theme.accentColor }}></div>
                 </div>
               </button>
             ))}
             <button 
               onClick={handleAddSlide}
               className="h-16 aspect-[4/5] rounded-md border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 flex flex-col items-center justify-center text-gray-400 hover:text-indigo-500 transition-colors flex-shrink-0"
             >
               <Plus size={20} />
               <span className="text-[10px] mt-1">جديد</span>
             </button>
           </div>
        </main>
      </div>
    </div>
  );
}