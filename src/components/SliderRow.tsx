interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (val: number) => void;
  /** Optional custom display format; if provided, overrides the default "value + unit" badge */
  format?: (val: number) => string;
}

export function SliderRow({ label, value, min, max, step, unit, onChange, format }: SliderRowProps) {
  const id = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const displayValue = format ? format(value) : `${value}${unit}`;

  return (
    <div className="flex flex-col gap-1.5 py-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-white">
          {label}
        </label>
        <span className="shrink-0 text-xs bg-gray-700 text-gray-200 px-2 py-0.5 rounded-full tabular-nums">
          {displayValue}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-600 accent-blue-500
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      />
    </div>
  );
}
