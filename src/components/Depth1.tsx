"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

interface Depth1Props {
    onNext: (foodName: string) => void;
}

export default function Depth1({ onNext }: Depth1Props) {
    const [foodName, setFoodName] = useState("");
    const { data: session } = useSession();

    const isButtonEnabled = foodName.trim().length > 0;

    const handleSubmit = () => {
        if (!isButtonEnabled) return;

        if (!session) {
            if (confirm("야식 결정을 위해 로그인이 필요합니다.\n로그인하시겠습니까?")) {
                signIn("google");
            }
            return;
        }

        onNext(foodName.trim());
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && isButtonEnabled) {
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            {/* 타이틀 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
                또 뭐 먹게?
            </h1>

            {/* 입력 필드 */}
            <div className="flex-1">
                <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="음식명 직접 입력"
                    className={`w-full px-4 py-3 text-lg border-2 rounded-lg outline-none transition-all duration-200
            ${foodName.trim()
                            ? "border-pink-400 text-pink-600 placeholder-pink-300"
                            : "border-gray-300 text-gray-700 placeholder-gray-400"
                        }
            focus:border-pink-500 focus:ring-2 focus:ring-pink-200 shadow-sm`}
                />
                {!session && foodName.trim() && (
                    <p className="text-[10px] text-pink-400 mt-2 ml-1 animate-pulse">
                        💡 칼로리 확인을 위해 로그인이 필요합니다
                    </p>
                )}
            </div>

            {/* 칼로리 확인 버튼 */}
            <button
                onClick={handleSubmit}
                disabled={!isButtonEnabled}
                className={`w-full py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-md
          ${isButtonEnabled
                        ? "bg-pink-400 hover:bg-pink-500 text-white cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    }`}
            >
                칼로리 확인하기
            </button>
        </div>
    );
}
