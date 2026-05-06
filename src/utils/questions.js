export function generateQuestions(tables) {
    const questions = [];
    for (const a of tables) {
        for (let b = 1; b <= 10; b++) {
            questions.push({ a, b, answer: a * b });
        }
    }
    return questions;
}

export function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
