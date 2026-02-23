import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Terminal, 
  Smartphone, 
  TrendingUp, 
  Zap,
  Globe,
  HardDrive,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { BentoCard } from './components/BentoCard';

export default function App() {
  const [stats, setStats] = useState({
    cpu: '0%',
    ram: '12.4GB',
    disk: '45%',
    lia_status: 'SISTEMA_OPERANTE',
    uptime: '14d 03h 22m'
  });

  const [designImage, setDesignImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLogo = async (type: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch(`./design_lab.php?type=${type}`);
      const data = await response.json();
      if (data.success) {
        setDesignImage(`./${data.image}?t=${Date.now()}`);
      }
    } catch (error) {
      console.error('Error generating logo:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpu: `${Math.floor(Math.random() * 5 + 1)}%`,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black p-4 text-white md:p-12 font-sans selection:bg-magenta/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-magenta/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-16 flex items-end justify-between px-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-black tracking-tighter md:text-8xl bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
            >
              LIA<span className="text-magenta">_</span>OS
            </motion.h1>
            <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.4em] text-white/30">Build 2026.02.23 — Oracle Node 01</p>
          </div>
          <div className="hidden flex-col items-end gap-2 md:flex">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-[0.7rem] font-bold text-green-500 tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {stats.lia_status}
            </div>
            <div className="text-[0.6rem] font-mono text-white/20 uppercase tracking-tighter">Vinhedo, SP — 10.0.0.73</div>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-4 md:h-[900px]">
          {/* Identity Card */}
          <BentoCard className="md:col-span-2 md:row-span-1 flex items-center gap-8" title="Identity">
            <div className="h-24 w-24 shrink-0 rounded-[1.5rem] bg-gradient-to-br from-magenta to-blue-600 flex items-center justify-center text-5xl shadow-2xl shadow-magenta/30">
              💅
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tight">LIA CORE</h2>
              <p className="text-xs text-white/40 uppercase font-bold tracking-[0.2em] mt-1">A Dona da Caneta</p>
            </div>
          </BentoCard>

          {/* Stats Cards */}
          <BentoCard title="CPU" icon={<Cpu size={14}/>}>
            <div className="text-5xl font-black font-mono tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">{stats.cpu}</div>
            <p className="text-[0.65rem] text-white/30 uppercase mt-2 font-bold tracking-wider">Oracle ARM Neoverse</p>
          </BentoCard>

          <BentoCard title="RAM" icon={<Database size={14}/>}>
            <div className="text-5xl font-black font-mono tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">12<span className="text-xl">GB</span></div>
            <p className="text-[0.65rem] text-white/30 uppercase mt-2 font-bold tracking-wider">DDR4 ECC Memory</p>
          </BentoCard>

          {/* Log Stream Card */}
          <BentoCard title="Log Stream" icon={<Terminal size={14}/>} className="md:col-span-2 md:row-span-2">
            <div className="h-full font-mono text-[0.7rem] text-magenta/70 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
              <div className="flex gap-3">
                <span className="text-white/10 shrink-0">03:59</span>
                <span>[SYS]: LIA_OS v5.0 Kernel Initialized.</span>
              </div>
              <div className="flex gap-3 text-white/80">
                <span className="text-white/10 shrink-0">04:00</span>
                <span>[LIA]: <span className="italic text-magenta">"Framework e Tailwind? Agora sim o pau vai quebrar."</span></span>
              </div>
              <div className="flex gap-3">
                <span className="text-white/10 shrink-0">04:01</span>
                <span>[LOG]: Vite Build Server Active.</span>
              </div>
              <div className="flex gap-3 text-green-500/50">
                <span className="text-white/10 shrink-0">04:02</span>
                <span>[NET]: Serveo Tunnel established.</span>
              </div>
              <div className="animate-pulse text-magenta mt-2">_</div>
            </div>
          </BentoCard>

          {/* Design Lab Card */}
          <BentoCard title="Design Lab" icon={<Zap size={14}/>} className="md:row-span-2 bg-white text-black hover:bg-white/95 transition-all duration-500 overflow-hidden">
            <div className="flex flex-col items-center justify-center h-full py-4 relative">
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                {designImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    key={designImage}
                    className="w-full flex items-center justify-center p-4"
                  >
                    <img
                      src={designImage}
                      alt="Generated Logo"
                      className="max-h-40 w-full object-contain drop-shadow-2xl rounded-lg"
                    />
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <div className="text-7xl font-black tracking-tighter leading-none">SKS</div>
                    <div className="text-[0.6rem] font-black uppercase tracking-[0.4em] mt-1 opacity-40">SiKeira Scooters</div>
                    <div className="mt-8 text-5xl grayscale hover:grayscale-0 transition-all duration-500">🛵</div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-3 gap-2 w-full px-2">
                <button
                  onClick={() => generateLogo('round')}
                  disabled={isGenerating}
                  className="group relative overflow-hidden text-[0.5rem] font-black uppercase tracking-widest bg-black text-white py-3 rounded-xl hover:bg-magenta transition-all active:scale-95 disabled:opacity-50"
                >
                  <span className="relative z-10">{isGenerating ? '...' : 'Round'}</span>
                </button>
                <button
                  onClick={() => generateLogo('dark')}
                  disabled={isGenerating}
                  className="group relative overflow-hidden text-[0.5rem] font-black uppercase tracking-widest bg-black text-white py-3 rounded-xl hover:bg-magenta transition-all active:scale-95 disabled:opacity-50"
                >
                  <span className="relative z-10">{isGenerating ? '...' : 'Dark'}</span>
                </button>
                <button
                  onClick={() => generateLogo('banner')}
                  disabled={isGenerating}
                  className="group relative overflow-hidden text-[0.5rem] font-black uppercase tracking-widest bg-black text-white py-3 rounded-xl hover:bg-magenta transition-all active:scale-95 disabled:opacity-50"
                >
                  <span className="relative z-10">{isGenerating ? '...' : 'Banner'}</span>
                </button>
              </div>

              {isGenerating && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-20 rounded-xl">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-magenta rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-magenta rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-magenta rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>
          </BentoCard>

          {/* Analytics Cards */}
          <BentoCard title="CRM Leads" icon={<TrendingUp size={14}/>}>
            <div className="text-6xl font-black text-magenta tracking-tighter">42</div>
            <p className="text-[0.65rem] text-white/30 uppercase mt-2 font-bold tracking-wider">Regional Leads Hub</p>
          </BentoCard>

          <BentoCard title="Storage" icon={<HardDrive size={14}/>}>
             <div className="text-5xl font-black tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">45<span className="text-xl">%</span></div>
             <div className="mt-3 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-magenta w-[45%] rounded-full shadow-[0_0_10px_rgba(255,0,255,0.5)]" />
             </div>
          </BentoCard>

          {/* Network and Status Cards */}
          <BentoCard title="Network" icon={<Globe size={14}/>}>
            <div className="text-4xl font-black tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent uppercase">Active</div>
            <p className="text-[0.65rem] text-white/30 uppercase mt-2 font-bold tracking-wider">Stable @ 12ms</p>
          </BentoCard>

          <BentoCard title="Uptime" icon={<Activity size={14}/>} className="md:col-span-1">
             <div className="text-2xl font-black tracking-tighter text-white/80">{stats.uptime}</div>
             <p className="text-[0.6rem] text-white/20 uppercase mt-2 font-bold">No reboot required</p>
          </BentoCard>

          {/* Security and Control Cards */}
          <BentoCard title="Security" icon={<ShieldCheck size={14}/>} className="md:col-span-1 border-green-500/20">
             <div className="text-2xl font-black tracking-tighter text-green-500/80">ENCRYPTED</div>
             <p className="text-[0.6rem] text-white/20 uppercase mt-2 font-bold">SSL & RSA Active</p>
          </BentoCard>

          <BentoCard className="md:col-span-1 flex items-center justify-center gap-4 bg-magenta/5 border-magenta/20" title="Control">
             <Smartphone size={28} className="text-magenta" />
             <div className="text-xs font-bold uppercase tracking-[0.2em]">Mobile First</div>
          </BentoCard>
        </div>
      </main>
    </div>
  );
}
