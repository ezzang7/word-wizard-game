// ==========================================
// 단어 마법사 (Word Wizard RPG) - Game Engine
// ==========================================

// Word Database for Lower-Grade Elementary Students
const WORD_DATABASE = {
    animals: [
        { word: 'cat', hint: '고양이', emoji: '🐱' },
        { word: 'dog', hint: '개/강아지', emoji: '🐶' },
        { word: 'pig', hint: '돼지', emoji: '🐷' },
        { word: 'cow', hint: '소', emoji: '🐮' },
        { word: 'duck', hint: '오리', emoji: '🦆' },
        { word: 'bear', hint: '곰', emoji: '🐻' },
        { word: 'lion', hint: '사자', emoji: '🦁' },
        { word: 'fox', hint: '여우', emoji: '🦊' },
        { word: 'bird', hint: '새', emoji: '🐦' },
        { word: 'frog', hint: '개구리', emoji: '🐸' },
        { word: 'fish', hint: '물고기', emoji: '🐟' },
        { word: 'rabbit', hint: '토끼', emoji: '🐰' }
    ],
    fruits: [
        { word: 'apple', hint: '사과', emoji: '🍎' },
        { word: 'banana', hint: '바나나', emoji: '🍌' },
        { word: 'grape', hint: '포도', emoji: '🍇' },
        { word: 'lemon', hint: '레몬', emoji: '🍋' },
        { word: 'peach', hint: '복숭아', emoji: '🍑' },
        { word: 'milk', hint: '우유', emoji: '🥛' },
        { word: 'bread', hint: '빵', emoji: '🍞' },
        { word: 'cake', hint: '케이크', emoji: '🎂' },
        { word: 'pizza', hint: '피자', emoji: '🍕' },
        { word: 'candy', hint: '사탕', emoji: '🍬' }
    ],
    colors: [
        { word: 'red', hint: '빨간색', emoji: '🔴' },
        { word: 'blue', hint: '파란색', emoji: '🔵' },
        { word: 'pink', hint: '분홍색', emoji: '🩷' },
        { word: 'green', hint: '초록색', emoji: '🟢' },
        { word: 'yellow', hint: '노란색', emoji: '🟡' },
        { word: 'star', hint: '별', emoji: '⭐️' },
        { word: 'sun', hint: '태양', emoji: '☀️' },
        { word: 'moon', hint: '달', emoji: '🌙' },
        { word: 'heart', hint: '하트', emoji: '❤️' },
        { word: 'ring', hint: '반지', emoji: '💍' }
    ],
    school: [
        { word: 'book', hint: '책', emoji: '📖' },
        { word: 'pen', hint: '펜', emoji: '🖊️' },
        { word: 'desk', hint: '책상', emoji: '🪑' },
        { word: 'bag', hint: '가방', emoji: '🎒' },
        { word: 'bus', hint: '버스', emoji: '🚌' },
        { word: 'box', hint: '상자', emoji: '📦' },
        { word: 'cap', hint: '모자', emoji: '🧢' },
        { word: 'key', hint: '열쇠', emoji: '🔑' },
        { word: 'clock', hint: '시계', emoji: '⏰' },
        { word: 'door', hint: '문', emoji: '🚪' }
    ]
};

// Sound Synthesizer (Web Audio API)
class SoundFx {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    playCorrect() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }

    playWrong() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.setValueAtTime(100, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playMagicSpell() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.25);
    }

    playVictory() {
        if (!this.enabled || !this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.1 + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.1);
            osc.stop(this.ctx.currentTime + idx * 0.1 + 0.3);
        });
    }
}

