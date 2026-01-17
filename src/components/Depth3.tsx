"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Question, getRandomQuestion } from "@/data/questions";
import { Food } from "@/data/foods";
import { saveRecord } from "@/lib/storage";

interface Depth3Props {
    food: Food;
    onSuccess: () => void;
    onFail: () => void;
    onGiveUp: () => void;
}

type ResultState = "none" | "success" | "fail";

export default function Depth3({ food, onSuccess, onFail, onGiveUp }: Depth3Props) {
    const { data: session } = useSession();
    const [question, setQuestion] = useState<Question | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [result, setResult] = useState<ResultState>("none");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 문제 로드
    useEffect(() => {
        setQuestion(getRandomQuestion());
    }, []);

    // 타이머
    useEffect(() => {
        if (result !== "none" || !question) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [question, result]);

    const handleTimeout = useCallback(() => {
        setResult("fail");
        setTimeout(() => {
            onFail();
        }, 2000);
    }, [onFail]);

    const handleSubmit = () => {
        if (selectedOption === null || !question || isSubmitting) return;

        setIsSubmitting(true);

        if (selectedOption === question.answer) {
            // 정답!
            setResult("success");

            // 야식 기록 저장 (로그인한 경우 해당 유저 이메일 포함)
            if (session?.user?.email) {
                saveRecord({
                    foodName: food.name,
                    foodImage: food.image,
                    calories: food.calories,
                    timestamp: Date.now(),
                    userEmail: session.user.email,
                });
            }

            setTimeout(() => {
                onSuccess();
            }, 2000);
        } else {
            // 오답
            setResult("fail");
            setTimeout(() => {
                onFail();
            }, 2000);
        }
    };

    if (!question) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full" />
            </div>
        );
    }

    // 결과 모달
    if (result !== "none") {
        return (
            <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
                <div className={`p-8 rounded-2xl text-center shadow-xl ${result === "success" ? "bg-pink-50 border-2 border-pink-200" : "bg-gray-50 border-2 border-gray-200"}`}>
                    {result === "success" ? (
                        <>
                            <p className="text-3xl font-black text-pink-500 mb-4 animate-bounce">정답! 🎉</p>
                            <div className="space-y-1 text-gray-700 font-medium">
                                <p>의지력 최정상 등극!</p>
                                <p>뇌 세포 활성화 완료!</p>
                                <p className="text-xs text-gray-400 mt-4 italic">"{food.name}"은(는) 이제 합리화되었습니다.</p>
                            </div>
                            <button
                                onClick={onSuccess}
                                className="mt-8 w-full px-6 py-4 bg-pink-400 text-white rounded-xl font-bold hover:bg-pink-500 shadow-lg transform active:scale-95 transition-all"
                            >
                                나의 야식 정복기 확인
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-3xl font-black text-gray-400 mb-4 animate-shake">FAIL 🐷</p>
                            <div className="space-y-1 text-gray-600">
                                <p>야식을 향한 집념이</p>
                                <p>부족했던 것 같습니다.</p>
                                <p className="font-bold mt-2">다음 기회를 노려보세요!</p>
                            </div>
                            <button
                                onClick={onFail}
                                className="mt-8 w-full px-6 py-4 bg-pink-400 text-white rounded-xl font-bold hover:bg-pink-500 shadow-lg transform active:scale-95 transition-all"
                            >
                                다시 합리화하러 가기
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            {/* 헤더 */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onGiveUp}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="text-2xl text-gray-400">←</span>
                </button>
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-400 w-full animate-pulse" />
                </div>
                <span className="text-xs font-bold text-pink-500">FINAL STAGE</span>
            </div>

            {/* 타이틀 */}
            <header className="mb-6">
                <h1 className="text-2xl font-black text-gray-900">
                    먹을 거면,<br />뇌도 좀 써 🧠
                </h1>
            </header>

            {/* 문제 영역 */}
            <div className="flex-1 overflow-y-auto">
                <div className="bg-gray-50 border-l-4 border-pink-400 rounded-r-xl p-5 mb-6 shadow-sm">
                    <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-2">Question</p>
                    <p className="text-gray-800 leading-relaxed font-medium italic">
                        {question.dialog}
                    </p>
                </div>

                {/* 선택지 */}
                <div className="mb-8">
                    <p className="text-xs font-bold text-gray-400 mb-3 ml-1 uppercase tracking-tighter">Choose the best answer</p>
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption(index)}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 group
                  ${selectedOption === index
                                        ? "border-pink-400 bg-pink-50 text-pink-600 shadow-md ring-2 ring-pink-100"
                                        : "border-gray-100 hover:border-pink-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                                    }`}
                            >
                                <div className="flex items-center">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border font-bold mr-4 text-sm transition-colors
                    ${selectedOption === index
                                            ? "bg-pink-400 border-pink-400 text-white"
                                            : "bg-white border-gray-200 text-gray-400 group-hover:border-pink-300 group-hover:text-pink-400"
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="font-semibold">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 하단 영역 */}
            <div className="mt-4 space-y-4">
                {/* 타이머 */}
                <div className="px-1">
                    <div className="flex justify-between items-end mb-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase">Limit Time</p>
                        <p className={`text-xl font-black tabular-nums ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-gray-900"}`}>
                            {timeLeft}<span className="text-xs font-medium ml-0.5">s</span>
                        </p>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ${timeLeft <= 10 ? "bg-red-500" : "bg-gradient-to-r from-pink-300 to-pink-500"}`}
                            style={{ width: `${(timeLeft / 30) * 100}%` }}
                        />
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="flex gap-3">
                    <button
                        onClick={onGiveUp}
                        className="flex-1 py-4 text-lg font-bold rounded-xl border-2 border-gray-200 text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                    >
                        포기
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className={`flex-[2] py-4 text-lg font-black rounded-xl transition-all shadow-lg active:scale-95
              ${selectedOption !== null
                                ? "bg-pink-400 hover:bg-pink-500 text-white translate-y-[-2px] shadow-pink-200"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                            }`}
                    >
                        정답 제출하기
                    </button>
                </div>
            </div>
        </div>
    );
}
