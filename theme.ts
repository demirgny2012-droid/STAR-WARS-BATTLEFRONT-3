export interface Theme {
  name: string;
  text: {
    header: string;
    subheader: string;
    primary: string;
    secondary: string;
    danger: string;
    victory: string;
    faction: (color: string) => string;
  };
  border: {
    primary: string;
    secondary: string;
    danger: string;
    faction: (color: string) => string;
  };
  background: {
    hover: (color: string) => string;
  };
  ring: {
    faction: (color: string) => string;
    factionHover: (color: string) => string;
  };
  title: {
    main: string;
    sub: string;
  }
}

const baseFactionColors: Record<string, string> = {
  'border-red-600': 'border-red-600',
  'border-blue-500': 'border-blue-500',
  'border-gray-400': 'border-gray-400',
  'border-amber-400': 'border-amber-400',
  'border-cyan-400': 'border-cyan-400',
  'border-sky-400': 'border-sky-400',
  'border-slate-300': 'border-slate-300',
};

const vipFactionColors: Record<string, string> = {
  'border-red-600': 'border-yellow-400',
  'border-blue-500': 'border-yellow-400',
  'border-gray-400': 'border-yellow-400',
  'border-amber-400': 'border-yellow-400',
  'border-cyan-400': 'border-yellow-400',
  'border-sky-400': 'border-yellow-400',
  'border-slate-300': 'border-yellow-400',
};

const baseHoverColors: Record<string, string> = {
    'hover:bg-red-900/50': 'hover:bg-red-900/50',
    'hover:bg-blue-900/50': 'hover:bg-blue-900/50',
    'hover:bg-gray-700/50': 'hover:bg-gray-700/50',
    'hover:bg-amber-800/50': 'hover:bg-amber-800/50',
    'hover:bg-cyan-900/50': 'hover:bg-cyan-900/50',
    'hover:bg-sky-900/50': 'hover:bg-sky-900/50',
    'hover:bg-slate-700/50': 'hover:bg-slate-700/50',
};

const vipHoverColor = 'hover:bg-yellow-800/50';

const baseTextColors: Record<string, string> = {
  'border-red-600': 'text-red-500',
  'border-blue-500': 'text-blue-400',
  'border-gray-400': 'text-gray-300',
  'border-amber-400': 'text-amber-400',
  'border-cyan-400': 'text-cyan-400',
  'border-sky-400': 'text-sky-400',
  'border-slate-300': 'text-slate-300',
};

const vipTextColor = 'text-yellow-300';


export const defaultTheme: Theme = {
    name: 'default',
    text: {
        header: 'text-yellow-400',
        subheader: 'text-gray-300',
        primary: 'text-gray-200',
        secondary: 'text-gray-400',
        danger: 'text-red-500',
        victory: 'text-green-400',
        faction: (color: string) => baseTextColors[color] || 'text-white',
    },
    border: {
        primary: 'border-yellow-400',
        secondary: 'border-gray-700',
        danger: 'border-red-500',
        faction: (color: string) => baseFactionColors[color] || color,
    },
    background: {
        hover: (color: string) => baseHoverColors[color] || color,
    },
    ring: {
        faction: (color: string) => color.replace('border', 'focus:ring'),
        factionHover: (color: string) => color.replace('border', 'hover:ring-2 hover:ring'),
    },
    title: {
        main: 'STAR WARS',
        sub: 'BATTLEFRONT 3',
    }
};

export const vipTheme: Theme = {
    name: 'vip',
    text: {
        header: 'text-yellow-300',
        subheader: 'text-yellow-500',
        primary: 'text-gray-100',
        secondary: 'text-yellow-200',
        danger: 'text-red-400',
        victory: 'text-green-300',
        faction: (_color: string) => vipTextColor,
    },
    border: {
        primary: 'border-yellow-300',
        secondary: 'border-yellow-600',
        danger: 'border-red-400',
        faction: (color: string) => vipFactionColors[color] || 'border-yellow-400',
    },
    background: {
        hover: (_color: string) => vipHoverColor,
    },
    ring: {
        faction: (_color: string) => 'focus:ring-yellow-300',
        factionHover: (_color: string) => 'hover:ring-2 hover:ring-yellow-300',
    },
    title: {
        main: 'STAR WARS',
        sub: 'BATTLEFRONT 3 VIP EDITION',
    }
};