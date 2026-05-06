import React from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Flame, Star, Target, Zap } from 'lucide-react';

export default function HomeScreen({ onStart, onSettings, bestStreak, level, accuracy, xp }) {
  const xpForNextLevel = level * 100;
  const currentLevelXp = (level - 1) * 100;
  const progress = ((xp - currentLevelXp) / 100) * 100;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Table Trainer
        </h1>
        <p className="text-xl text-gray-300">Master multiplication with fun!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-2xl"
      >
        <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur">
          <Flame className="h-8 w-8 text-orange-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Best Streak</p>
          <p className="text-3xl font-bold">{bestStreak}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur">
          <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Level</p>
          <p className="text-3xl font-bold">{level}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur">
          <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Accuracy</p>
          <p className="text-3xl font-bold">{accuracy}%</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur">
          <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">XP</p>
          <p className="text-3xl font-bold">{xp}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md mb-8"
      >
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Level {level}</span>
          <span>{xp}/{xpForNextLevel} XP</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <button
          onClick={onStart}
          className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-lg"
        >
          <Play className="inline h-6 w-6 mr-2" />
          Start Game
        </button>
        <button
          onClick={onSettings}
          className="w-full max-w-xs bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-all"
        >
          <Settings className="inline h-5 w-5 mr-2" />
          Settings
        </button>
      </motion.div>
    </div>
  );
}