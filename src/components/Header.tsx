"use client";

interface HeaderProps {
    showBack?: boolean;
    onBack?: () => void;
}

export default function Header({ showBack, onBack }: HeaderProps) {
    return (
        <header className="flex items-center justify-center py-4 border-b border-gray-100 relative">
            {showBack && onBack && (
                <button
                    onClick={onBack}
                    className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="text-xl">←</span>
                </button>
            )}
            <div className="flex items-center gap-2">
                <span className="text-2xl">🐷</span>
                <span className="text-lg font-bold text-pink-500">꿀돼지</span>
            </div>
        </header>
    );
}
