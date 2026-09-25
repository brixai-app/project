interface CalcButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'equals' | 'function' | 'scientific' | 'active';
  span?: number;
  small?: boolean;
}

export default function CalcButton({ label, onClick, variant = 'default', span = 1, small = false }: CalcButtonProps) {
  const base = `rounded-2xl font-medium transition-all duration-100 flex items-center justify-center select-none cursor-pointer active:scale-95 ${small ? 'h-12 text-sm' : 'h-14 text-lg'}`;

  const variants: Record<string, string> = {
    default: 'bg-slate-600 hover:bg-slate-500 text-white active:bg-slate-400',
    operator: 'bg-sky-600 hover:bg-sky-500 text-white active:bg-sky-400',
    equals: 'bg-emerald-500 hover:bg-emerald-400 text-white active:bg-emerald-300 shadow-lg shadow-emerald-900/40',
    function: 'bg-slate-500 hover:bg-slate-400 text-white active:bg-slate-300',
    scientific: 'bg-slate-700 hover:bg-slate-600 text-sky-300 active:bg-slate-500',
    active: 'bg-sky-700 hover:bg-sky-600 text-white active:bg-sky-500',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${span === 2 ? 'col-span-2' : ''}`}
    >
      {label}
    </button>
  );
}
