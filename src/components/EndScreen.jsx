import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Clock, Target, Flame } from 'lucide-react';

export default function EndScreen({ score, total, accuracy, bestStreak, elapsed, onPlayAgain, onHome }) {
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-6 inline-block mb-4">
          <Trophy className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Game Complete!</h1>
        <p className="text-gray-300">Great job on completing the session</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4 max-w-md w-full mb-8"
      >
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Score</p>
          <p className="text-2xl font-bold">{score}/{total}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Flame className="h-8 w-8 text-orange-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Accuracy</p>
          <p className="text-2xl font-bold">{accuracy}%</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Best Streak</p>
          <p className="text-2xl font-bold">{bestStreak}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Time</p>
          <p className="text-2xl font-bold">{formatTime(elapsed)}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 w-full max-w-md"
      >
        <button
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
        >
          <RotateCcw className="inline h-5 w-5 mr-2" />
          Play Again
        </button>
        <button
          onClick={onHome}
          className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-all"
        >
          <Home className="inline h-5 w-5 mr-2" />
          Home
        </button>
      </motion.div>
    </div>
  );
}