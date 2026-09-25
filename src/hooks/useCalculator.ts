import { useState, useCallback } from 'react';

interface CalculatorState {
  display: string;
  expression: string;
  previousValue: number | null;
  operator: string | null;
  waitingForOperand: boolean;
  isDegrees: boolean;
  hasError: boolean;
}

const initialState: CalculatorState = {
  display: '0',
  expression: '',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  isDegrees: true,
  hasError: false,
};

function compute(a: number, b: number, op: string): number {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    case 'xʸ': return Math.pow(a, b);
    default: return b;
  }
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n > 170) return Infinity;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function formatResult(value: number): string {
  if (isNaN(value) || !isFinite(value)) return 'Error';
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-9 && value !== 0)) {
    return value.toExponential(6);
  }
  const str = parseFloat(value.toPrecision(12)).toString();
  return str;
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const fromRad = (rad: number) => (rad * 180) / Math.PI;

  const inputDigit = useCallback((digit: string) => {
    setState(prev => {
      if (prev.hasError) return { ...initialState, display: digit === '0' ? '0' : digit };
      if (prev.waitingForOperand) {
        return { ...prev, display: digit, waitingForOperand: false };
      }
      const newDisplay = prev.display === '0' ? digit : prev.display + digit;
      if (newDisplay.replace('-', '').length > 15) return prev;
      return { ...prev, display: newDisplay };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState(prev => {
      if (prev.hasError) return initialState;
      if (prev.waitingForOperand) {
        return { ...prev, display: '0.', waitingForOperand: false };
      }
      if (!prev.display.includes('.')) {
        return { ...prev, display: prev.display + '.' };
      }
      return prev;
    });
  }, []);

  const clear = useCallback(() => setState(initialState), []);

  const backspace = useCallback(() => {
    setState(prev => {
      if (prev.hasError || prev.waitingForOperand) return initialState;
      const newDisplay = prev.display.length > 1 ? prev.display.slice(0, -1) : '0';
      return { ...prev, display: newDisplay };
    });
  }, []);

  const toggleSign = useCallback(() => {
    setState(prev => {
      const value = parseFloat(prev.display);
      if (isNaN(value)) return prev;
      return { ...prev, display: formatResult(-value) };
    });
  }, []);

  const percentage = useCallback(() => {
    setState(prev => {
      const value = parseFloat(prev.display);
      if (isNaN(value)) return prev;
      if (prev.previousValue !== null && prev.operator) {
        const result = (prev.previousValue * value) / 100;
        return { ...prev, display: formatResult(result), waitingForOperand: true };
      }
      return { ...prev, display: formatResult(value / 100), waitingForOperand: true };
    });
  }, []);

  const handleOperator = useCallback((nextOperator: string) => {
    setState(prev => {
      const inputValue = parseFloat(prev.display);

      if (prev.previousValue !== null && !prev.waitingForOperand && prev.operator) {
        const result = compute(prev.previousValue, inputValue, prev.operator);
        if (isNaN(result)) {
          return { ...prev, display: 'Error', hasError: true, previousValue: null, operator: null };
        }
        const resultStr = formatResult(result);
        return {
          ...prev,
          display: resultStr,
          previousValue: result,
          operator: nextOperator,
          waitingForOperand: true,
          expression: `${resultStr} ${nextOperator}`,
        };
      }

      return {
        ...prev,
        previousValue: inputValue,
        operator: nextOperator,
        waitingForOperand: true,
        expression: `${prev.display} ${nextOperator}`,
      };
    });
  }, []);

  const calculate = useCallback(() => {
    setState(prev => {
      if (prev.operator === null || prev.previousValue === null) return prev;
      const inputValue = parseFloat(prev.display);
      const result = compute(prev.previousValue, inputValue, prev.operator);
      if (isNaN(result) || !isFinite(result)) {
        return { ...initialState, display: 'Error', hasError: true };
      }
      const resultStr = formatResult(result);
      return {
        ...prev,
        display: resultStr,
        expression: `${prev.expression} ${prev.display} =`,
        previousValue: null,
        operator: null,
        waitingForOperand: true,
      };
    });
  }, []);

  const handleScientific = useCallback((func: string) => {
    setState(prev => {
      const value = parseFloat(prev.display);

      if (func === 'π') return { ...prev, display: formatResult(Math.PI), waitingForOperand: false };
      if (func === 'e') return { ...prev, display: formatResult(Math.E), waitingForOperand: false };

      let result: number;
      switch (func) {
        case 'sin': result = Math.sin(prev.isDegrees ? toRad(value) : value); break;
        case 'cos': result = Math.cos(prev.isDegrees ? toRad(value) : value); break;
        case 'tan': result = Math.tan(prev.isDegrees ? toRad(value) : value); break;
        case 'sin⁻¹': result = prev.isDegrees ? fromRad(Math.asin(value)) : Math.asin(value); break;
        case 'cos⁻¹': result = prev.isDegrees ? fromRad(Math.acos(value)) : Math.acos(value); break;
        case 'tan⁻¹': result = prev.isDegrees ? fromRad(Math.atan(value)) : Math.atan(value); break;
        case 'log': result = Math.log10(value); break;
        case 'ln': result = Math.log(value); break;
        case '√x': result = Math.sqrt(value); break;
        case '∛x': result = Math.cbrt(value); break;
        case 'x²': result = value * value; break;
        case 'x³': result = value * value * value; break;
        case '1/x': result = 1 / value; break;
        case '|x|': result = Math.abs(value); break;
        case '10ˣ': result = Math.pow(10, value); break;
        case 'eˣ': result = Math.exp(value); break;
        case 'n!': result = factorial(value); break;
        default: return prev;
      }

      const resultStr = formatResult(result);
      return {
        ...prev,
        display: resultStr,
        waitingForOperand: true,
        hasError: resultStr === 'Error',
      };
    });
  }, []);

  const toggleDegrees = useCallback(() => {
    setState(prev => ({ ...prev, isDegrees: !prev.isDegrees }));
  }, []);

  return {
    ...state,
    inputDigit,
    inputDecimal,
    clear,
    backspace,
    toggleSign,
    percentage,
    handleOperator,
    calculate,
    handleScientific,
    toggleDegrees,
  };
}
