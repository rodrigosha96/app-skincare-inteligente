'use client';

import { Sparkles, TrendingUp } from 'lucide-react';

interface SkinIDCardProps {
  skinID: {
    code: string;
    description: string;
    influencingFactors: string[];
    createdAt: string;
  };
}

export default function SkinIDCard({ skinID }: SkinIDCardProps) {
  return (
    <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium text-rose-100">
                Seu Skin ID
              </span>
            </div>
            <div className="text-4xl font-bold mb-2">
              {skinID.code}
            </div>
          </div>
          
          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            Ativo
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-lg font-medium text-rose-50 leading-relaxed">
            {skinID.description}
          </p>
        </div>

        {/* Influencing Factors */}
        {skinID.influencingFactors && skinID.influencingFactors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-rose-100 mb-3">
              <TrendingUp className="w-4 h-4" />
              Fatores que influenciam sua pele:
            </div>
            <div className="flex flex-wrap gap-2">
              {skinID.influencingFactors.map((factor, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Created Date */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm text-rose-100">
            Criado em {new Date(skinID.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
    </div>
  );
}
