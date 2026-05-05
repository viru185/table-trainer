import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
  XCircle,
  Clock3,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const MIN_TABLE = 1;
const DEFAULT_MAX_TABLE_SLIDER = 100;

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeQuestion(selectedTables, maxMultiplier) {
  const a = pickRandom(selectedTables);
  const b = Math.floor(Math.random() * maxMultiplier) + 1;
  const answer = a * b;
  return { a, b, answer };
}

function formatTables(tables) {
  if (tables.length === 0) return "None";
  if (tables.length <= 4) return tables.join(", ");
  return `${tables.slice(0, 4).join(", ")} + ${tables.length - 4} more`;
}

export default function App() {
  const [maxTable, setMaxTable] = useState(12);
  const tables = useMemo(() => {
    const safeMax = Math.max(maxTable, MIN_TABLE);
    return Array.from({ length: safeMax }, (_, i) => i + 1);
  }, [maxTable]);
  const sliderMaxTable = Math.max(DEFAULT_MAX_TABLE_SLIDER, Math.max(maxTable, MIN_TABLE));
  const [selectedTables, setSelectedTables] = useState([2, 3, 4, 5]);
  const [maxMultiplier, setMaxMultiplier] = useState(12);
  const [questionCount, setQuestionCount] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const inputRef = useRef(null);

  const totalQuestions = questionCount;
  const progressValue = gameStarted ? Math.min((attempts / totalQuestions) * 100, 100) : 0;
  const isFinished = gameStarted && attempts >= totalQuestions;

  const accuracy = useMemo(() => {
    if (attempts === 0) return 0;
    return Math.round((score / attempts) * 100);
  }, [score, attempts]);

  const avgSecondsPerQuestion = useMemo(() => {
    if (attempts === 0) return 0;
    return (elapsed / attempts).toFixed(1);
  }, [elapsed, attempts]);

  const summary = useMemo(() => {
    const weak = history.filter((item) => !item.correct);
    const weakTables = [...new Set(weak.map((item) => item.a))].sort((a, b) => a - b);
    return {
      weakTables,
      perfect: attempts > 0 && score === attempts,
    };
  }, [history, attempts, score]);

  useEffect(() => {
    let interval;
    if (gameStarted && !isFinished) {
      interval = setInterval(() => setElapsed((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, isFinished]);

  useEffect(() => {
    if (gameStarted && question && !showResult && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameStarted, question, showResult]);

  useEffect(() => {
    setSelectedTables((prev) => prev.filter((table) => table <= maxTable));
  }, [maxTable]);

  const startGame = () => {
    const next = makeQuestion(selectedTables, maxMultiplier);
    setQuestion(next);
    setGameStarted(true);
    setScore(0);
    setAttempts(0);
    setStreak(0);
    setBestStreak(0);
    setFeedback(null);
    setAnsweredCorrectly(false);
    setShowResult(false);
    setHistory([]);
    setAnswer("");
    setElapsed(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setQuestion(null);
    setAnswer("");
    setFeedback(null);
    setShowResult(false);
  };

  const toggleTable = (table) => {
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table].sort((a, b) => a - b)
    );
  };

  const checkAnswer = () => {
    if (!question) return;
    const numeric = Number.parseInt(answer, 10);
    if (Number.isNaN(numeric)) return;

    const correct = numeric === question.answer;
    const nextAttempts = attempts + 1;
    const nextScore = score + (correct ? 1 : 0);
    const nextStreak = correct ? streak + 1 : 0;

    setAttempts(nextAttempts);
    setScore(nextScore);
    setStreak(nextStreak);
    setBestStreak(Math.max(bestStreak, nextStreak));
    setAnsweredCorrectly(correct);
    setShowResult(true);
    setFeedback(
      correct
        ? `Nice! ${question.a} × ${question.b} = ${question.answer}`
        : `Not quite. ${question.a} × ${question.b} = ${question.answer}`
    );
    setHistory((prev) => [
      {
        a: question.a,
        b: question.b,
        given: numeric,
        correct,
        answer: question.answer,
      },
      ...prev,
    ]);
  };

  const nextQuestion = () => {
    if (attempts >= totalQuestions) return;
    setAnswer("");
    setFeedback(null);
    setShowResult(false);
    setAnsweredCorrectly(false);
    setQuestion(makeQuestion(selectedTables, maxMultiplier));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showResult) checkAnswer();
    else nextQuestion();
  };

  const selectedCount = selectedTables.length;
  const canStart = selectedCount > 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(to_bottom_right,_#0f172a,_#111827,_#020617)] text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 md:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Multiplication practice
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Table Trainer</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
              Pick the tables you want, set the difficulty, and start a fast, focused practice game.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-300">Best streak</p>
                <p className="text-2xl font-semibold">{bestStreak}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-6">
            <Card className="border-white/10 bg-white/5 text-slate-50 shadow-2xl backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="h-5 w-5 text-blue-300" />
                  Choose tables to practice
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Select one or many tables. You can practice only the ones you need.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-6">
                  {tables.map((table) => {
                    const active = selectedTables.includes(table);
                    return (
                      <button
                        key={table}
                        onClick={() => toggleTable(table)}
                        className={cn(
                          "rounded-2xl border px-3 py-3 text-lg font-semibold transition-all duration-200",
                          active
                            ? "border-blue-400 bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                            : "border-white/10 bg-white/5 text-slate-200 hover:border-white/25 hover:bg-white/10"
                        )}
                        aria-pressed={active}
                      >
                        {table}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" className="rounded-full bg-white/10 text-slate-100 hover:bg-white/15" onClick={() => setSelectedTables(tables)}>
                    Select all
                  </Button>
                  <Button variant="secondary" className="rounded-full bg-white/10 text-slate-100 hover:bg-white/15" onClick={() => setSelectedTables([])}>
                    Clear
                  </Button>
                  <div className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                    Selected: <span className="font-semibold text-white">{formatTables(selectedTables)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-slate-50 shadow-2xl backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Game settings</CardTitle>
                <CardDescription className="text-slate-300">Keep it simple, fast, and repeatable.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <Label className="text-sm text-slate-300">Highest table to practice: {maxTable}</Label>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Slider
                      value={[maxTable]}
                      min={MIN_TABLE}
                      max={sliderMaxTable}
                      step={1}
                      onValueChange={(v) => setMaxTable(v[0])}
                    />
                    <Input
                      type="number"
                      value={maxTable}
                      min={MIN_TABLE}
                      step={1}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (Number.isInteger(value) && value >= MIN_TABLE) {
                          setMaxTable(value);
                        }
                      }}
                      className="w-full sm:w-24"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Enter any table number and the list will adjust automatically.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <Label className="text-sm text-slate-300">Maximum number in second factor: {maxMultiplier}</Label>
                  </div>
                  <Slider value={[maxMultiplier]} min={1} max={12} step={1} onValueChange={(v) => setMaxMultiplier(v[0])} />
                  <p className="text-xs text-slate-400">Example: if set to 6, questions will use numbers from 1 to 6 in the second spot.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <Label className="text-sm text-slate-300">Questions per session: {questionCount}</Label>
                  </div>
                  <Slider value={[questionCount]} min={5} max={30} step={1} onValueChange={(v) => setQuestionCount(v[0])} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    onClick={startGame}
                    disabled={!canStart}
                    className="h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-400 hover:to-indigo-500"
                  >
                    Start game
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={resetGame}
                    variant="outline"
                    className="h-12 rounded-2xl border-white/15 bg-white/5 text-slate-100 hover:bg-white/10"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6">
            <Card className="relative overflow-hidden border-white/10 bg-white/5 text-slate-50 shadow-2xl backdrop-blur">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400" />
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">Practice round</CardTitle>
                    <CardDescription className="text-slate-300">
                      {gameStarted ? "Answer the question and keep your streak going." : "Start a game to begin."}
                    </CardDescription>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                    <p className="text-xs text-slate-400">Progress</p>
                    <p className="text-lg font-semibold">{attempts}/{totalQuestions}</p>
                  </div>
                </div>
                <Progress value={progressValue} className="h-2 bg-white/10" />
              </CardHeader>

              <CardContent className="space-y-5">
                {!gameStarted ? (
                  <div className="grid gap-4 rounded-3xl border border-dashed border-white/10 bg-black/20 p-8 text-center">
                    <div className="mx-auto rounded-full bg-blue-500/15 p-4 text-blue-300">
                      <Zap className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Ready when you are</h2>
                      <p className="mt-2 text-sm text-slate-300">
                        Select one or more tables on the left, then press Start game.
                      </p>
                    </div>
                  </div>
                ) : isFinished ? (
                  <div className="space-y-5 rounded-3xl border border-white/10 bg-black/20 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold">Session complete</h2>
                        <p className="text-sm text-slate-300">Here is your result summary.</p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <Stat label="Score" value={`${score}/${totalQuestions}`} />
                      <Stat label="Accuracy" value={`${accuracy}%`} />
                      <Stat label="Best streak" value={bestStreak} />
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-2 text-sm text-slate-300">
                      <p>Average time per question: <span className="font-semibold text-white">{avgSecondsPerQuestion}s</span></p>
                      <p>Weak tables: <span className="font-semibold text-white">{summary.weakTables.length ? summary.weakTables.join(", ") : "None"}</span></p>
                      {summary.perfect ? <p className="text-emerald-300">Perfect round. Great job.</p> : null}
                    </div>

                    <Button onClick={startGame} className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500">
                      Play again
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-inner">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Clock3 className="h-4 w-4" />
                          Time: {elapsed}s
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="rounded-full bg-white/10 px-3 py-1">Streak {streak}</span>
                          <span className="rounded-full bg-white/10 px-3 py-1">Accuracy {accuracy}%</span>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${question?.a}-${question?.b}-${attempts}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="text-center"
                        >
                          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-slate-400">Question</p>
                          <div className="mx-auto flex min-h-[120px] items-center justify-center rounded-3xl bg-gradient-to-br from-white/10 to-white/5 px-4 py-6">
                            <h2 className="text-5xl font-black tracking-tight md:text-6xl">
                              {question?.a} × {question?.b} = ?
                            </h2>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="answer" className="text-sm text-slate-300">
                          Your answer
                        </Label>
                        <Input
                          ref={inputRef}
                          id="answer"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ""))}
                          inputMode="numeric"
                          placeholder="Type the answer"
                          className="h-14 rounded-2xl border-white/10 bg-white/5 text-center text-2xl text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                        />
                      </div>

                      <Button
                        type="submit"
                        className={cn(
                          "h-14 w-full rounded-2xl text-base font-semibold text-white shadow-lg transition-all",
                          showResult
                            ? answeredCorrectly
                              ? "bg-emerald-500 hover:bg-emerald-400"
                              : "bg-rose-500 hover:bg-rose-400"
                            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500"
                        )}
                        disabled={answer.length === 0 && !showResult}
                      >
                        {showResult ? (attempts >= totalQuestions ? "Finish" : "Next question") : "Check answer"}
                      </Button>
                    </form>

                    <AnimatePresence>
                      {feedback ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className={cn(
                            "flex items-start gap-3 rounded-2xl border p-4",
                            answeredCorrectly ? "border-emerald-400/20 bg-emerald-500/10" : "border-rose-400/20 bg-rose-500/10"
                          )}
                        >
                          {answeredCorrectly ? (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                          ) : (
                            <XCircle className="mt-0.5 h-5 w-5 text-rose-300" />
                          )}
                          <div>
                            <p className="font-semibold">{answeredCorrectly ? "Correct" : "Try the next one"}</p>
                            <p className="text-sm text-slate-200">{feedback}</p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-slate-50 shadow-2xl backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Live stats</CardTitle>
                <CardDescription className="text-slate-300">A quick look at your session.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                <Stat label="Correct" value={score} />
                <Stat label="Wrong" value={attempts - score} />
                <Stat label="Questions" value={attempts} />
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-slate-50 shadow-2xl backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Recent answers</CardTitle>
                <CardDescription className="text-slate-300">Your latest attempts appear here.</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-slate-400">No answers yet.</p>
                ) : (
                  <div className="max-h-64 space-y-2 overflow-auto pr-1">
                    {history.slice(0, 6).map((item, index) => (
                      <div key={`${item.a}-${item.b}-${index}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                        <div>
                          <p className="font-medium">{item.a} × {item.b}</p>
                          <p className="text-xs text-slate-400">Your answer: {item.given}</p>
                        </div>
                        <Badge className={item.correct ? "bg-emerald-500 text-white hover:bg-emerald-500" : "bg-rose-500 text-white hover:bg-rose-500"}>
                          {item.correct ? "Correct" : `Ans ${item.answer}`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
