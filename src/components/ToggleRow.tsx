interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

export function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  const id = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 min-h-[44px] py-2">
      <div className="flex flex-col flex-1 min-w-0">
        <label htmlFor={id} className="text-sm font-medium text-white cursor-pointer leading-snug">
          {label}
        </label>
        <span className="text-xs text-gray-400 leading-snug">{description}</span>
      </div>

      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        onKeyDown={handleKeyDown}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
          ${checked ? 'bg-blue-500' : 'bg-gray-600'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-0'}`}
          aria-hidden="true"
        />
        <span className="sr-only">{checked ? 'On' : 'Off'}</span>
      </button>
    </div>
  );
}
