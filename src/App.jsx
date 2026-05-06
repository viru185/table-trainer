import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeScreen from './components/HomeScreen';
import DifficultySelection from './components/DifficultySelection';
import CustomTableSelection from './components/CustomTableSelection';
import GameScreen from './components/GameScreen';
import Settings from './components/Settings';
import EndScreen from './components/EndScreen';
import { generateQuestions, shuffle } from './utils/questions';

const DIFFICULTIES = {
  easy: { tables: [1,2,3,4,5] },
  medium: { tables: [6,7,8,9,10,11,12] },
  hard: { tables: [13,14,15,16,17,18,19,20] },
  custom: { tables: [] }
};

const GAME_MODES = {
  quick: 5,
  standard: 10,
  marathon: 20
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [difficulty, setDifficulty] = useState('easy');
  const [gameMode, setGameMode] = useState('standard');
  const [customTables, setCustomTables] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => parseInt(localStorage.getItem('bestStreak') || '0'));
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('level') || '1'));
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('xp') || '0'));
  const [accuracy, setAccuracy] = useState(() => parseInt(localStorage.getItem('accuracy') || '0'));
  const [gameStartTime, setGameStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    localStorage.setItem('bestStreak', bestStreak);
    localStorage.setItem('level', level);
    localStorage.setItem('xp', xp);
    localStorage.setItem('accuracy', accuracy);
  }, [bestStreak, level, xp, accuracy]);

  useEffect(() => {
    let interval;
    if (screen === 'game' && gameStartTime) {
      interval = setInterval(() => {
        setElapsed(Date.now() - gameStartTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [screen, gameStartTime]);

  const startGame = () => {
    const diff = DIFFICULTIES[difficulty];
    const tables = difficulty === 'custom' ? customTables : diff.tables;
    let q = generateQuestions(tables);
    q = shuffle(q).slice(0, GAME_MODES[gameMode]); // Limit to game mode
    setQuestions(q);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setGameStartTime(Date.now());
    setElapsed(0);
    setScreen('game');
  };

  const answerQuestion = (correct) => {
    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setXp(currentXp => currentXp + 10 + Math.floor(newStreak / 5) * 5); // Bonus XP for streaks
        return newStreak;
      });
    } else {
      setStreak(0);
    }
    setBestStreak(prev => Math.max(prev, streak + (correct ? 1 : 0)));
    setCurrentIndex(prev => prev + 1);
  };

  const endGame = () => {
    const total = questions.length;
    const acc = total > 0 ? Math.round((score / total) * 100) : 0;
    setAccuracy(acc);
    setLevel(prev => Math.floor(xp / 100) + 1); // Simple level calc
    setScreen('end');
  };

  const resetGame = () => {
    setScreen('home');
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setElapsed(0);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onStart={() => setScreen('difficulty')} onSettings={() => setScreen('settings')} bestStreak={bestStreak} level={level} accuracy={accuracy} xp={xp} />;
      case 'difficulty':
        return <DifficultySelection onSelect={(diff) => { setDifficulty(diff); if (diff === 'custom') setScreen('customSelection'); else setScreen('gameMode'); }} onBack={() => setScreen('home')} />;
      case 'customSelection':
        return <CustomTableSelection onSelect={(tables) => { setCustomTables(tables); setScreen('gameMode'); }} onBack={() => setScreen('difficulty')} />;
      case 'gameMode':
        return <GameModeSelection onSelect={(mode) => { setGameMode(mode); startGame(); }} onBack={() => setScreen(difficulty === 'custom' ? 'customSelection' : 'difficulty')} />;
      case 'game':
        return <GameScreen question={questions[currentIndex]} onAnswer={answerQuestion} streak={streak} score={score} total={questions.length} current={currentIndex} elapsed={elapsed} onEnd={endGame} />;
      case 'settings':
        return <Settings onBack={() => setScreen('home')} />;
      case 'end':
        return <EndScreen score={score} total={questions.length} accuracy={Math.round((score / questions.length) * 100)} bestStreak={bestStreak} elapsed={elapsed} onPlayAgain={resetGame} onHome={() => setScreen('home')} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Simple GameModeSelection component inline for now
function GameModeSelection({ onSelect, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Choose Game Mode</h1>
      <div className="grid gap-4 max-w-md w-full">
        {Object.entries(GAME_MODES).map(([key, count]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-center"
          >
            <h2 className="text-2xl font-semibold capitalize">{key}</h2>
            <p className="text-sm opacity-75">{count} questions</p>
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-8 text-sm opacity-50">Back</button>
    </div>
  );
}
