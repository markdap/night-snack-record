// 야식 기록 타입 정의
export interface SnackRecord {
    id: string;
    foodName: string;
    foodImage: string;
    calories: number;
    timestamp: number;
    date: string; // YYYY-MM-DD HH:mm 형식
}

const STORAGE_KEY = "honey_pig_records";

// 기록 저장
export function saveRecord(record: Omit<SnackRecord, "id" | "date">): SnackRecord {
    const records = getRecords();
    const now = new Date();

    const newRecord: SnackRecord = {
        ...record,
        id: `${now.getTime()}-${Math.random().toString(36).substr(2, 9)}`,
        date: formatDate(now),
    };

    records.unshift(newRecord); // 최신순 정렬

    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }

    return newRecord;
}

// 기록 조회
export function getRecords(): SnackRecord[] {
    if (typeof window === "undefined") return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// 기록 개수 조회
export function getRecordCount(): number {
    return getRecords().length;
}

// 날짜 포맷팅
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