// Main Game Controller
class WordWizardGame {
    constructor() {
        this.selectedCategory = 'animals';
        this.stage = 1;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.wordsClearedCount = 0;
        
        this.currentWordList = [];
        this.currentWordIndex = 0;
        this.currentWordObj = null;
        this.typedLetters = '';

        this.soundFx = new SoundFx();
        
        // Canvas & Battle Elements
        this.canvas = document.getElementById('battle-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.wizard = { x: 80, y: 220, animationFrame: 0, casting: false };
        this.monster = { x: 620, y: 210, hp: 100, maxHp: 100, emoji: '👾', type: 0, speed: 0.2 };
        this.projectiles = [];
        this.particles = [];
        
        this.animationId = null;

        this.initDOM();
        this.setupKeyboardUI();
        this.bindEvents();
    }

    initDOM() {
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultModal = document.getElementById('result-modal');

        this.stageVal = document.getElementById('stage-val');
        this.scoreVal = document.getElementById('score-val');
        this.comboVal = document.getElementById('combo-val');
        
        this.targetEmoji = document.getElementById('target-emoji');
        this.targetHint = document.getElementById('target-hint');
        this.wordTyped = document.getElementById('word-typed');
        this.wordRemaining = document.getElementById('word-remaining');
    }

    setupKeyboardUI() {
        const keyboardContainer = document.getElementById('virtual-keyboard');
        keyboardContainer.innerHTML = '';
        const rows = [
            ['Q','W','E','R','T','Y','U','I','O','P'],
            ['A','S','D','F','G','H','J','K','L'],
            ['Z','X','C','V','B','N','M']
        ];

        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'kbd-row';
            row.forEach(letter => {
                const btn = document.createElement('button');
                btn.className = 'key-btn';
                btn.dataset.key = letter.toLowerCase();
                btn.textContent = letter;
                btn.addEventListener('click', () => this.handleKeyPress(letter.toLowerCase()));
                rowDiv.appendChild(btn);
            });
            keyboardContainer.appendChild(rowDiv);
        });
    }

    bindEvents() {
        // Category selections
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedCategory = e.target.dataset.cat;
            });
        });

        // Start Game button
        document.getElementById('start-btn').addEventListener('click', () => {
            this.soundFx.init();
            this.startGame();
        });

        // Audio toggle
        const audioBtn = document.getElementById('audio-toggle-btn');
        audioBtn.addEventListener('click', () => {
            this.soundFx.enabled = !this.soundFx.enabled;
            audioBtn.textContent = this.soundFx.enabled ? '🔊' : '🔇';
        });

        // Speech re-play
        document.getElementById('listen-word-btn').addEventListener('click', () => this.speakWord());
        document.getElementById('speak-btn').addEventListener('click', () => this.speakWord());

        // Hint button
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());

        // Next Stage / Restart buttons
        document.getElementById('next-stage-btn').addEventListener('click', () => {
            this.resultModal.classList.remove('active');
            this.stage++;
            this.startStage();
        });
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.resultModal.classList.remove('active');
            this.stage = 1;
            this.score = 0;
            this.startGame();
        });

        // Physical Keyboard listener
        window.addEventListener('keydown', (e) => {
            if (!this.gameScreen.classList.contains('active')) return;
            const key = e.key.toLowerCase();
            if (key >= 'a' && key <= 'z') {
                this.handleKeyPress(key);
                this.animateVirtualKey(key);
            }
        });
    }

    startGame() {
        this.stage = 1;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.wordsClearedCount = 0;

        this.startScreen.classList.remove('active');
        this.gameScreen.classList.add('active');

        this.startStage();
        this.gameLoop();
    }

    startStage() {
        this.stageVal.textContent = this.stage;
        this.updateHUD();

        // Shuffle word list for current category
        const rawList = WORD_DATABASE[this.selectedCategory] || WORD_DATABASE.animals;
        this.currentWordList = [...rawList].sort(() => Math.random() - 0.5);
        this.currentWordIndex = 0;

        this.spawnNextWordMonster();
    }

    spawnNextWordMonster() {
        if (this.currentWordIndex >= this.currentWordList.length) {
            this.showStageClear();
            return;
        }

        this.currentWordObj = this.currentWordList[this.currentWordIndex];
        this.typedLetters = '';

        // UI update
        this.targetEmoji.textContent = this.currentWordObj.emoji;
        this.targetHint.textContent = this.currentWordObj.hint;
        this.updateWordDisplay();

        // Monster Reset
        this.monster.x = 650;
        this.monster.hp = 100;
        this.monster.maxHp = 100;
        this.monster.emoji = this.getMonsterEmoji();
        this.monster.speed = 0.2 + (this.stage * 0.05);

        // Speak Word via Web Speech API
        this.speakWord();
    }

    getMonsterEmoji() {
        const monsters = ['👾', '👻', '👺', '🐲', '🧟', '🧌'];
        return monsters[(this.stage + this.currentWordIndex) % monsters.length];
    }

    updateWordDisplay() {
        this.wordTyped.textContent = this.typedLetters;
        const targetWord = this.currentWordObj.word;
        const remaining = targetWord.slice(this.typedLetters.length);
        this.wordRemaining.textContent = remaining;
    }

    handleKeyPress(letter) {
        if (!this.currentWordObj) return;

        const targetWord = this.currentWordObj.word.toLowerCase();
        const expectedNextChar = targetWord[this.typedLetters.length];

        if (letter === expectedNextChar) {
            // Correct letter typed!
            this.typedLetters += letter;
            this.combo++;
            if (this.combo > this.maxCombo) this.maxCombo = this.combo;
            this.score += 10 * (1 + Math.floor(this.combo / 5));
            this.updateHUD();

            this.soundFx.playCorrect();
            this.soundFx.playMagicSpell();

            // Launch spell projectile
            this.wizard.casting = true;
            setTimeout(() => this.wizard.casting = false, 200);
            this.spawnProjectile();

            // Monster damage
            const letterDamage = 100 / targetWord.length;
            this.monster.hp = Math.max(0, this.monster.hp - letterDamage);

            this.updateWordDisplay();

            // Word completed!
            if (this.typedLetters === targetWord) {
                this.wordsClearedCount++;
                this.soundFx.playVictory();
                this.spawnExplosion(this.monster.x, this.monster.y);
                
                setTimeout(() => {
                    this.currentWordIndex++;
                    this.spawnNextWordMonster();
                }, 400);
            }
        } else {
            // Wrong letter
            this.combo = 0;
            this.updateHUD();
            this.soundFx.playWrong();
            
            // Visual feedback on card
            const displayBox = document.getElementById('monster-target-card');
            displayBox.style.borderColor = '#D63031';
            setTimeout(() => displayBox.style.borderColor = '#6C5CE7', 300);
        }
    }

    animateVirtualKey(key) {
        const btn = document.querySelector(`.key-btn[data-key="${key}"]`);
        if (btn) {
            btn.classList.add('pressed');
            setTimeout(() => btn.classList.remove('pressed'), 150);
        }
    }

    showHint() {
        if (!this.currentWordObj) return;
        const targetWord = this.currentWordObj.word;
        const nextChar = targetWord[this.typedLetters.length];
        if (nextChar) {
            const btn = document.querySelector(`.key-btn[data-key="${nextChar}"]`);
            if (btn) {
                btn.classList.add('correct-highlight');
                setTimeout(() => btn.classList.remove('correct-highlight'), 1000);
            }
        }
    }

    speakWord() {
        if (!this.currentWordObj || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop ongoing speech
        const utterance = new SpeechSynthesisUtterance(this.currentWordObj.word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8; // Slower rate for young learners
        window.speechSynthesis.speak(utterance);
    }

    updateHUD() {
        this.scoreVal.textContent = this.score;
        this.comboVal.textContent = `${this.combo} 🔥`;
    }

    spawnProjectile() {
        this.projectiles.push({
            x: this.wizard.x + 40,
            y: this.wizard.y - 30,
            targetX: this.monster.x,
            targetY: this.monster.y - 30,
            speed: 14,
            radius: 8
        });
    }

    spawnExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 5;
            this.particles.push({
                x: x,
                y: y - 30,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: ['#FFEAA7', '#FD79A8', '#A29BFE', '#00CEC9'][Math.floor(Math.random() * 4)],
                radius: 3 + Math.random() * 4,
                alpha: 1.0,
                life: 30
            });
        }
    }

    showStageClear() {
        document.getElementById('modal-title').textContent = `STAGE ${this.stage} CLEAR!`;
        document.getElementById('modal-icon').textContent = '🌟';
        document.getElementById('modal-message').textContent = '모든 단어 마법 주문을 성공적으로 외웠어요!';
        document.getElementById('modal-words-count').textContent = this.wordsClearedCount;
        document.getElementById('modal-score').textContent = this.score;
        document.getElementById('modal-max-combo').textContent = this.maxCombo;
        this.resultModal.classList.add('active');
    }

    // Canvas Battle Animation Loop
    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Arena Background
        this.drawBackground();

        // Update & Draw Wizard
        this.drawWizard();

        // Update & Draw Monster
        if (this.currentWordObj) {
            this.monster.x -= this.monster.speed;
            if (this.monster.x < this.wizard.x + 70) {
                this.monster.x = 650; // Reset position if reached wizard
            }
            this.drawMonster();
        }

        // Update & Draw Projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.x += p.speed;
            
            // Draw glowing magic bolt
            this.ctx.save();
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#00CEC9';
            this.ctx.fillStyle = '#FFEAA7';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            if (p.x >= this.monster.x) {
                this.spawnExplosion(p.x, p.y);
                this.projectiles.splice(i, 1);
            }
        }

        // Update & Draw Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const pt = this.particles[i];
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.alpha -= 0.03;

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, pt.alpha);
            this.ctx.fillStyle = pt.color;
            this.ctx.beginPath();
            this.ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            if (pt.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    drawBackground() {
        // Night sky
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 340);
        gradient.addColorStop(0, '#10121D');
        gradient.addColorStop(0.7, '#1D2136');
        gradient.addColorStop(1, '#2B1B47');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 800, 340);

        // Ground
        this.ctx.fillStyle = '#3A2E59';
        this.ctx.fillRect(0, 260, 800, 80);
        this.ctx.fillStyle = '#4E3E75';
        this.ctx.fillRect(0, 260, 800, 8);
    }

    drawWizard() {
        this.ctx.save();
        this.ctx.font = '65px serif';
        this.ctx.textAlign = 'center';

        // Idle floating
        const floatOffset = Math.sin(Date.now() / 250) * 4;
        this.ctx.fillText('🧙‍♂️', this.wizard.x, this.wizard.y + floatOffset);

        // Magic Wand aura
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#FFEAA7';
        this.ctx.fillStyle = '#00CEC9';
        this.ctx.beginPath();
        this.ctx.arc(this.wizard.x + 35, this.wizard.y - 30 + floatOffset, this.wizard.casting ? 12 : 6, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    drawMonster() {
        this.ctx.save();
        this.ctx.font = '65px serif';
        this.ctx.textAlign = 'center';

        const bounceOffset = Math.abs(Math.sin(Date.now() / 200)) * 6;
        this.ctx.fillText(this.monster.emoji, this.monster.x, this.monster.y - bounceOffset);

        // HP Bar above monster
        const barW = 60;
        const barH = 8;
        const barX = this.monster.x - barW / 2;
        const barY = this.monster.y - 80;

        this.ctx.fillStyle = '#2D3436';
        this.ctx.fillRect(barX, barY, barW, barH);

        const currentHpW = (this.monster.hp / this.monster.maxHp) * barW;
        this.ctx.fillStyle = '#FF7675';
        this.ctx.fillRect(barX, barY, currentHpW, barH);

        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.strokeRect(barX, barY, barW, barH);

        this.ctx.restore();
    }
}

// Launch Game on Load
window.addEventListener('DOMContentLoaded', () => {
    window.game = new WordWizardGame();
});
