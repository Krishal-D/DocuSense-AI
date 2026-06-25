import type { InputProps } from "../../types/component";

export default function Input({
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    disabled = false,
}: InputProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-[#1A1A1A]"
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full px-4 py-3 bg-white border border-[#E5E2DC] rounded-xl 
                           text-[#1A1A1A] placeholder-[#8A8680] outline-none 
                           focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 
                           transition-all duration-200 disabled:opacity-50"
            />
        </div>
    );
}