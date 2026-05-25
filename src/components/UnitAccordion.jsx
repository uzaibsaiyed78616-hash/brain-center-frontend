import React, { useState } from 'react';
import { FaChevronDown, FaPlayCircle, FaFilePdf, FaMusic, FaDownload, FaEye, FaTimes, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const UnitAccordion = ({ unit, completedIds = [], onResourceClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);

  // Fallback check agar unit object missing ho
  if (!unit) return null;

  const handleAction = (res) => {
    onResourceClick(res.url);
    
    if (res.type === 'pdf' || res.type === 'googleForm') {
      window.open(res.url, '_blank');
    } else {
      setActiveMedia(activeMedia === res.url ? null : res.url);
    }
  };

  const handleDownload = async (url, filename) => {
    onResourceClick(url);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'video': return <FaPlayCircle className="text-indigo-500" size={20} />;
      case 'audio': return <FaMusic className="text-amber-500" size={20} />;
      case 'googleForm': return <FaExternalLinkAlt className="text-emerald-500" size={20} />;
      default: return <FaFilePdf className="text-rose-500" size={20} />;
    }
  };

  return (
    <div className={`mb-6 rounded-[2.5rem] border-2 transition-all duration-300 ${isOpen ? 'bg-white border-indigo-100 shadow-2xl' : 'bg-white/60 border-transparent shadow-sm'}`}>
      {/* Accordion Header */}
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-8 flex items-center justify-between outline-none">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-100">
            {unit.unitNumber}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">{unit.title}</h3>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">Resources Ready</p>
          </div>
        </div>
        <FaChevronDown className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-300'}`} />
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <div className="px-8 pb-10 space-y-4">
              {unit.resources && unit.resources.length > 0 ? (
                unit.resources.map((res, i) => {
                  const isDone = completedIds.includes(res.url);
                  return (
                    <div key={i} className={`flex flex-col gap-4 p-5 rounded-[1.8rem] border-2 transition-all ${isDone ? 'bg-indigo-50/30 border-indigo-100' : 'bg-slate-50 border-transparent hover:bg-white hover:border-indigo-50 hover:shadow-md'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-xl shadow-sm relative">
                             {getIcon(res.type)}
                             {isDone && <FaCheckCircle className="absolute -top-1 -right-1 text-emerald-500 bg-white rounded-full shadow-sm" size={14} />}
                          </div>
                          <div>
                            <p className={`font-black text-sm ${isDone ? 'text-indigo-900' : 'text-slate-800'}`}>{res.title}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{res.type}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {res.type === 'googleForm' ? (
                            <button onClick={() => handleAction(res)} className="px-6 py-2 bg-emerald-500 text-white rounded-full font-black text-[10px] shadow-md hover:bg-emerald-600 active:scale-95 transition-all">
                               {isDone ? 'RETAKE ' : 'START'}
                            </button>
                          ) : (
                            <>
                               <button 
                                 onClick={() => handleAction(res)} 
                                 className={`p-3 rounded-full shadow-sm transition-all ${activeMedia === res.url ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 hover:text-indigo-600'}`}
                               >
                                 {activeMedia === res.url ? <FaTimes size={14} /> : <FaEye size={14} />}
                               </button>
                               <button 
                                 onClick={() => handleDownload(res.url, res.title)} 
                                 className="p-3 bg-slate-900 text-white rounded-full hover:bg-indigo-600 transition-all shadow-sm active:scale-90"
                               >
                                 <FaDownload size={12} />
                               </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Media Preview (Video/Audio) */}
                      {activeMedia === res.url && (
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-2 p-4 bg-white rounded-2xl border-2 border-indigo-50 shadow-inner">
                            {res.type === 'video' ? (
                              <video controls className="w-full rounded-xl" src={res.url} autoPlay />
                            ) : (
                              <audio controls className="w-full" src={res.url} autoPlay />
                            )}
                        </motion.div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-10 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No resources uploaded yet</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnitAccordion;