const InputField: React.FC<{
  label: string;
  name: string;
  type: string;
  value: string | number;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string | null;
}> = ({ label, name, type, value, required, onChange, errorMessage }) => (
  <div className="mt-4">
    <label className="block mb-2 font-semibold text-gray-700">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  </div>
);

export default InputField;
