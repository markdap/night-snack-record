"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { getRecords, SnackRecord } from "@/lib/storage";

export default function History() {
    const { data: session, status } = useSession();
    const [records, setRecords] = useState<SnackRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            setRecords(getRecords(session.user.email));
        } else {
            setRecords([]);
        }
        setIsLoading(false);
    }, [session, status]);

    if (status === "loading" || isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full" />
            </div>
        );
    }

    // 비회원 상태일 때
    if (status === "unauthenticated") {
        return (
            <div className="flex flex-col h-full animate-fadeIn">
                <div className="mb-8">
                    <p className="text-xl font-bold text-gray-900 leading-relaxed">
                        나만의 기록을 남기고 싶나요?
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        로그인하면 내가 정복한 야식들을 모두 기록할 수 있어요.
                    </p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8">
                    <div className="text-5xl mb-6">🔒</div>
                    <p className="text-gray-600 font-semibold mb-6 text-center">
                        야식 기록은 로그인 후 이용 가능합니다
                    </p>
                    <button
                        onClick={() => signIn("google")}
                        className="px-8 py-4 bg-pink-400 text-white rounded-xl font-bold shadow-lg hover:bg-pink-500 transform hover:scale-105 transition-all"
                    >
                        구글로 시작하기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            {/* 명언 */}
            <div className="mb-8">
                <p className="text-xl font-bold text-gray-900 leading-relaxed">
                    생각하고 야식을 먹었다.
                </p>
                <p className="text-xl font-bold text-gray-900">
                    고로 나는 존재한다.
                </p>
                <p className="text-xs text-pink-400 mt-2 font-medium">
                    {session?.user?.name}님의 명예로운 정복기
                </p>
            </div>

            {/* 구분선 */}
            <hr className="border-gray-200 mb-6" />

            {/* 기록 개수 */}
            <p className="text-gray-600 mb-4">
                기록 <span className="font-bold text-pink-500">{records.length}</span>개
            </p>

            {/* 기록 리스트 */}
            {records.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                        <p className="text-4xl mb-4">🐷</p>
                        <p>아직 정복한 야식이 없어요</p>
                        <p className="text-sm mt-1">야식결정 탭에서 고뇌의 시간을 가져보세요!</p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {records.map((record) => (
                        <div
                            key={record.id}
                            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all group"
                        >
                            {/* 음식 이미지 */}
                            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                                {record.foodImage}
                            </div>

                            {/* 정보 */}
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 truncate">
                                    {record.foodName}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {record.date} 정복 완료
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
