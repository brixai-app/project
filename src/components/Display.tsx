interface DisplayProps {
  expression: string;
  display: string;
  hasError: boolean;
  operator: string | null;
}

export default function Display({ expression, display, hasError, operator }: DisplayProps) {
  const len = display.length;
  const fontSize =
    len > 14 ? 'text-xl' :
    len > 11 ? 'text-2xl' :
    len > 8  ? 'text-3xl' : 'text-4xl';

  return (
    <div className="bg-slate-950 rounded-2xl px-5 py-4 mb-4 min-h-[96px] flex flex-col justify-between">
      <div className="flex items-center justify-between min-h-[22px]">
        <span className="text-slate-500 text-xs font-mono">{operator ? `op: ${operator}` : '\u00A0'}</span>
        <span className="text-slate-400 text-sm text-right truncate max-w-[80%] font-light">{expression || '\u00A0'}</span>
      </div>
      <p
        className={`text-right font-light tracking-tight mt-1 ${fontSize} transition-all duration-100 ${
          hasError ? 'text-red-400' : 'text-white'
        }`}
      >
        {display}
      </p>
    </div>
  );
}
