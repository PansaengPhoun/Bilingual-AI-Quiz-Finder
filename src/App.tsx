/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  X, 
  CheckCircle2, 
  Download, 
  Share2, 
  RotateCcw, 
  Zap,
  Brain,
  Sparkles,
  Search,
  BarChart3,
  Palette,
  ChevronRight,
  Trophy
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { QUESTIONS, RESULTS } from './data';
import { Persona, Result } from './types';

type AppState = 'landing' | 'quiz' | 'result';

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Persona[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const startQuiz = () => {
    setState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setIsCalculating(false);
  };

  const handleAnswer = (persona: Persona) => {
    const newAnswers = [...answers, persona];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        calculateResult(newAnswers);
        setIsCalculating(false);
      }, 1500);
    }
  };

  const calculateResult = (finalAnswers: Persona[]) => {
    const counts = finalAnswers.reduce((acc, persona) => {
      acc[persona] = (acc[persona] || 0) + 1;
      return acc;
    }, {} as Record<Persona, number>);

    let topPersona: Persona = 'chatgpt';
    let maxCount = 0;

    (Object.keys(counts) as Persona[]).forEach((persona) => {
      if (counts[persona] > maxCount) {
        maxCount = counts[persona];
        topPersona = persona;
      }
    });

    setResult(RESULTS[topPersona]);
    setState('result');
  };

  const downloadCard = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `my-ai-match-${result?.name.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Match',
        text: `I got ${result?.name} as my AI assistant! Find yours at:`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser. Copy the URL to share!');
    }
  };

  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-['Plus_Jakarta_Sans',_sans-serif] text-slate-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {state === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col min-h-screen"
          >
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-4xl mx-auto w-full">
              <div className="relative mb-12">
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 bg-white p-2 rounded-3xl shadow-2xl border-4 border-[#25e2f4]"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" 
                    alt="AI Concept"
                    className="rounded-2xl w-full max-w-[500px] aspect-[16/9] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="absolute -top-6 -right-6 size-24 bg-[#25e2f4] rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-6 -left-6 size-32 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
              </div>
              
              <div className="text-center space-y-8">
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none">
                    WHICH AI IS <br/>
                    <span className="text-[#25e2f4] italic">RIGHT FOR YOU?</span>
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-400">AI ตัวไหนเหมาะกับคุณ?</h2>
                </div>

                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm max-w-2xl mx-auto">
                  <p className="text-lg font-medium text-slate-600 leading-relaxed">
                    Answer 10 questions and discover your AI personality.
                    <br/>
                    <span className="text-slate-400">ตอบคำถาม 10 ข้อเพื่อค้นหา AI ที่เหมาะกับสไตล์การทำงานของคุณ</span>
                  </p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startQuiz}
                  className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-[#25e2f4] text-[#102122] rounded-2xl text-2xl font-black shadow-xl shadow-[#25e2f4]/30 hover:shadow-[#25e2f4]/50 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                  START QUIZ
                  <Rocket className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 w-full">
                <PersonaCard 
                  label="Creative" 
                  color="text-pink-500" 
                  icon={<Palette className="w-5 h-5" />} 
                  img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400"
                />
                <PersonaCard 
                  label="Productive" 
                  color="text-blue-500" 
                  icon={<Zap className="w-5 h-5" />} 
                  img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
                />
                <PersonaCard 
                  label="Research" 
                  color="text-green-500" 
                  icon={<Search className="w-5 h-5" />} 
                  img="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400"
                />
                <PersonaCard 
                  label="Deep Thinker" 
                  color="text-purple-500" 
                  icon={<Brain className="w-5 h-5" />} 
                  img="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400"
                />
              </div>
            </main>
            <Footer />
          </motion.div>
        )}

        {isCalculating && (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="size-24 bg-[#25e2f4] rounded-3xl flex items-center justify-center text-[#102122] mb-8 shadow-2xl shadow-[#25e2f4]/30"
            >
              <Brain className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Analyzing your style...</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest">กำลังวิเคราะห์สไตล์ของคุณ...</p>
          </motion.div>
        )}

        {state === 'quiz' && !isCalculating && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col min-h-screen"
          >
            <Header onBack={() => setState('landing')} />
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
              <div className="mb-12 space-y-4">
                <div className="flex items-center justify-between text-sm font-black uppercase tracking-widest text-slate-400">
                  <span>Question {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-white shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#25e2f4] to-blue-400" 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
              </div>

              <div className="space-y-10">
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                    {QUESTIONS[currentQuestionIndex].questionEn}
                  </h1>
                  <h2 className="text-xl md:text-2xl font-bold text-[#25e2f4]">
                    {QUESTIONS[currentQuestionIndex].questionTh}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleAnswer(option.persona)}
                      className="group flex items-center gap-6 p-6 bg-white rounded-2xl border-2 border-transparent hover:border-[#25e2f4] hover:shadow-xl hover:-translate-y-1 transition-all text-left cursor-pointer shadow-sm"
                    >
                      <div className="size-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-black text-slate-400 group-hover:bg-[#25e2f4] group-hover:text-[#102122] transition-colors">
                        {option.id}
                      </div>
                      <div className="flex-1">
                        <p className="text-xl font-bold text-slate-900">{option.labelEn}</p>
                        <p className="text-slate-400 font-medium">{option.labelTh}</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-[#25e2f4] transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </main>
          </motion.div>
        )}

        {state === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen bg-white"
          >
            <Header onBack={() => setState('landing')} />
            <main className="flex-1 flex flex-col items-center py-12 px-4 max-w-6xl mx-auto w-full">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-12 text-center"
              >
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-100 text-yellow-700 rounded-full font-black uppercase tracking-widest text-sm mb-6">
                  <Trophy className="w-4 h-4" /> Quiz Complete!
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
                  YOUR AI MATCH IS <br/>
                  <span className={`italic ${
                    result.persona === 'chatgpt' ? 'text-emerald-500' :
                    result.persona === 'copilot' ? 'text-blue-600' :
                    result.persona === 'gemini' ? 'text-indigo-600' :
                    'text-orange-500'
                  }`}>{result.name.toUpperCase()} ⚡</span>
                </h1>
              </motion.div>

              {/* Celebratory Particles */}
              <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      top: "-10%", 
                      left: `${Math.random() * 100}%`,
                      rotate: 0,
                      scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{ 
                      top: "110%",
                      rotate: 360,
                    }}
                    transition={{ 
                      duration: Math.random() * 3 + 2, 
                      repeat: Infinity, 
                      delay: Math.random() * 5,
                      ease: "linear"
                    }}
                    className={`absolute size-4 rounded-full opacity-20 ${
                      ['bg-emerald-400', 'bg-blue-400', 'bg-indigo-400', 'bg-orange-400', 'bg-yellow-400'][Math.floor(Math.random() * 5)]
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
                {/* Share Card Section */}
                <div className="flex flex-col items-center gap-6">
                  <p className="text-sm font-black uppercase tracking-widest text-slate-400">Shareable Result Card</p>
                  
                  {/* The Square Card */}
                  <div 
                    ref={cardRef}
                    className="aspect-square w-full max-w-[500px] bg-gradient-to-br from-[#102122] to-[#1a3a3d] rounded-[40px] p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl"
                  >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 size-64 bg-[#25e2f4] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 size-64 bg-blue-500 rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-[#25e2f4] font-black text-2xl tracking-tighter uppercase">AI QUIZ</p>
                        <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Which AI is right for you?</p>
                      </div>
                      <div className="size-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                        <Zap className="w-6 h-6 text-[#25e2f4] fill-current" />
                      </div>
                    </div>

                    <div className="relative z-10 text-center space-y-6">
                      <motion.div 
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="size-40 bg-white rounded-[32px] mx-auto shadow-2xl flex items-center justify-center relative group"
                      >
                        <div className={`absolute inset-0 rounded-[32px] blur-2xl opacity-20 transition-opacity group-hover:opacity-40 ${
                          result.persona === 'chatgpt' ? 'bg-emerald-400' :
                          result.persona === 'copilot' ? 'bg-blue-500' :
                          result.persona === 'gemini' ? 'bg-indigo-500' :
                          'bg-orange-400'
                        }`}></div>
                        {result.persona === 'chatgpt' && <Sparkles className="w-20 h-20 text-emerald-500 relative z-10" />}
                        {result.persona === 'copilot' && <Zap className="w-20 h-20 text-blue-600 relative z-10" />}
                        {result.persona === 'gemini' && <Search className="w-20 h-20 text-indigo-600 relative z-10" />}
                        {result.persona === 'claude' && <Brain className="w-20 h-20 text-orange-500 relative z-10" />}
                      </motion.div>
                      
                      <div className="space-y-2">
                        <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-xs">Your AI Match is</p>
                        <h3 className={`text-6xl font-black tracking-tighter uppercase italic ${
                          result.persona === 'chatgpt' ? 'text-emerald-400' :
                          result.persona === 'copilot' ? 'text-blue-400' :
                          result.persona === 'gemini' ? 'text-indigo-400' :
                          'text-orange-400'
                        }`}>{result.name}</h3>
                      </div>
                    </div>

                    <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 text-center">
                      <p className="text-[#25e2f4] font-black text-xl mb-1 uppercase italic">{result.titleEn}</p>
                      <p className="text-white/80 font-bold text-lg">{result.titleTh}</p>
                    </div>
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="space-y-8">
                  <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black text-slate-900 uppercase italic">Why {result.name}?</h3>
                      <div className="space-y-2">
                        <p className="text-xl font-bold text-slate-700 leading-tight">{result.descriptionEn}</p>
                        <p className="text-lg font-medium text-slate-400">{result.descriptionTh}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-[#25e2f4] font-black text-xs uppercase tracking-widest mb-2">Top Skill</p>
                        <p className="text-xl font-black text-slate-900">{result.topSkill}</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-[#25e2f4] font-black text-xs uppercase tracking-widest mb-2">Best Tool</p>
                        <p className="text-xl font-black text-slate-900">{result.bestTool}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={downloadCard}
                      className="flex items-center justify-center gap-3 w-full py-6 bg-[#25e2f4] text-[#102122] font-black text-xl rounded-2xl shadow-xl shadow-[#25e2f4]/20 hover:brightness-105 transition-all cursor-pointer"
                    >
                      <Download className="w-6 h-6" />
                      DOWNLOAD IMAGE
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={shareResult}
                        className="flex items-center justify-center gap-3 py-5 bg-white border-2 border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        <Share2 className="w-5 h-5 text-[#25e2f4]" />
                        SHARE
                      </button>
                      <button 
                        onClick={startQuiz}
                        className="flex items-center justify-center gap-3 py-5 bg-white border-2 border-[#25e2f4] text-[#25e2f4] font-black rounded-2xl hover:bg-[#25e2f4]/5 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-5 h-5" />
                        REPLAY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header({ onBack }: { onBack?: () => void }) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#25e2f4]/10 px-6 md:px-20 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4 text-slate-900 cursor-pointer" onClick={() => onBack ? onBack() : window.location.reload()}>
        <div className="size-8 bg-[#25e2f4] rounded-lg flex items-center justify-center text-[#102122] shadow-lg shadow-[#25e2f4]/20">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <h2 className="text-xl font-extrabold leading-tight tracking-tight uppercase italic">AI QUIZ</h2>
      </div>
      <div className="flex flex-1 justify-end gap-4 items-center">
        {onBack ? (
          <button 
            onClick={onBack}
            className="flex items-center justify-center rounded-full size-10 bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <div className="hidden md:flex items-center gap-8 mr-4">
            <a className="text-sm font-bold text-slate-400 hover:text-[#25e2f4] transition-colors" href="#">Home</a>
            <a className="text-sm font-bold text-slate-400 hover:text-[#25e2f4] transition-colors" href="#">AI Directory</a>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-200/50 mt-auto bg-white/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-black text-slate-900 uppercase italic tracking-tighter">AI QUIZ FINDER</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">© 2024 All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a className="text-xs font-black text-slate-400 hover:text-[#25e2f4] transition-colors uppercase tracking-widest" href="#">Privacy</a>
          <a className="text-xs font-black text-slate-400 hover:text-[#25e2f4] transition-colors uppercase tracking-widest" href="#">Terms</a>
          <a className="text-xs font-black text-slate-400 hover:text-[#25e2f4] transition-colors uppercase tracking-widest" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function PersonaCard({ label, icon, img, color }: { label: string; icon: ReactNode; img: string; color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group flex flex-col gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#25e2f4]/50 transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      <div 
        className="w-full aspect-square bg-cover bg-center rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-transparent group-hover:border-white shadow-inner"
        style={{ backgroundImage: `url("${img}")` }}
      ></div>
      <div className="flex items-center justify-between px-1">
        <p className="text-slate-900 font-black uppercase italic tracking-tighter">{label}</p>
        <div className={`${color} group-hover:scale-110 transition-transform`}>{icon}</div>
      </div>
    </motion.div>
  );
}

