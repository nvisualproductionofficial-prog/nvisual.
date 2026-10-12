import React, { useState } from 'react';
import {
  Film,
  Play,
  X,
  ExternalLink,
  Sparkles,
  Camera,
  Clock,
  Layers,
  Info
} from 'lucide-react';
import { INITIAL_PORTFOLIO } from '../data/initialData';
import { PortfolioItem } from '../types';

export const PortfolioView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioItem | null>(null);

  const categories = [
    'Semua',
    'Sekolah',
    'Event',
    'Company Profile',
    'Komersial',
    'Film Pendek',
    'Dokumenter'
  ];

  const filteredProjects = selectedCategory === 'Semua'
    ? INITIAL_PORTFOLIO
    : INITIAL_PORTFOLIO.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
          Katalog Karya & Showreel
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Galeri Sinematik NVISUAL
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Eksplorasi estetika visual, tata pencahayaan dramatis, dan kekuatan penceritaan kami.
        </p>

        {/* Mandatory Transparency Disclaimer */}
        <div className="p-3 bg-[#13141d] border border-[#262838] rounded-md text-xs text-zinc-300 flex items-start gap-2.5 mt-4">
          <Info className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px] text-zinc-400">
            <strong className="text-[#d4af37]">Pemberitahuan Transparansi Klien:</strong> Karya pada halaman ini saat ini disajikan sebagai <strong>portofolio contoh / demonstrasi acuan gaya estetika visual</strong> dan bukan hasil produksi komersial resmi yang mengikat NVISUAL. Seluruh aset dapat diperbarui seiring berjalannya proyek produksi aktif.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                : 'bg-[#111219] text-zinc-400 hover:text-white hover:bg-[#181924] border border-[#1f212f]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cinematic Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0f1016] border border-[#1d1f2b] rounded-lg overflow-hidden hover:border-[#d4af37]/60 transition-all flex flex-col justify-between group shadow-xl"
          >
            {/* Poster with 16:9 Cinema Aspect Ratio */}
            <div
              onClick={() => setActiveModalProject(project)}
              className="relative aspect-16/9 bg-[#08090d] overflow-hidden cursor-pointer group"
            >
              <img
                src={project.posterImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1016] via-transparent to-transparent opacity-80" />
              
              {/* Overlay badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/85 text-[#d4af37] border border-[#d4af37]/30 rounded">
                  {project.category}
                </span>
                {project.isDemoPlaceholder && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-500/30 rounded backdrop-blur-sm">
                    Sampel Contoh
                  </span>
                )}
              </div>

              {project.runtime && (
                <div className="absolute bottom-3 right-3 text-[10px] font-medium px-2 py-0.5 bg-black/80 text-zinc-300 rounded border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#d4af37]" />
                  <span>{project.runtime}</span>
                </div>
              )}

              {/* Play Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-black ml-0.5" />
                </div>
              </div>
            </div>

            {/* Description Card Content */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>{project.clientOrContext}</span>
                  <span>Tahun {project.year}</span>
                </div>
                <h3
                  onClick={() => setActiveModalProject(project)}
                  className="text-base font-bold text-white group-hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {project.synopsis}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="pt-3 border-t border-[#1a1b24] space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 bg-[#14151e] border border-[#222432] text-zinc-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="w-full py-2 rounded text-xs font-semibold bg-[#161722] hover:bg-[#20222f] text-zinc-200 border border-[#292c3c] hover:border-[#d4af37]/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3 h-3 text-[#d4af37]" />
                  <span>Preview Proyek</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Project Video / Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#101117] border border-[#252737] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white bg-[#191a24] border border-[#2c2f42] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player or Poster Showcase */}
            <div className="relative aspect-16/9 bg-black border-b border-[#252737]">
              {activeModalProject.videoUrl ? (
                <iframe
                  src={activeModalProject.videoUrl}
                  title={activeModalProject.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={activeModalProject.posterImage}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-[#d4af37]">
                    {activeModalProject.category}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs text-zinc-400">
                    Tahun {activeModalProject.year}
                  </span>
                  {activeModalProject.isDemoPlaceholder && (
                    <span className="text-[10px] text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded bg-amber-950/40">
                      Sampel Portofolio
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs text-zinc-400">
                  Klien / Konteks: {activeModalProject.clientOrContext}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Sinopsis Proyek
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {activeModalProject.synopsis}
                </p>
              </div>

              {/* Gear Used */}
              {activeModalProject.gearUsed && (
                <div className="p-4 rounded bg-[#151620] border border-[#242636] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] block">
                    Peralatan & Perangkat Lunak Produksi:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
                    {activeModalProject.gearUsed.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#1a1c28] border border-[#2a2d3e] rounded"
                      >
                        🎥 {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#202230] flex justify-end">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-6 py-2.5 rounded text-xs font-semibold bg-[#1a1c28] hover:bg-[#25283a] text-white border border-[#2b2e40] transition-colors"
                >
                  Tutup Tampilan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
