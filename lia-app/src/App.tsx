import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Terminal, 
  Smartphone, 
  TrendingUp, 
  Zap,
  Globe
} from 'lucide-react';
import { BentoCard } from './components/BentoCard';

export default function App() {
  const [stats, setStats] = useState({ cpu: '0%', ram: '0%', disk: '0%', lia_status: 'Iniciando sistema... 💅' });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpu: `${Math.floor(Math.random() * 5 + 1)}%`,
        ram: '12.4GB',
        disk: '45%',
        lia_status: 'Monitorando servidor... 💅'
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black p-4 text-white md:p-8">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-magenta/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-12 flex items-end justify-between px-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-black tracking-tighter md:text-7xl"
            >
              LIA<span className="text-magenta">_</span>OS
            </motion.h1>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">Build 2026.02.23 — Oracle Node 01</p>
          </div>
          <div className="hidden flex-col items-end gap-1 md:flex">
            <div className="flex items-center gap-2 text-xs font-bold text-green-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              SISTEMA_OPERANTE
            </div>
            <div className="text-[0.6rem] text-white/20">Vinhedo, SP — 10.0.0.73</div>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-4 md:h-[800px]">
          {/* Identity */}
          <BentoCard className="md:col-span-2 md:row-span-1 flex items-center gap-6" title="Identity">
            <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-magenta to-blue-600 flex items-center justify-center text-4xl shadow-lg shadow-magenta/20">
              💅
            </div>
            <div>
              <h2 className="text-2xl font-black italic">LIA CORE</h2>
              <p className="text-xs text-white/40 uppercase font-bold tracking-widest">A Dona da Caneta</p>
            </div>
          </BentoCard>

          {/* Stats */}
          <BentoCard title="CPU" icon={<Cpu size={12}/>}>
            <div className="text-4xl font-black font-mono tracking-tighter">{stats.cpu}</div>
            <p className="text-[0.6rem] text-white/30 uppercase mt-1">Oracle ARM Neoverse</p>
          </BentoCard>

          <BentoCard title="RAM" icon={<Database size={12}/>}>
            <div className="text-4xl font-black font-mono tracking-tighter">12<span className="text-lg">GB</span></div>
            <p className="text-[0.6rem] text-white/30 uppercase mt-1">DDR4 ECC Memory</p>
          </BentoCard>

          {/* Log / Terminal */}
          <BentoCard title="Log Stream" icon={<Terminal size={12}/>} className="md:col-span-2 md:row-span-2">
            <div className="h-full font-mono text-xs text-magenta/80 overflow-y-auto space-y-2">
              <div className="flex gap-2">
                <span className="text-white/20">03:59</span>
                <span>[SYS]: LIA_OS v5.0 Kernel Initialized.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-white/20">04:00</span>
                <span>[LIA]: "Framework e Tailwind? Agora sim o pau vai quebrar."</span>
              </div>
              <div className="flex gap-2">
                <span className="text-white/20">04:01</span>
                <span>[LOG]: Vite Build Server Active.</span>
              </div>
              <div className="animate-pulse text-magenta">_</div>
            </div>
          </BentoCard>

          {/* SiKeira Branding */}
          <BentoCard title="Design Lab" icon={<Zap size={12}/>} className="md:row-span-2 bg-white text-black hover:shadow-white/10">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-6xl font-black tracking-tighter">SKS</div>
              <div className="text-[0.5rem] font-black uppercase tracking-[0.3em] -mt-1">SiKeira Scooters</div>
              <div className="mt-4 text-3xl">🛵</div>
            </div>
          </BentoCard>

          {/* CRM / Metrics */}
          <BentoCard title="CRM Leads" icon={<TrendingUp size={12}/>}>
            <div className="text-5xl font-black text-magenta">42</div>
            <p className="text-[0.6rem] text-white/30 uppercase mt-1">Regional Leads Hub</p>
          </BentoCard>

          <BentoCard title="Network" icon={<Globe size={12}/>}>
            <div className="text-4xl font-black tracking-tighter">STABLE</div>
            <p className="text-[0.6rem] text-white/30 uppercase mt-1">Serveo Tunnel Active</p>
          </BentoCard>

          <BentoCard className="md:col-span-1 flex items-center justify-center gap-4 bg-magenta/5 border-magenta/20" title="Control">
             <Smartphone size={24} className="text-magenta" />
             <div className="text-xs font-bold uppercase tracking-widest">Mobile_First</div>
          </BentoCard>
        </div>
      </main>
    </div>
  );
}
