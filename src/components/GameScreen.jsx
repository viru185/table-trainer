import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, CheckCircle, XCircle } from 'lucide-react';
import { playCorrectSound, playWrongSound } from '../utils/sounds';

export default function GameScreen({ question, onAnswer, streak, score, total, current, elapsed, onEnd }) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && !showResult) {
      inputRef.current.focus();
    }
  }, [question, showResult]);

  useEffect(() => {
    if (current >= total) {
      onEnd();
    }
  }, [current, total, onEnd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showResult) {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (!question) return;
    const numeric = parseInt(answer, 10);
    if (isNaN(numeric)) return;

    const correct = numeric === question.answer;
    setFeedback({
      correct,
      message: correct ? 'Correct!' : `Wrong! ${question.a} × ${question.b} = ${question.answer}`
    });
    setShowResult(true);
    if (correct) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
    onAnswer(correct);

    // Auto-move to next question after 1.2 seconds
    setTimeout(() => {
      nextQuestion();
    }, 1200);
  };

  const nextQuestion = () => {
    setAnswer('');
    setFeedback(null);
    setShowResult(false);
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  if (!question) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-300">
            <Clock className="h-5 w-5 mr-2" />
            {formatTime(elapsed)}
          </div>
          <div className="flex items-center text-orange-400">
            <Flame className="h-5 w-5 mr-2" />
            {streak} {streak > 1 && `x${Math.floor(streak / 2) + 1}`}
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-400">
          {current + 1} / {total}
        </div>
      </motion.div>

      {/* Question */}
      <motion.div
        key={question.a + '-' + question.b}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <div className="bg-white/10 rounded-3xl p-8 backdrop-blur shadow-2xl">
          <h1 className="text-6xl font-black mb-4">
            {question.a} × {question.b} = ?
          </h1>
        </div>
      </motion.div>

      {/* Input */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="Your answer"
          className="w-full text-center text-3xl p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          disabled={showResult}
        />
        <button
          type="submit"
          disabled={showResult || answer === ''}
          className={`w-full mt-4 py-4 px-6 rounded-2xl font-bold text-xl transition-all ${
            showResult
              ? feedback?.correct
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-red-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg'
          }`}
        >
          {showResult ? (feedback?.correct ? '✓ Correct!' : '✗ Wrong!') : 'Check'}
        </button>
      </motion.form>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-6 p-4 rounded-2xl flex items-center ${
              feedback.correct
                ? 'bg-green-500/20 border border-green-400/30'
                : 'bg-red-500/20 border border-red-400/30'
            }`}
          >
            {feedback.correct ? (
              <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
            ) : (
              <XCircle className="h-6 w-6 text-red-400 mr-3" />
            )}
            <span className="text-lg font-semibold">{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}