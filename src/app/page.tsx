"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import Depth1 from "@/components/Depth1";
import Depth2 from "@/components/Depth2";
import Depth3 from "@/components/Depth3";
import History from "@/components/History";
import { findFood, Food } from "@/data/foods";

type Tab = "decision" | "history";
type Depth = 1 | 2 | 3;

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("decision");
  const [currentDepth, setCurrentDepth] = useState<Depth>(1);
  const [currentFood, setCurrentFood] = useState<Food | null>(null);
  const [isExactMatch, setIsExactMatch] = useState(true);

  // Depth 1 → Depth 2
  const handleFoodSubmit = useCallback((foodName: string) => {
    const { food, isExactMatch: exact } = findFood(foodName);
    setCurrentFood(food);
    setIsExactMatch(exact);
    setCurrentDepth(2);
  }, []);

  // Depth 2 성공 → Depth 3
  const handleDepth2Success = useCallback(() => {
    setCurrentDepth(3);
  }, []);

  // Depth 3 성공 → 기록 탭으로 이동
  const handleDepth3Success = useCallback(() => {
    setActiveTab("history");
    setCurrentDepth(1);
    setCurrentFood(null);
  }, []);

  // 실패 또는 포기 → Depth 1로 리셋
  const handleReset = useCallback(() => {
    setCurrentDepth(1);
    setCurrentFood(null);
  }, []);

  // 탭 변경
  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
    if (tab === "decision") {
      // 야식결정 탭으로 돌아오면 Depth 1로 리셋
      setCurrentDepth(1);
      setCurrentFood(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-xl">
        {/* 헤더 */}
        <Header />

        {/* 메인 컨텐츠 */}
        <main className="flex-1 p-6 overflow-y-auto relative">
          {activeTab === "decision" ? (
            <>
              {currentDepth === 1 && (
                <Depth1 onNext={handleFoodSubmit} />
              )}
              {currentDepth === 2 && currentFood && (
                <Depth2
                  food={currentFood}
                  isExactMatch={isExactMatch}
                  onSuccess={handleDepth2Success}
                  onGiveUp={handleReset}
                />
              )}
              {currentDepth === 3 && currentFood && (
                <Depth3
                  food={currentFood}
                  onSuccess={handleDepth3Success}
                  onFail={handleReset}
                  onGiveUp={handleReset}
                />
              )}
            </>
          ) : (
            <History />
          )}
        </main>

        {/* 하단 탭 네비게이션 */}
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}
