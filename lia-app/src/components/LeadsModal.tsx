import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Lead {
  id: number;
  nome: string;
  cidade: string;
  status_site: string;
  telefone: string;
  mensagem: string;
}

interface LeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadsModal = ({ isOpen, onClose }: LeadsModalProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'Sem Site Oficial' | 'Possui Site'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('./api.php?action=leads')
        .then(res => res.json())
        .then(data => {
          setLeads(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching leads:", err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  const filteredLeads = leads.filter(lead =>
    filter === 'all' ? true : lead.status_site === filter
  );

  const handleWhatsApp = (telefone: string, mensagem: string) => {
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0b] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 p-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white">Codemakers CRM</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 mt-1">Gestão de Leads Saúde</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 p-8 pb-4">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  "px-4 py-2 rounded-full text-[0.6rem] font-black uppercase tracking-widest transition-all",
                  filter === 'all' ? "bg-magenta text-white shadow-[0_0_20px_rgba(255,0,255,0.3)]" : "bg-white/5 text-white/40 hover:bg-white/10"
                )}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('Sem Site Oficial')}
                className={cn(
                  "px-4 py-2 rounded-full text-[0.6rem] font-black uppercase tracking-widest transition-all",
                  filter === 'Sem Site Oficial' ? "bg-magenta text-white shadow-[0_0_20px_rgba(255,0,255,0.3)]" : "bg-white/5 text-white/40 hover:bg-white/10"
                )}
              >
                Sem Site
              </button>
              <button
                onClick={() => setFilter('Possui Site')}
                className={cn(
                  "px-4 py-2 rounded-full text-[0.6rem] font-black uppercase tracking-widest transition-all",
                  filter === 'Possui Site' ? "bg-magenta text-white shadow-[0_0_20px_rgba(255,0,255,0.3)]" : "bg-white/5 text-white/40 hover:bg-white/10"
                )}
              >
                Possui Site
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto p-8 pt-4 scrollbar-hide">
              {loading ? (
                <div className="flex h-40 items-center justify-center text-white/20 uppercase tracking-widest font-bold">Carregando leads...</div>
              ) : (
                <div className="grid gap-4">
                  {filteredLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-magenta/30 hover:bg-white/[0.04]"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-lg font-bold text-white group-hover:text-magenta transition-colors leading-tight">{lead.nome}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-[0.65rem] text-white/30 uppercase font-bold tracking-wider">{lead.cidade}</span>
                          <span className={cn(
                            "text-[0.6rem] font-black uppercase px-2 py-0.5 rounded-md",
                            lead.status_site === 'Sem Site Oficial' ? "bg-orange-500/10 text-orange-500" : "bg-green-500/10 text-green-500"
                          )}>
                            {lead.status_site}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleWhatsApp(lead.telefone, lead.mensagem)}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-magenta px-6 py-3 text-sm font-black text-white shadow-lg shadow-magenta/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                      >
                        <MessageCircle size={18} />
                        ENVIAR PROPOSTA
                      </button>
                    </div>
                  ))}
                  {filteredLeads.length === 0 && (
                    <div className="flex h-40 items-center justify-center text-white/20 uppercase tracking-widest font-bold border border-dashed border-white/10 rounded-3xl">Nenhum lead encontrado</div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Thoughts */}
            <div className="border-t border-white/5 bg-white/[0.02] p-8">
               <div className="flex items-start gap-4">
                  <span className="text-2xl">💅</span>
                  <div>
                    <h4 className="text-[0.7rem] font-bold uppercase tracking-widest text-magenta mb-1">Lia Thoughts_</h4>
                    <p className="text-sm italic text-white/40 leading-relaxed">
                      "Márcio, filtrei os que não possuem site oficial. Esses são o 'filé mignon' para a Codemakers. Os botões já estão com as propostas prontas."
                    </p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
