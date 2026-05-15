/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  HardHat, 
  Calculator, 
  ExternalLink,
  Clock,
  FileText,
  Wallet,
  Table,
  TableProperties,
  Wrench,
  ArrowLeft,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import logoImg from './assets/logo.png';
import backgroundJPG from './assets/fondo.png';
import ollaImg from './assets/olla.png';

// Fallback logic using Base64 generated files
import { logoBase64 } from './assets/logoBase64';
import { fondoBase64 } from './assets/fondoBase64';
import { ollaBase64 } from './assets/ollaBase64';
import { favBase64 } from './assets/favBase64';

const ConcreteMixerIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M22 15V17C22 17.5523 21.5523 18 21 18H19.0822C18.8354 16.8647 17.8344 16 16.6324 16C15.4305 16 14.4294 16.8647 14.1826 18H9.75704C9.51019 16.8647 8.50917 16 7.30723 16C6.10529 16 5.10427 16.8647 4.85742 18H3C2.44772 18 2 17.5523 2 17V15C2 14.4477 2.44772 14 3 14H4.07255L6.19532 10.1989C6.4357 9.7709 6.8837 9.5 7.3718 9.5H10.5186L9.60835 4.41727C9.50854 3.84439 9.94723 3.32135 10.5284 3.32135H16.3571C16.8778 3.32135 17.3197 3.70275 17.3995 4.21855L18.4905 9.5H19.6429C20.4713 9.5 21.1429 10.1716 21.1429 11V13H21C21.5523 13 22 13.4477 22 14V15ZM6.57143 18C7.12371 18 7.57143 17.5523 7.57143 17C7.57143 16.4477 7.12371 16 6.57143 16C6.01914 16 5.57143 16.4477 5.57143 17C5.57143 17.5523 6.01914 18 6.57143 18ZM16.5714 18C17.1237 18 17.5714 17.5523 17.5714 17C17.5714 16.4477 17.1237 16 16.5714 16C16.0191 16 15.5714 16.4477 15.5714 17C15.5714 17.5523 16.0191 18 16.5714 18ZM16.0714 9.5H8.71429L9.64286 4.32135H15.1429L16.0714 9.5Z" />
  </svg>
);

const OllaIcon = (props: any) => (
  <img src={ollaBase64 || ollaImg} alt="Olla Icon" className={props.className} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
);

interface SubModule {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  link: string;
}

interface MainModule {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  subModules: SubModule[];
}

const MODULES_DATA: MainModule[] = [
  {
    id: 'obra',
    name: 'OBRA',
    icon: HardHat,
    color: '#D97706',
    subModules: [
      {
        id: 'destajos-pagos',
        name: 'DESTAJOS PAGOS',
        icon: Wallet,
        color: '#D97706',
        link: 'https://pagardestajistas-production.up.railway.app/'
      },
      {
        id: 'control-maquinaria',
        name: 'CONTROL MAQUINARIA',
        icon: Wrench,
        color: '#2563EB', // Blue
        link: 'https://control-unidades-cardenas-production.up.railway.app/'
      },
      {
        id: 'destajos-tablas',
        name: 'DESTAJOS TABLAS',
        icon: Table,
        color: '#6B7280', // Gray
        link: 'https://tableronuevodestajo-production.up.railway.app/'
      },
      {
        id: 'gestion-concretos',
        name: 'GESTION CONCRETOS',
        icon: OllaIcon,
        color: '#0891B2', // Cyan
        link: 'https://gestionconcretofine-production.up.railway.app/'
      }
    ]
  },
  {
    id: 'administracion',
    name: 'ADMINISTRACION',
    icon: Calculator,
    color: '#059669',
    subModules: [
      {
        id: 'horas-extras',
        name: 'HORAS EXTRAS',
        icon: Clock,
        color: '#059669', // Emerald
        link: 'https://horas-extras-production-8fc9.up.railway.app/'
      },
      {
        id: 'pruebas-laboratorio',
        name: 'PRUEBAS LABORATORIO',
        icon: TableProperties,
        color: '#2563EB', // Blue
        link: 'https://analizador-de-concreto-production-0a16.up.railway.app/'
      },
      {
        id: 'actas-pro-cloud',
        name: 'ACTAS PRO CLOUD',
        icon: FileText,
        color: '#7C3AED', // Violet
        link: 'https://actas1-production.up.railway.app/'
      },
      {
        id: 'vales-suministro',
        name: 'VALES SUMINISTRO',
        icon: FileText,
        color: '#EA580C', // Orange
        link: 'https://vales-suministro-production.up.railway.app/'
      }
    ]
  }
];

