import type { ButtonProps } from "../../types/component";

export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
}: ButtonProps) {
    const baseStyle =
        "px-4 py-3 w-full rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#16A34A] text-white hover:bg-[#15803d] active:scale-[0.985]",
        secondary: "bg-gray-100 text-[#1A1A1A] hover:bg-gray-200",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]}`}
        >
            {children}
        </button>
    );
}