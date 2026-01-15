"use client";

import { useEffect, useState } from "react";
import { getRecords, SnackRecord } from "@/lib/storage";

export default function History() {
    const [records, setRecords] = useState<SnackRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRecords(getRecords());
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* 명언 */}
            <div className="mb-8">
                <p className="text-xl font-bold text-gray-900 leading-relaxed">
                    생각하고 야식을 먹었다.
                </p>
                <p className="text-xl font-bold text-gray-900">
                    고로 나는 존재한다.
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
                        <p>아직 야식 기록이 없어요</p>
                        <p className="text-sm mt-1">야식결정 탭에서 도전해보세요!</p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto space-y-3">
                    {records.map((record) => (
                        <div
                            key={record.id}
                            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
                        >
                            {/* 음식 이미지 */}
                            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                                {record.foodImage}
                            </div>

                            {/* 정보 */}
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 truncate">
                                    {record.foodName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {record.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
