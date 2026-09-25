import { useState } from 'react';
import { FlaskConical, Calculator as CalcIcon } from 'lucide-react';
import Display from './Display';
import CalcButton from './CalcButton';
import { useCalculator } from '../hooks/useCalculator';

export default function Calculator() {
  const [isScientific, setIsScientific] = useState(false);
  const calc = useCalculator();

  return (
    <div
      className={`transition-all duration-400 ${
        isScientific ? 'w-full max-w-md' : 'w-full max-w-xs'
      }`}
    >
      <div className="bg-slate-800 rounded-3xl p-4 shadow-2xl shadow-black/60 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalcIcon size={16} className="text-slate-400" />
            <span className="text-slate-400 text-sm font-medium tracking-wide">
              {isScientific ? 'Scientific' : 'Standard'}
            </span>
          </div>

          <button
            onClick={() => setIsScientific(v => !v)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isScientific
                ? 'bg-sky-600 text-white hover:bg-sky-500'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <FlaskConical size={14} />
            {isScientific ? 'Standard' : 'Scientific'}
          </button>
        </div>

        <Display
          expression={calc.expression}
          display={calc.display}
          hasError={calc.hasError}
          operator={calc.operator}
        />

        <div className="space-y-2">
          {isScientific && (
            <div className="overflow-hidden transition-all duration-300">
              <div className="grid grid-cols-4 gap-2 mb-2">
                <CalcButton small label="sin" onClick={() => calc.handleScientific('sin')} variant="scientific" />
                <CalcButton small label="cos" onClick={() => calc.handleScientific('cos')} variant="scientific" />
                <CalcButton small label="tan" onClick={() => calc.handleScientific('tan')} variant="scientific" />
                <CalcButton
                  small
                  label={calc.isDegrees ? 'DEG' : 'RAD'}
                  onClick={calc.toggleDegrees}
                  variant={calc.isDegrees ? 'active' : 'scientific'}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <CalcButton small label="sin⁻¹" onClick={() => calc.handleScientific('sin⁻¹')} variant="scientific" />
                <CalcButton small label="cos⁻¹" onClick={() => calc.handleScientific('cos⁻¹')} variant="scientific" />
                <CalcButton small label="tan⁻¹" onClick={() => calc.handleScientific('tan⁻¹')} variant="scientific" />
                <CalcButton small label="n!" onClick={() => calc.handleScientific('n!')} variant="scientific" />
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <CalcButton small label="log" onClick={() => calc.handleScientific('log')} variant="scientific" />
                <CalcButton small label="ln" onClick={() => calc.handleScientific('ln')} variant="scientific" />
                <CalcButton small label="√x" onClick={() => calc.handleScientific('√x')} variant="scientific" />
                <CalcButton small label="x²" onClick={() => calc.handleScientific('x²')} variant="scientific" />
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <CalcButton small label="10ˣ" onClick={() => calc.handleScientific('10ˣ')} variant="scientific" />
                <CalcButton small label="eˣ" onClick={() => calc.handleScientific('eˣ')} variant="scientific" />
                <CalcButton small label="xʸ" onClick={() => calc.handleOperator('xʸ')} variant="scientific" />
                <CalcButton small label="1/x" onClick={() => calc.handleScientific('1/x')} variant="scientific" />
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <CalcButton small label="∛x" onClick={() => calc.handleScientific('∛x')} variant="scientific" />
                <CalcButton small label="x³" onClick={() => calc.handleScientific('x³')} variant="scientific" />
                <CalcButton small label="|x|" onClick={() => calc.handleScientific('|x|')} variant="scientific" />
                <CalcButton small label="π" onClick={() => calc.handleScientific('π')} variant="scientific" />
              </div>
              <div className="h-px bg-slate-700 my-3 rounded-full" />
            </div>
          )}

          <div className="grid grid-cols-4 gap-2">
            <CalcButton label="AC" onClick={calc.clear} variant="function" />
            <CalcButton label="+/−" onClick={calc.toggleSign} variant="function" />
            <CalcButton label="%" onClick={calc.percentage} variant="function" />
            <CalcButton label="÷" onClick={() => calc.handleOperator('÷')} variant={calc.operator === '÷' && calc.waitingForOperand ? 'active' : 'operator'} />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <CalcButton label="7" onClick={() => calc.inputDigit('7')} />
            <CalcButton label="8" onClick={() => calc.inputDigit('8')} />
            <CalcButton label="9" onClick={() => calc.inputDigit('9')} />
            <CalcButton label="×" onClick={() => calc.handleOperator('×')} variant={calc.operator === '×' && calc.waitingForOperand ? 'active' : 'operator'} />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <CalcButton label="4" onClick={() => calc.inputDigit('4')} />
            <CalcButton label="5" onClick={() => calc.inputDigit('5')} />
            <CalcButton label="6" onClick={() => calc.inputDigit('6')} />
            <CalcButton label="−" onClick={() => calc.handleOperator('−')} variant={calc.operator === '−' && calc.waitingForOperand ? 'active' : 'operator'} />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <CalcButton label="1" onClick={() => calc.inputDigit('1')} />
            <CalcButton label="2" onClick={() => calc.inputDigit('2')} />
            <CalcButton label="3" onClick={() => calc.inputDigit('3')} />
            <CalcButton label="+" onClick={() => calc.handleOperator('+')} variant={calc.operator === '+' && calc.waitingForOperand ? 'active' : 'operator'} />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <CalcButton label="⌫" onClick={calc.backspace} variant="function" />
            <CalcButton label="0" onClick={() => calc.inputDigit('0')} />
            <CalcButton label="." onClick={calc.inputDecimal} />
            <CalcButton label="=" onClick={calc.calculate} variant="equals" />
          </div>
        </div>
      </div>
    </div>
  );
}
