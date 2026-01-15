"use client";

interface TabNavigationProps {
    activeTab: "decision" | "history";
    onTabChange: (tab: "decision" | "history") => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
    return (
        <nav className="flex border-t border-gray-200 bg-white">
            <button
                onClick={() => onTabChange("decision")}
                className={`flex-1 py-4 text-center font-semibold transition-colors
          ${activeTab === "decision"
                        ? "text-pink-500 border-t-2 border-pink-500 -mt-[1px]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
            >
                야식결정
            </button>
            <button
                onClick={() => onTabChange("history")}
                className={`flex-1 py-4 text-center font-semibold transition-colors
          ${activeTab === "history"
                        ? "text-pink-500 border-t-2 border-pink-500 -mt-[1px]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
            >
                야식기록
            </button>
        </nav>
    );
}
