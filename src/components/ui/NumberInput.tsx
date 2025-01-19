/**
 * Composant de saisie numérique avec boutons d'incrémentation et de décrémentation
 * @component
 * @param {object} props - Les propriétés du composant
 * @param {number} props.value - La valeur actuelle du champ
 * @param {(value: number) => void} props.onChange - Fonction appelée lors du changement de valeur
 * @param {number} [props.min=0] - Valeur minimum autorisée
 * @param {number} [props.max=999] - Valeur maximum autorisée
 * @returns {JSX.Element} Composant NumberInput
 */
type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

function NumberInput({ value, onChange, min = 0, max = 999 }: NumberInputProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative flex max-w-32 items-center">
      <button
        type="button"
        onClick={handleDecrement}
        className="h-11 rounded-s-lg border border-neutral-6 bg-neutral-3 p-3 hover:bg-neutral-4 focus:outline-none focus:ring-2 focus:ring-neutral-5"
      >
        <svg className="size-3 text-neutral-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="block h-11 w-full border border-neutral-6 bg-neutral-3 py-2.5 text-center text-sm text-neutral-12 focus:border-green-9 focus:ring-green-9"
        min={min}
        max={max}
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="h-11 rounded-e-lg border border-neutral-6 bg-neutral-3 p-3 hover:bg-neutral-4 focus:outline-none focus:ring-2 focus:ring-neutral-5"
      >
        <svg className="size-3 text-neutral-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
        </svg>
      </button>
    </div>
  );
}

export default NumberInput;
