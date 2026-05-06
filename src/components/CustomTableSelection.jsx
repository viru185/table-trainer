import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X } from 'lucide-react';

export default function CustomTableSelection({ onSelect, onBack }) {
  const [input, setInput] = useState('');
  const [tables, setTables] = useState([]);

  const handleAddTable = () => {
    const num = parseInt(input, 10);
    if (!isNaN(num) && num > 0 && !tables.includes(num)) {
      setTables([...tables, num].sort((a, b) => a - b));
      setInput('');
    }
  };

  const handleRemoveTable = (table) => {
    setTables(tables.filter(t => t !== table));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTable();
    }
  };

  const handleStart = () => {
    if (tables.length > 0) {
      onSelect(tables);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Custom Tables</h1>
        <p className="text-gray-300">Select the tables you want to practice</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md"
      >
        {/* Input Section */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter table number (e.g., 21)"
              min="1"
              className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddTable}
              className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Press ENTER or click Add to add a table</p>
        </div>

        {/* Selected Tables */}
        <div className="bg-white/10 rounded-2xl p-6 mb-6 backdrop-blur">
          {tables.length === 0 ? (
            <p className="text-gray-400 text-center">No tables selected yet</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {tables.map((table) => (
                <motion.div
                  key={table}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 bg-blue-500/30 border border-blue-400 rounded-full px-4 py-2"
                >
                  <span className="font-semibold">{table}</span>
                  <button
                    onClick={() => handleRemoveTable(table)}
                    className="hover:text-red-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Start Button */}
        <motion.button
          onClick={handleStart}
          disabled={tables.length === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-xl transition-all ${
            tables.length > 0
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onBack}
        className="mt-8 flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </motion.button>
    </div>
  );
}