export default function App() {
  const [activeModule, setActiveModule] = React.useState<MainModule | null>(null);
  const [showCredits, setShowCredits] = React.useState(false);

  // Close credits when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCredits && !(event.target as HTMLElement).closest('.credits-trigger')) {
        setShowCredits(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCredits]);

  // Inject favicon dynamically to ensure it works in production
  React.useEffect(() => {
    if (favBase64) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.type = 'image/png';
      link.href = favBase64;
    }
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-900 flex flex-col items-center pt-10 md:pt-16 px-4 overflow-x-hidden relative">
      {/* Background Image Container */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url("${fondoBase64 || backgroundJPG}")` }}
      ></div>
      
      {/* Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-12 md:mb-20 z-10"
      >
        <img 
          src={logoBase64 || logoImg} 
          alt="Portal Pomoca Logo" 
          className="w-full max-w-[450px] h-auto object-contain"
        />
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mb-[100px] z-10">
        <AnimatePresence mode="wait">
          {!activeModule ? (
            /* Main Menu */
            <motion.div 
              key="main-menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="relative p-10 md:p-16 bg-white/10 backdrop-blur-md rounded-[4rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-wrap justify-center gap-12 md:gap-24 w-auto max-w-[95vw]"
            >
              {MODULES_DATA.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module)}
                  className="flex flex-col items-center group cursor-pointer outline-none"
                >
                  <motion.div 
                    whileHover={{ y: -15, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 1500, damping: 40, mass: 0.8 }}
                    className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 flex items-center justify-center rounded-[2rem] transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden"
                    style={{ backgroundColor: module.color }}
                  >
                    <module.icon className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white" strokeWidth={1} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <span className="mt-8 text-xl md:text-2xl font-black text-gray-800 text-center tracking-tight group-hover:text-blue-600 transition-colors uppercase">
                    {module.name}
                  </span>
                </button>
              ))}
            </motion.div>
          ) : (
            /* Sub-modules View - ENHANCED */
            <motion.div 
              key="sub-menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              {/* Header with Back Button (Left) and Title (Center) */}
              <div className="relative flex flex-col md:flex-row items-center justify-center mb-20 w-full max-w-6xl px-6 min-h-[80px] gap-6 md:gap-0">
                <div className="md:absolute md:left-6">
                  <button 
                    onClick={() => setActiveModule(null)}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-all text-gray-500 hover:text-gray-900 border border-white/20 shadow-sm ml-10"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="font-black uppercase tracking-widest text-[10px]">REGRESAR</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: activeModule.color }}
                  >
                    <activeModule.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase text-center">
                    {activeModule.name}
                  </h2>
                </div>
              </div>

              {/* Sub-modules Grid */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-6">
                {activeModule.subModules.map((sub, idx) => (
                  <motion.a
                    key={sub.id}
                    href={sub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.3, y: 60 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: idx * 0.08 
                      } 
                    }}
                    className="flex flex-col items-center group cursor-pointer outline-none"
                  >
                    {/* White Card Container */}
                    <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white/40 backdrop-blur-sm rounded-[3rem] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-white/50 flex items-center justify-center transition-all duration-500 group-hover:bg-white/70 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)]">
                      {/* Inner Colored Icon Container */}
                      <motion.div 
                        whileHover={{ y: -8, scale: 1.05 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 1000, 
                          damping: 35 
                        }}
                        className="w-full h-full flex items-center justify-center rounded-[2.5rem] relative overflow-hidden shadow-lg"
                        style={{ backgroundColor: sub.color }}
                      >
                        <sub.icon className="w-16 h-16 sm:w-20 sm:h-20 text-white relative z-10" strokeWidth={1} />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      </motion.div>
                    </div>

                    {/* Text Content */}
                    <span className="mt-8 text-xs sm:text-base font-bold text-[#1f2937] text-center tracking-tight group-hover:text-blue-700 transition-colors uppercase max-w-[150px] leading-tight">
                      {sub.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Credits Area */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 text-gray-600 font-bold text-sm tracking-tight">
        <span>© 2026 POMOCA | Creditos:</span>
        <div className="relative credits-trigger">
          <button 
            onClick={() => setShowCredits(!showCredits)}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-600/10 hover:bg-gray-600/20 transition-all text-gray-600 outline-none"
          >
            <Info className="w-4 h-4" />
          </button>
          
          {/* Tooltip Content */}
          <AnimatePresence>
            {showCredits && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-0 mb-3 w-[280px] z-50 overflow-visible"
              >
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl">
                  <div className="space-y-3">
                    {[
                      "Ing. Alejandro Ricardo Hidalgo Lopez",
                      "Ing. Armando Lopez Arrazola",
                      "Ing. Antony Emanuel Calderon Cruz",
                      "Ing. Lucio Hernandez Dominguez",
                      "Ing. Jorge Luis Gomez Bravo"
                    ].map((name, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span className="text-white text-xs font-semibold leading-tight">{name}</span>
                      </div>
                    ))}
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-2.5 -mt-px border-8 border-transparent border-t-black/80" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
