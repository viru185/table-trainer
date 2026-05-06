# 🎮 Table Trainer

> Master multiplication with a modern, game-first learning experience

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![React](https://img.shields.io/badge/React-19.2-blue) ![Vite](https://img.shields.io/badge/Vite-8.0-brightgreen)

[Play Table Trainer](https://www.virenhirpara.com/table-trainer/) • [Author](https://www.virenhirpara.com/) • [Report an Issue](https://github.com/viru185/table-trainer/issues)

---

## ✨ Features

- **🎯 Game-First Design** - Immersive, fullscreen gameplay inspired by Duolingo
- **⚡ Multiple Difficulty Modes** - Easy (1-5), Medium (6-12), Hard (13-20), Custom
- **🎮 Game Modes** - Quick (5Q), Standard (10Q), Marathon (20Q)
- **🧠 Smart Question Generation** - Deterministic, non-repeating questions per session
- **🔥 Progression System** - Streak tracking, XP rewards, level progression
- **🎵 Audio Feedback** - Satisfying sound effects for correct/wrong answers
- **📊 Statistics** - Track accuracy, best streaks, and skill levels
- **📱 Mobile-First** - Responsive design for all devices
- **⌨️ Keyboard Support** - Fast input with keyboard shortcuts
- **🌙 Dark Theme** - Modern neon-accented UI with smooth animations

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/table-trainer.git
cd table-trainer

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/table-trainer/` in your browser

### Build for Production

```bash
npm run build
npm run preview  # Test production build
```

---

## 🎮 How to Play

### Home Screen

Start by viewing your stats:

- **🔥 Best Streak** - Your longest consecutive correct answers
- **⭐ Level** - Your current progression level
- **📊 Accuracy** - Your overall accuracy percentage
- **⚡ XP** - Experience points earned

### Step 1: Choose Difficulty

Select from four difficulty levels:

| Level         | Tables      | Recommended  |
| ------------- | ----------- | ------------ |
| 🟢 **Easy**   | 1–5         | Beginners    |
| 🟡 **Medium** | 6–12        | Intermediate |
| 🔴 **Hard**   | 13–20       | Advanced     |
| 🟣 **Custom** | Your choice | Any level    |

**Custom Mode**: Pick any table numbers (e.g., 21, 23, 25)

### Step 2: Select Game Mode

- **⚡ Quick** - 5 questions (2-3 minutes)
- **📋 Standard** - 10 questions (5-7 minutes)
- **🏃 Marathon** - 20 questions (10-15 minutes)

### Step 3: Play

- Read the multiplication question: `7 × 8 = ?`
- Type your answer and press **ENTER** or click **Check**
- Instant feedback with animations
- Auto-advance after 1.2 seconds
- Track your **streak**, **score**, and **time**

### Step 4: Results

See your performance:

- Final score and accuracy
- Best streak achieved
- Time spent per question
- Weak multiplication tables

---

## 🧠 Question System

**No Repetition Guaranteed** - Each session generates a unique, shuffled pool:

```
Easy Mode (1-5): 5 tables × 10 multipliers = 50 possible combinations
   ↓ Shuffle once at start
   ↓ Serve sequentially (no repeats)
```

**Multiplier Rule**: Second number is always **1–10** (all modes)

- Example: 7 × 1, 7 × 2, ... 7 × 10

---

## 📈 Progression & Rewards

### XP System

- **+10 XP** per correct answer
- **+Bonus XP** for streaks (every 5 consecutive correct = +5 bonus)

### Levels

- Level up every **100 XP**
- Track progress with visual XP bar
- Stats persist in **localStorage**

### Streaks & Records

- Track current streak and best streak
- Streak resets on wrong answer
- Combo multiplier shown in-game

---

## 🛠️ Technology Stack

### Frontend

- **React 19.2** - UI library
- **Vite 8.0** - Fast bundler
- **Tailwind CSS 4.2** - Utility-first styling
- **Framer Motion 12.38** - Animations
- **Lucide Icons 1.14** - UI icons

### Development

- **ESLint** - Code quality
- **Vite PostCSS** - CSS processing
- **GitHub Pages** - Hosting

---

## 📁 Project Structure

```
table-trainer/
├── src/
│   ├── components/
│   │   ├── HomeScreen.jsx           # Game lobby
│   │   ├── DifficultySelection.jsx  # Difficulty picker
│   │   ├── CustomTableSelection.jsx # Custom table input
│   │   ├── GameScreen.jsx           # Game gameplay
│   │   ├── Settings.jsx             # Settings
│   │   └── EndScreen.jsx            # Results screen
│   ├── utils/
│   │   ├── questions.js  # Question generation logic
│   │   └── sounds.js     # Audio feedback
│   ├── App.jsx           # Main app & routing
│   └── main.jsx          # Entry point
├── public/               # Static assets
└── package.json         # Dependencies
```

---

## 🎨 Design Philosophy

### Game-First UX

- **Minimal decisions** - Max 3-5 choices per screen
- **Fast feedback** - Instant correct/wrong indication
- **Progressive difficulty** - Presets + custom mode
- **One action at a time** - Clear focus per screen

### Visual Style

- **Dark theme** with neon blue/purple accents
- **Rounded cards** and smooth animations
- **Large typography** for readability
- **Responsive design** for mobile to desktop

### Performance

- **Deterministic generation** - No runtime delays
- **Lightweight bundles** - ~107 KB gzipped
- **Smooth 60fps** - Framer Motion optimized

---

## 🚀 Features in Development

- [ ] Daily challenges
- [ ] Leaderboard (local storage)
- [ ] Wrong answer review round
- [ ] Theme customization
- [ ] Difficulty presets customization

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 💡 Tips for Best Experience

✅ **Do:**

- Practice one difficulty level at a time
- Take breaks between long sessions
- Track your progress over time
- Use Custom Mode to focus on weak tables

❌ **Don't:**

- Rush through questions - accuracy > speed
- Ignore weak tables - target them with Custom Mode
- Skip settings - adjust if needed

---

## 🐛 Troubleshooting

### Questions repeating?

**Expected behavior:** All questions within a session are unique and shuffled.

### Sound not working?

- Check browser audio permissions
- Toggle Sound in Settings

### Stats not saving?

- Browser localStorage must be enabled
- Check browser storage space

---

## 📊 Performance

| Metric                | Value     |
| --------------------- | --------- |
| Bundle Size (gzipped) | 107 KB    |
| CSS Size              | 5.44 KB   |
| Build Time            | ~1 second |
| Lighthouse Score      | 95+       |

---

<div align="center">

**Made with ❤️ for learners everywhere**

[⭐ Star this repo](https://github.com/viru185/table-trainer) • [🐛 Report Issue](https://github.com/viru185/table-trainer/issues) • [💬 Discuss](#)

</div>
