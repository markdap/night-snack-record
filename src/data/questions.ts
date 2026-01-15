// 영어 문제 타입 정의
export interface Question {
    id: number;
    dialog: string; // 대화문
    blank: string; // 빈칸 위치 표시용
    options: string[];
    answer: number; // 정답 인덱스 (0-3)
}

// 대학생 수준 영어 빈칸 채우기 문제 (30개 이상)
export const questions: Question[] = [
    {
        id: 1,
        dialog: "A: Do you have any plans for the weekend?\nB: Not really. I might just _____ at home and watch some movies.",
        blank: "_____",
        options: ["hang", "relax", "stay", "pass"],
        answer: 2,
    },
    {
        id: 2,
        dialog: "A: How was your job interview?\nB: I think it went well. They said they would _____ me by Friday.",
        blank: "_____",
        options: ["contact", "meet", "call", "reach"],
        answer: 0,
    },
    {
        id: 3,
        dialog: "A: I can't believe you ate the whole pizza!\nB: I couldn't help it. I was _____.",
        blank: "_____",
        options: ["starving", "hungry", "full", "thirsty"],
        answer: 0,
    },
    {
        id: 4,
        dialog: "A: Did you finish the report?\nB: Almost. I just need to _____ a few more changes.",
        blank: "_____",
        options: ["make", "do", "have", "take"],
        answer: 0,
    },
    {
        id: 5,
        dialog: "A: Why are you so tired?\nB: I've been _____ all night for the exam.",
        blank: "_____",
        options: ["studying", "working", "reading", "preparing"],
        answer: 0,
    },
    {
        id: 6,
        dialog: "A: The concert was amazing!\nB: I know! The singer really _____ the crowd.",
        blank: "_____",
        options: ["entertained", "impressed", "amazed", "surprised"],
        answer: 1,
    },
    {
        id: 7,
        dialog: "A: I heard you got promoted!\nB: Yes, I've been working hard to _____ this opportunity.",
        blank: "_____",
        options: ["earn", "gain", "win", "get"],
        answer: 0,
    },
    {
        id: 8,
        dialog: "A: Can you help me move this weekend?\nB: Sure, just let me _____ my schedule first.",
        blank: "_____",
        options: ["check", "see", "look", "view"],
        answer: 0,
    },
    {
        id: 9,
        dialog: "A: What do you think about the new policy?\nB: Honestly, I'm not _____ with it at all.",
        blank: "_____",
        options: ["happy", "satisfied", "pleased", "comfortable"],
        answer: 3,
    },
    {
        id: 10,
        dialog: "A: The traffic is terrible today.\nB: We should have _____ earlier.",
        blank: "_____",
        options: ["left", "gone", "started", "departed"],
        answer: 0,
    },
    {
        id: 11,
        dialog: "A: I'm thinking of starting a business.\nB: That's a big decision. Have you _____ it through?",
        blank: "_____",
        options: ["thought", "considered", "planned", "figured"],
        answer: 0,
    },
    {
        id: 12,
        dialog: "A: Why didn't you answer my call?\nB: Sorry, I was in a meeting and had to _____ my phone.",
        blank: "_____",
        options: ["silence", "mute", "turn off", "ignore"],
        answer: 1,
    },
    {
        id: 13,
        dialog: "A: The deadline is tomorrow!\nB: Don't worry, we'll _____ it in time.",
        blank: "_____",
        options: ["finish", "complete", "make", "do"],
        answer: 2,
    },
    {
        id: 14,
        dialog: "A: How do you stay so fit?\nB: I _____ out at the gym every morning.",
        blank: "_____",
        options: ["work", "exercise", "train", "practice"],
        answer: 0,
    },
    {
        id: 15,
        dialog: "A: Did you enjoy the book?\nB: Yes, I couldn't _____ it down!",
        blank: "_____",
        options: ["put", "set", "lay", "place"],
        answer: 0,
    },
    {
        id: 16,
        dialog: "A: I'm nervous about the presentation.\nB: Just take a deep breath and _____ calm.",
        blank: "_____",
        options: ["stay", "keep", "remain", "be"],
        answer: 0,
    },
    {
        id: 17,
        dialog: "A: Where did you learn to cook so well?\nB: I _____ it up from my grandmother.",
        blank: "_____",
        options: ["picked", "took", "got", "learned"],
        answer: 0,
    },
    {
        id: 18,
        dialog: "A: The movie was so sad.\nB: I know, I almost _____ at the end.",
        blank: "_____",
        options: ["cried", "wept", "sobbed", "teared"],
        answer: 0,
    },
    {
        id: 19,
        dialog: "A: Can I borrow your car?\nB: Sure, but please _____ it back by 6.",
        blank: "_____",
        options: ["bring", "return", "give", "take"],
        answer: 0,
    },
    {
        id: 20,
        dialog: "A: I failed the test again.\nB: Don't give up. Practice makes _____.",
        blank: "_____",
        options: ["perfect", "better", "success", "progress"],
        answer: 0,
    },
    {
        id: 21,
        dialog: "A: How's your new job?\nB: Great! I'm really _____ to the work environment now.",
        blank: "_____",
        options: ["used", "accustomed", "adapted", "adjusted"],
        answer: 0,
    },
    {
        id: 22,
        dialog: "A: Why did you quit your job?\nB: I needed a change. I was _____ of doing the same thing every day.",
        blank: "_____",
        options: ["tired", "bored", "sick", "fed up"],
        answer: 0,
    },
    {
        id: 23,
        dialog: "A: The weather looks nice today.\nB: Yes, let's _____ advantage of it and go for a walk.",
        blank: "_____",
        options: ["take", "get", "have", "make"],
        answer: 0,
    },
    {
        id: 24,
        dialog: "A: I don't understand this problem.\nB: Let me _____ it down for you.",
        blank: "_____",
        options: ["break", "write", "put", "take"],
        answer: 0,
    },
    {
        id: 25,
        dialog: "A: Are you coming to the party?\nB: I'm not sure. It _____ on how I feel later.",
        blank: "_____",
        options: ["depends", "relies", "based", "counts"],
        answer: 0,
    },
    {
        id: 26,
        dialog: "A: The project failed.\nB: We need to _____ out what went wrong.",
        blank: "_____",
        options: ["figure", "find", "work", "sort"],
        answer: 0,
    },
    {
        id: 27,
        dialog: "A: I'm thinking of dyeing my hair.\nB: Really? What color do you have in _____?",
        blank: "_____",
        options: ["mind", "thought", "idea", "plan"],
        answer: 0,
    },
    {
        id: 28,
        dialog: "A: Sorry I'm late.\nB: That's okay. Better late _____ never.",
        blank: "_____",
        options: ["than", "then", "that", "as"],
        answer: 0,
    },
    {
        id: 29,
        dialog: "A: How did you know about the surprise party?\nB: Someone accidentally _____ the beans.",
        blank: "_____",
        options: ["spilled", "dropped", "threw", "poured"],
        answer: 0,
    },
    {
        id: 30,
        dialog: "A: I heard you won the lottery!\nB: Just a small prize. Nothing to _____ home about.",
        blank: "_____",
        options: ["write", "tell", "talk", "speak"],
        answer: 0,
    },
    {
        id: 31,
        dialog: "A: Can you keep a secret?\nB: Of course! My lips are _____.",
        blank: "_____",
        options: ["sealed", "closed", "shut", "locked"],
        answer: 0,
    },
    {
        id: 32,
        dialog: "A: I'm so stressed about the exam.\nB: You'll do fine. Just keep your _____ up!",
        blank: "_____",
        options: ["chin", "head", "spirit", "hope"],
        answer: 0,
    },
];

// 랜덤 문제 가져오기 (선택지 셔플 포함)
export function getRandomQuestion(): Question {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = { ...questions[randomIndex] };

    // 선택지 셔플
    const shuffledOptions = [...question.options];
    const correctAnswer = shuffledOptions[question.answer];

    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    // 새로운 정답 인덱스 찾기
    question.options = shuffledOptions;
    question.answer = shuffledOptions.indexOf(correctAnswer);

    return question;
}
