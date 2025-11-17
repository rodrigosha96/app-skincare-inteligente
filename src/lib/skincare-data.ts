// DermaFlow - Dados de Referência Biomédica

import { QuestionStep } from './types';

export const FITZPATRICK_TYPES = [
  {
    type: 'I',
    name: 'Tipo I',
    description: 'Pele muito clara, sempre queima, nunca bronzeia',
    characteristics: 'Cabelos loiros/ruivos, olhos claros, sardas',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    type: 'II',
    name: 'Tipo II',
    description: 'Pele clara, queima facilmente, bronzeia pouco',
    characteristics: 'Cabelos loiros/castanhos claros, olhos claros',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
  },
  {
    type: 'III',
    name: 'Tipo III',
    description: 'Pele morena clara, queima moderadamente, bronzeia gradualmente',
    characteristics: 'Cabelos castanhos, olhos castanhos',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop'
  },
  {
    type: 'IV',
    name: 'Tipo IV',
    description: 'Pele morena, queima pouco, bronzeia facilmente',
    characteristics: 'Cabelos castanhos escuros, olhos escuros',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop'
  },
  {
    type: 'V',
    name: 'Tipo V',
    description: 'Pele morena escura, raramente queima, bronzeia muito',
    characteristics: 'Cabelos pretos, olhos escuros',
    image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop'
  },
  {
    type: 'VI',
    name: 'Tipo VI',
    description: 'Pele negra, nunca queima, altamente pigmentada',
    characteristics: 'Cabelos pretos, olhos escuros',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop'
  }
];

export const SKIN_CONCERNS = [
  { id: 'acne', name: 'Acne', icon: '🔴' },
  { id: 'manchas', name: 'Manchas', icon: '🟤' },
  { id: 'rugas', name: 'Rugas e linhas', icon: '📏' },
  { id: 'poros', name: 'Poros dilatados', icon: '⚫' },
  { id: 'textura', name: 'Textura irregular', icon: '🔷' },
  { id: 'ressecamento', name: 'Ressecamento', icon: '💧' },
  { id: 'oleosidade', name: 'Oleosidade excessiva', icon: '✨' },
  { id: 'sensibilidade', name: 'Sensibilidade', icon: '🌸' },
  { id: 'flacidez', name: 'Flacidez', icon: '⬇️' },
  { id: 'olheiras', name: 'Olheiras', icon: '👁️' }
];

