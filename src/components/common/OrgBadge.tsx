import React from 'react';
import { Terminal, ShieldCheck, Film, RefreshCw, Sparkles } from 'lucide-react';

interface OrgBadgeProps {
  type: 'code' | 'shield' | 'media' | 'loop' | 'custom';
  acronym?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OrgBadge: React.FC<OrgBadgeProps> = ({ type, acronym = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-base'
  }[size];

  if (type === 'code') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <Terminal className="w-5 h-5 text-amber-500" />
        </div>
        <div className="flex flex-col">
          <span className="font-tech font-bold text-amber-400 tracking-wider text-xs">CODE GEEKS</span>
          <span className="text-[10px] text-amber-200/60 font-mono">EST. 2021 // SOC</span>
        </div>
      </div>
    );
  }

  if (type === 'shield') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center p-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
          <ShieldCheck className="w-5 h-5 text-orange-500" />
        </div>
        <div className="flex flex-col">
          <span className="font-tech font-bold text-orange-400 tracking-wider text-xs">CSIA SECURITY</span>
          <span className="text-[10px] text-orange-200/60 font-mono">SOC CYBER ALLIANCE</span>
        </div>
      </div>
    );
  }

  if (type === 'media') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center p-2 rounded-lg bg-amber-600/10 border border-amber-600/30">
          <Film className="w-5 h-5 text-amber-500" />
        </div>
        <div className="flex flex-col">
          <span className="font-tech font-bold text-amber-400 tracking-wider text-xs">MAFIA ARTISTS</span>
          <span className="text-[10px] text-amber-200/60 font-mono">CREATIVE GUILD</span>
        </div>
      </div>
    );
  }

  if (type === 'loop') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex flex-col">
          <span className="font-tech font-bold text-cyan-400 tracking-wider text-xs">LOOP HAU</span>
          <span className="text-[10px] text-cyan-200/60 font-mono">TECHNICAL NETWORK</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center p-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
        <Sparkles className="w-5 h-5 text-orange-400" />
      </div>
      <span className="font-tech font-bold text-orange-400 tracking-wider text-xs">{acronym || 'ORGANIZATION'}</span>
    </div>
  );
};
