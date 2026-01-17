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
            <div className="flex flex-col items-center justify-center h-full">
                <div className={`p-8 rounded-2xl text-center ${result === "success" ? "bg-pink-50" : "bg-gray-50"}`}>
                    {result === "success" ? (
                        <>
                            <p className="text-2xl font-bold text-pink-500 mb-2">정답!</p>
                            <p className="text-gray-700 mb-1">의지력 충분!</p>
                            <p className="text-gray-700 mb-1">뇌 운동 성공!</p>
                            <p className="text-gray-700">맛있게 먹어요 🎉</p>
                            <button
                                onClick={onSuccess}
                                className="mt-6 px-6 py-3 bg-pink-400 text-white rounded-lg font-semibold hover:bg-pink-500 transition-colors"
                            >
                                야식 기록 남기기
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-2xl font-bold text-gray-500 mb-2">아쉽다.</p>
                            <p className="text-gray-600 mb-1">야식을 먹기엔</p>
                            <p className="text-gray-600 mb-1">아직 의지력이</p>
                            <p className="text-gray-600">충분하지 않은 것 같아</p>
                            <button
                                onClick={onFail}
                                className="mt-6 px-6 py-3 bg-pink-400 text-white rounded-lg font-semibold hover:bg-pink-500 transition-colors"
                            >
                                다시 합리화하기
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* 헤더 */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onGiveUp}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="text-2xl text-gray-500">←</span>
                </button>
                <span className="text-gray-500">관문 2/2</span>
            </div>

            {/* 타이틀 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                먹을 거면, 뇌도 좀 써
            </h1>

            {/* 문제 영역 */}
            <div className="flex-1">
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-2">문제</p>
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                        {question.dialog}
                    </p>
                </div>

                {/* 선택지 */}
                <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3">정답은?</p>
                    <div className="space-y-2">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption(index)}
                                className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200
                  ${selectedOption === index
                                        ? "border-pink-400 bg-pink-50 text-pink-600"
                                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                                    }`}
                            >
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current mr-3 text-sm">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 타이머 */}
                <div className="text-center mb-6">
                    <p className="text-gray-500">
                        제한시간 : <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-gray-700"}`}>{timeLeft}</span>초
                    </p>
                    {/* 타이머 바 */}
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ${timeLeft <= 10 ? "bg-red-400" : "bg-pink-400"}`}
                            style={{ width: `${(timeLeft / 30) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-3">
                <button
                    onClick={onGiveUp}
                    className="flex-1 py-4 text-lg font-semibold rounded-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
                >
                    포기하기
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className={`flex-1 py-4 text-lg font-semibold rounded-lg transition-all
            ${selectedOption !== null
                            ? "bg-pink-400 hover:bg-pink-500 text-white"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    야식 도전하기
                </button>
            </div>
        </div>
    );
}