export const ONBOARDING_QUESTIONS: QuestionStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vinda ao DermaFlow',
    subtitle: 'Vamos conhecer sua pele de forma profunda e científica. Leva apenas 5 minutos.',
    type: 'text',
    required: false
  },
  {
    id: 'skin-type',
    title: 'Qual é o seu tipo de pele?',
    subtitle: 'Observe como sua pele se comporta naturalmente, sem produtos',
    type: 'visual',
    options: [
      {
        value: 'seca',
        label: 'Seca',
        description: 'Sensação de repuxamento, descamação, poros finos',
        image: '🏜️'
      },
      {
        value: 'normal',
        label: 'Normal',
        description: 'Equilibrada, sem brilho excessivo ou ressecamento',
        image: '✨'
      },
      {
        value: 'mista',
        label: 'Mista',
        description: 'Zona T oleosa (testa, nariz, queixo) e bochechas normais/secas',
        image: '🎭'
      },
      {
        value: 'oleosa',
        label: 'Oleosa',
        description: 'Brilho em todo o rosto, poros dilatados, maquiagem não fixa',
        image: '💎'
      }
    ],
    educationalNote: 'Dica: Lave o rosto e aguarde 1h sem aplicar nada. Como sua pele se sente?',
    required: true
  },
  {
    id: 'fitzpatrick',
    title: 'Qual é o seu fototipo?',
    subtitle: 'Isso nos ajuda a entender como sua pele reage ao sol e a certos ativos',
    type: 'visual',
    options: FITZPATRICK_TYPES.map(ft => ({
      value: ft.type,
      label: ft.name,
      description: ft.description,
      image: ft.image
    })),
    educationalNote: 'O fototipo Fitzpatrick é uma classificação científica usada por dermatologistas mundialmente.',
    required: true
  },
  {
    id: 'sensitivity',
    title: 'Sua pele é sensível?',
    subtitle: 'A maioria das mulheres confunde sensibilidade com irritação. Veja a diferença:',
    type: 'single',
    options: [
      {
        value: 'baixa',
        label: 'Não é sensível',
        description: 'Tolera bem a maioria dos produtos e ativos'
      },
      {
        value: 'moderada',
        label: 'Moderadamente sensível',
        description: 'Alguns produtos causam vermelhidão ou ardência leve'
      },
      {
        value: 'alta',
        label: 'Muito sensível',
        description: 'Reage facilmente com vermelhidão, coceira ou ardência'
      }
    ],
    educationalNote: 'Pele sensível reage facilmente. Irritação é uma resposta temporária a um produto específico.',
    required: true
  },
  {
    id: 'concerns',
    title: 'Quais são suas principais preocupações?',
    subtitle: 'Selecione todas que se aplicam',
    type: 'multiple',
    options: SKIN_CONCERNS.map(c => ({
      value: c.id,
      label: `${c.icon} ${c.name}`
    })),
    required: true
  },
  {
    id: 'acne-level',
    title: 'Você tem acne?',
    subtitle: 'Se sim, com que frequência e intensidade?',
    type: 'single',
    options: [
      { value: 'nenhuma', label: 'Não tenho acne' },
      { value: 'leve', label: 'Leve (cravos e espinhas ocasionais)' },
      { value: 'moderada', label: 'Moderada (espinhas frequentes)' },
      { value: 'severa', label: 'Severa (nódulos, cistos, inflamação intensa)' }
    ],
    educationalNote: 'Acne tem graus diferentes e cada um exige uma abordagem específica.',
    required: true
  },
  {
    id: 'lifestyle-stress',
    title: 'Como está seu nível de estresse?',
    subtitle: 'O estresse afeta diretamente hormônios que influenciam acne e oleosidade',
    type: 'scale',
    options: [
      { value: '1', label: '1 - Muito baixo' },
      { value: '2', label: '2 - Baixo' },
      { value: '3', label: '3 - Moderado' },
      { value: '4', label: '4 - Alto' },
      { value: '5', label: '5 - Muito alto' }
    ],
    educationalNote: 'Cortisol (hormônio do estresse) aumenta produção de sebo e inflamação.',
    required: true
  },
  {
    id: 'menstrual-cycle',
    title: 'Seu ciclo menstrual afeta sua pele?',
    subtitle: 'Muitas mulheres notam mudanças na pele em diferentes fases do ciclo',
    type: 'single',
    options: [
      { value: 'sim', label: 'Sim, noto diferença clara' },
      { value: 'as-vezes', label: 'Às vezes percebo mudanças' },
      { value: 'nao', label: 'Não percebo relação' },
      { value: 'nao-se-aplica', label: 'Não se aplica' }
    ],
    educationalNote: 'Seu ciclo pode alterar acne e oleosidade — queremos isso mapeado para ajustar sua rotina.',
    required: true
  },
  {
    id: 'sun-exposure',
    title: 'Qual é sua exposição solar diária?',
    subtitle: 'Seja honesta - isso impacta diretamente manchas e envelhecimento',
    type: 'single',
    options: [
      { value: 'baixa', label: 'Baixa (fico em ambientes fechados)' },
      { value: 'moderada', label: 'Moderada (saio um pouco durante o dia)' },
      { value: 'alta', label: 'Alta (fico muito tempo ao ar livre)' }
    ],
    educationalNote: 'Exposição solar é o fator #1 de envelhecimento precoce e manchas.',
    required: true
  },
  {
    id: 'goals',
    title: 'Quais são seus objetivos principais?',
    subtitle: 'Selecione até 3 prioridades',
    type: 'multiple',
    options: [
      { value: 'controlar-acne', label: 'Controlar acne' },
      { value: 'clarear-manchas', label: 'Clarear manchas' },
      { value: 'prevenir-envelhecimento', label: 'Prevenir envelhecimento' },
      { value: 'reduzir-rugas', label: 'Reduzir rugas existentes' },
      { value: 'controlar-oleosidade', label: 'Controlar oleosidade' },
      { value: 'hidratar', label: 'Hidratar profundamente' },
      { value: 'uniformizar-textura', label: 'Uniformizar textura' },
      { value: 'minimizar-poros', label: 'Minimizar poros' }
    ],
    required: true
  },
  {
    id: 'budget',
    title: 'Qual é seu orçamento realista para skincare?',
    subtitle: 'Vamos sugerir produtos que cabem no seu bolso',
    type: 'single',
    options: [
      { value: 'economico', label: 'Econômico (até R$ 200/mês)' },
      { value: 'moderado', label: 'Moderado (R$ 200-500/mês)' },
      { value: 'premium', label: 'Premium (R$ 500-1000/mês)' },
      { value: 'luxo', label: 'Luxo (acima de R$ 1000/mês)' }
    ],
    required: true
  }
];

export const generateSkinID = (profile: any): string => {
  // Gera código único baseado nas características
  const typeCode = profile.skinType?.charAt(0).toUpperCase() || 'X';
  const sensitivityCode = profile.sensitivity === 'alta' ? '3' : profile.sensitivity === 'moderada' ? '2' : '1';
  const fitzCode = profile.fitzpatrickType || 'X';
  
  return `${fitzCode}.${sensitivityCode}-${typeCode}`;
};

export const generateSkinDescription = (profile: any): string => {
  const parts: string[] = [];
  
  // Tipo de pele
  const skinTypeMap: Record<string, string> = {
    'seca': 'Seca',
    'normal': 'Normal',
    'mista': 'Mista',
    'oleosa': 'Oleosa'
  };
  parts.push(skinTypeMap[profile.skinType] || 'Indefinida');
  
  // Sensibilidade
  const sensitivityMap: Record<string, string> = {
    'baixa': 'Resistente',
    'moderada': 'Sensível moderada',
    'alta': 'Muito sensível'
  };
  parts.push(sensitivityMap[profile.sensitivity] || '');
  
  // Preocupações principais
  if (profile.concerns?.includes('manchas')) {
    parts.push('Tendência a manchas');
  }
  if (profile.concerns?.includes('acne')) {
    parts.push('Propensa a acne');
  }
  
  return parts.filter(Boolean).join(' · ');
};

export const generateInfluencingFactors = (profile: any): string[] => {
  const factors: string[] = [];
  
  if (profile.lifestyle?.stressLevel >= 4) {
    factors.push('Influenciada por estresse');
  }
  
  if (profile.menstrualCycle === 'sim') {
    factors.push('Varia com ciclo menstrual');
  }
  
  if (profile.lifestyle?.sleepQuality <= 2) {
    factors.push('Afetada por sono irregular');
  }
  
  if (profile.sunExposure === 'alta') {
    factors.push('Alta exposição solar');
  }
  
  return factors;
};
