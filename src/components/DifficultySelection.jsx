import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Zap, Trophy, Sparkles } from 'lucide-react';

const difficulties = [
  {
    key: 'easy',
    title: 'Easy',
    tables: '1–5',
    icon: Star,
    color: 'from-green-400 to-blue-500',
    description: 'Perfect for beginners'
  },
  {
    key: 'medium',
    title: 'Medium',
    tables: '6–12',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    description: 'Build your skills'
  },
  {
    key: 'hard',
    title: 'Hard',
    tables: '13–20',
    icon: Trophy,
    color: 'from-red-400 to-pink-500',
    description: 'Challenge yourself'
  },
  {
    key: 'custom',
    title: 'Custom',
    tables: 'Your choice',
    icon: Sparkles,
    color: 'from-purple-400 to-indigo-500',
    description: 'Pick any tables'
  }
];

export default function DifficultySelection({ onSelect, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Choose Difficulty</h1>
        <p className="text-gray-300">Select the tables you want to practice</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 max-w-md w-full mb-8"
      >
        {difficulties.map((diff, index) => (
          <motion.button
            key={diff.key}
            onClick={() => onSelect(diff.key)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full p-6 rounded-2xl bg-gradient-to-r ${diff.color} text-white text-left transition-all shadow-lg hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">{diff.title}</h2>
                <p className="text-sm opacity-90">Tables {diff.tables}</p>
                <p className="text-xs opacity-75 mt-1">{diff.description}</p>
              </div>
              <diff.icon className="h-8 w-8 opacity-80" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onBack}
        className="flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </motion.button>
    </div>
  );
}