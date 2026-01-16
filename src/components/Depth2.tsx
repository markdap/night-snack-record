"use client";

import { useState, useEffect, useCallback } from "react";
import { Food } from "@/data/foods";

interface Depth2Props {
    food: Food;
    isExactMatch: boolean;
    onSuccess: () => void;
    onGiveUp: () => void;
}

export default function Depth2({ food, isExactMatch, onSuccess, onGiveUp }: Depth2Props) {
    const [clickCount, setClickCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [showFailMessage, setShowFailMessage] = useState(false);
    const [buttonScale, setButtonScale] = useState(1);

    const requiredClicks = food.clickCount;
    const CLICK_TIMEOUT = 500; // 0.5초 내에 클릭해야 함

    // 클릭 타임아웃 체크
    useEffect(() => {
        if (clickCount > 0 && clickCount < requiredClicks) {
            const timer = setTimeout(() => {
                // 시간 초과 - 실패
                handleFail();
            }, CLICK_TIMEOUT);

            return () => clearTimeout(timer);
        }
    }, [clickCount, lastClickTime, requiredClicks]);

    const handleFail = useCallback(() => {
        setShowFailMessage(true);
        setIsShaking(true);

        // 화면 쉐이크 효과
        setTimeout(() => {
            setIsShaking(false);
            setShowFailMessage(false);
            setClickCount(0);
        }, 1500);
    }, []);

    const handleClick = () => {
        const now = Date.now();

        // 첫 클릭이 아니고, 타임아웃 초과 시
        if (clickCount > 0 && now - lastClickTime > CLICK_TIMEOUT) {
            handleFail();
            return;
        }

        // 버튼 애니메이션
        setButtonScale(0.9);
        setTimeout(() => setButtonScale(1.05), 50);
        setTimeout(() => setButtonScale(1), 150);

        // 진동 (모바일)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        const newCount = clickCount + 1;
        setClickCount(newCount);
        setLastClickTime(now);

        // 성공 체크
        if (newCount >= requiredClicks) {
            setTimeout(() => {
                onSuccess();
            }, 300);
        }
    };

    return (
        <div className={`flex flex-col h-full ${isShaking ? "animate-shake" : ""}`}>
            {/* 헤더 */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onGiveUp}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="text-2xl">←</span>
                </button>
                <span className="text-gray-500">관문 1/2</span>
            </div>

            {/* 타이틀 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                진짜 먹을거야?
            </h1>

            {/* 음식 카드 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 mb-6 flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                    {food.image}
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-900">{food.name}</p>
                    <p className="text-gray-600">
                        <span className="text-pink-500 font-bold">{food.calories.toLocaleString()}</span> 칼로리
                    </p>
                    {!isExactMatch && (
                        <p className="text-xs text-orange-500 mt-1">
                            ⚠️ 정확한 칼로리를 찾지 못했어요
                        </p>
                    )}
                </div>
            </div>

            {/* 안내 메시지 */}
            <p className="text-center text-gray-600 mb-4">
                먹고 싶다면 의지력을 증명해
            </p>

            {/* 클릭 카운터 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-center">
                <p className="text-gray-600 mb-2">합리화하기 버튼 연타 횟수</p>
                <p className="text-2xl font-bold">
                    <span className={`transition-all duration-150 inline-block ${clickCount > 0 ? "text-pink-500 scale-110" : "text-gray-400"}`}>
                        {clickCount}
                    </span>
                    <span className="text-gray-400"> / </span>
                    <span className="text-gray-600">{requiredClicks}</span>
                    <span className="text-gray-400">회</span>
                </p>

                {/* 프로그레스 바 */}
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-150"
                        style={{ width: `${(clickCount / requiredClicks) * 100}%` }}
                    />
                </div>
            </div>

            {/* 실패 메시지 */}
            {showFailMessage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
                        <p className="text-xl font-bold text-red-500 mb-2">연타 실패!</p>
                        <p className="text-gray-600">0.5초 안에 클릭해야 해요</p>
                    </div>
                </div>
            )}

            {/* 버튼 영역 */}
            <div className="mt-auto flex gap-3">
                <button
                    onClick={onGiveUp}
                    className="flex-1 py-4 text-lg font-semibold rounded-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
                >
                    포기하기
                </button>
                <button
                    onClick={handleClick}
                    style={{ transform: `scale(${buttonScale})` }}
                    className="flex-1 py-4 text-lg font-semibold rounded-lg bg-pink-400 hover:bg-pink-500 text-white transition-all duration-100 active:bg-pink-600"
                >
                    합리화하기
                </button>
            </div>
        </div>
    );
}
