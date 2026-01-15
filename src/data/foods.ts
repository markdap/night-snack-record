// 음식 데이터 타입 정의
export interface Food {
    name: string;
    calories: number;
    clickCount: number;
    keywords: string[]; // 검색용 키워드
    image: string;
}

// 내장 음식 데이터 (1,000kcal 이상)
export const foods: Food[] = [
    { name: "치킨 (한마리)", calories: 2500, clickCount: 25, keywords: ["치킨", "chicken", "후라이드", "양념"], image: "🍗" },
    { name: "피자 (라지)", calories: 2400, clickCount: 24, keywords: ["피자", "pizza"], image: "🍕" },
    { name: "족발 (대)", calories: 2200, clickCount: 22, keywords: ["족발"], image: "🦶" },
    { name: "보쌈 (대)", calories: 2000, clickCount: 20, keywords: ["보쌈"], image: "🥬" },
    { name: "양념치킨", calories: 2800, clickCount: 28, keywords: ["양념치킨", "양념"], image: "🍗" },
    { name: "후라이드치킨", calories: 2500, clickCount: 25, keywords: ["후라이드치킨", "후라이드", "후라이"], image: "🍗" },
    { name: "족발 (소)", calories: 1800, clickCount: 18, keywords: ["족발소", "족발 소"], image: "🦶" },
    { name: "보쌈 (소)", calories: 1600, clickCount: 16, keywords: ["보쌈소", "보쌈 소"], image: "🥬" },
    { name: "피자 (미디엄)", calories: 1600, clickCount: 16, keywords: ["피자미디엄", "피자 미디엄"], image: "🍕" },
    { name: "탕수육 (대)", calories: 1800, clickCount: 18, keywords: ["탕수육대", "탕수육 대"], image: "🥡" },
    { name: "탕수육 (중)", calories: 1200, clickCount: 12, keywords: ["탕수육", "탕수육중"], image: "🥡" },
    { name: "햄버거 (세트)", calories: 1100, clickCount: 11, keywords: ["햄버거", "버거", "맥도날드", "버거킹"], image: "🍔" },
    { name: "짜장면 + 탕수육", calories: 1500, clickCount: 15, keywords: ["짜장면탕수육", "짜탕"], image: "🍜" },
    { name: "짬뽕 + 탕수육", calories: 1400, clickCount: 14, keywords: ["짬뽕탕수육", "짬탕"], image: "🍜" },
    { name: "마라탕 (곱빼기)", calories: 1200, clickCount: 12, keywords: ["마라탕", "마라", "mala"], image: "🥘" },
    { name: "삼겹살 (2인분)", calories: 1200, clickCount: 12, keywords: ["삼겹살", "삼겹", "고기"], image: "🥓" },
    { name: "떡볶이 (대)", calories: 1000, clickCount: 10, keywords: ["떡볶이", "떡볶", "tteokbokki"], image: "🍢" },
    { name: "갈비찜 (2인분)", calories: 1400, clickCount: 14, keywords: ["갈비찜", "갈비"], image: "🍖" },
    { name: "곱창 (1인분)", calories: 1000, clickCount: 10, keywords: ["곱창", "대창", "막창"], image: "🥘" },
    { name: "닭볶음탕", calories: 1100, clickCount: 11, keywords: ["닭볶음탕", "닭볶음", "닭도리탕"], image: "🍲" },
];

// 기본 음식 (매칭 실패 시)
export const defaultFood: Food = {
    name: "알 수 없는 야식",
    calories: 1000,
    clickCount: 10,
    keywords: [],
    image: "🍽️",
};

// 음식 검색 함수
export function findFood(query: string): { food: Food; isExactMatch: boolean } {
    const normalizedQuery = query.toLowerCase().trim().replace(/\s+/g, "");

    // 1. 정확한 이름 매칭
    const exactMatch = foods.find(
        (f) => f.name.toLowerCase().replace(/\s+/g, "").includes(normalizedQuery) ||
            normalizedQuery.includes(f.name.toLowerCase().replace(/[^가-힣a-z]/g, ""))
    );
    if (exactMatch) return { food: exactMatch, isExactMatch: true };

    // 2. 키워드 매칭
    const keywordMatch = foods.find((f) =>
        f.keywords.some((k) =>
            normalizedQuery.includes(k.toLowerCase()) ||
            k.toLowerCase().includes(normalizedQuery)
        )
    );
    if (keywordMatch) return { food: keywordMatch, isExactMatch: true };

    // 3. 부분 매칭 (첫 글자부터)
    const partialMatch = foods.find((f) =>
        f.name.startsWith(query.charAt(0)) ||
        f.keywords.some((k) => k.startsWith(query.charAt(0)))
    );
    if (partialMatch) return { food: partialMatch, isExactMatch: false };

    // 4. 기본값
    return {
        food: { ...defaultFood, name: `${query} (추정)` },
        isExactMatch: false
    };
}
