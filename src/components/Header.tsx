"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

interface HeaderProps {
    showBack?: boolean;
    onBack?: () => void;
}

export default function Header({ showBack, onBack }: HeaderProps) {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="flex items-center justify-between px-4 py-4 border-b border-gray-100 relative bg-white z-50">
            {/* 왼쪽: 뒤로가기 버튼 (패딩 유지용 더미 포함) */}
            <div className="w-10">
                {showBack && onBack && (
                    <button
                        onClick={onBack}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <span className="text-xl">←</span>
                    </button>
                )}
            </div>

            {/* 중앙: 로고 */}
            <div className="flex items-center gap-1 cursor-pointer select-none">
                <span className="text-2xl">🐷</span>
                <span className="text-lg font-bold text-pink-500">꿀돼지</span>
            </div>

            {/* 오른쪽: 로그인/회원 메뉴 */}
            <div className="w-10 flex justify-end relative">
                {!session ? (
                    <button
                        onClick={() => signIn("google")}
                        className="text-xs font-semibold text-gray-500 whitespace-nowrap hover:text-pink-500 transition-colors"
                    >
                        로그인하기
                    </button>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center border border-pink-200 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all"
                        >
                            {session.user?.image ? (
                                <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm">👤</span>
                            )}
                        </button>

                        {/* 로그아웃 드롭다운 */}
                        {showDropdown && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowDropdown(false)}
                                />
                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-50 py-1 animate-fadeIn">
                                    <div className="px-3 py-2 border-b border-gray-50">
                                        <p className="text-[10px] text-gray-400 truncate">{session.user?.email}</p>
                                        <p className="text-xs font-bold text-gray-700 truncate">{session.user?.name}</p>
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors font-medium"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
