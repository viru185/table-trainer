import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';

export default function Settings({ onBack }) {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="bg-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {soundEnabled ? (
                <Volume2 className="h-6 w-6 mr-3 text-blue-400" />
              ) : (
                <VolumeX className="h-6 w-6 mr-3 text-gray-400" />
              )}
              <span className="text-lg font-semibold">Sound Effects</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
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