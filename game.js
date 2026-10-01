// ========================================================
// 단어 마법사 (Word Wizard RPG) - Instant Monster Defeat Engine
// ========================================================

// 1. Wizard Rank Word Database
const WIZARD_RANK_DATABASE = {
    rank1: {
        title: '수습 마법사',
        monsterCount: 5,
        speed: 0.25,
        words: [
            { word: 'cat', hint: '고양이', emoji: '🐱' },
            { word: 'dog', hint: '개 / 강아지', emoji: '🐶' },
            { word: 'sun', hint: '태양 / 해', emoji: '☀️' },
            { word: 'box', hint: '상자', emoji: '📦' },
            { word: 'bus', hint: '버스', emoji: '🚌' },
            { word: 'pen', hint: '펜', emoji: '🖊️' },
            { word: 'red', hint: '빨간색', emoji: '🔴' },
            { word: 'pig', hint: '돼지', emoji: '🐷' },
            { word: 'cup', hint: '컵', emoji: '🥛' },
            { word: 'map', hint: '지도', emoji: '🗺️' },
            { word: 'hat', hint: '모자', emoji: '🎩' },
            { word: 'net', hint: '그물 / 넷', emoji: '🕸️' },
            { word: 'top', hint: '팽이 / 위', emoji: '🪀' },
            { word: 'bat', hint: '박쥐 / 방망이', emoji: '🦇' },
            { word: 'bed', hint: '침대', emoji: '🛏️' },
            { word: 'fox', hint: '여우', emoji: '🦊' },
            { word: 'gem', hint: '보석', emoji: '💎' },
            { word: 'jam', hint: '잼', emoji: '🫐' },
            { word: 'fan', hint: '부채 / 선풍기', emoji: '🪭' },
            { word: 'run', hint: '달리기', emoji: '🏃' }
        ]
    },
    rank2: {
        title: '원소 마법사',
        monsterCount: 8,
        speed: 0.45,
        words: [
            { word: 'book', hint: '책', emoji: '📖' },
            { word: 'milk', hint: '우유', emoji: '🥛' },
            { word: 'fish', hint: '물고기', emoji: '🐟' },
            { word: 'tree', hint: '나무', emoji: '🌳' },
            { word: 'star', hint: '별', emoji: '⭐️' },
            { word: 'blue', hint: '파란색', emoji: '🔵' },
            { word: 'pink', hint: '분홍색', emoji: '🩷' },
            { word: 'duck', hint: '오리', emoji: '🦆' },
            { word: 'hand', hint: '손', emoji: '✋' },
            { word: 'foot', hint: '발', emoji: '🦶' },
            { word: 'door', hint: '문', emoji: '🚪' },
            { word: 'frog', hint: '개구리', emoji: '🐸' },
            { word: 'bird', hint: '새', emoji: '🐦' },
            { word: 'cake', hint: '케이크', emoji: '🎂' },
            { word: 'desk', hint: '책상', emoji: '🪑' },
            { word: 'king', hint: '왕 / 국왕', emoji: '👑' },
            { word: 'ring', hint: '반지', emoji: '💍' },
            { word: 'snow', hint: '눈', emoji: '❄️' },
            { word: 'bear', hint: '곰', emoji: '🐻' },
            { word: 'lion', hint: '사자', emoji: '🦁' },
            { word: 'wind', hint: '바람', emoji: '🌬️' },
            { word: 'fire', hint: '불 / 불꽃', emoji: '🔥' }
        ]
    },
    rank3: {
        title: '대마법사',
        monsterCount: 12,
        speed: 0.65,
        words: [
            { word: 'apple', hint: '사과', emoji: '🍎' },
            { word: 'bread', hint: '빵', emoji: '🍞' },
            { word: 'water', hint: '물', emoji: '💧' },
            { word: 'green', hint: '초록색', emoji: '🟢' },
            { word: 'clock', hint: '시계', emoji: '⏰' },
            { word: 'rabbit', hint: '토끼', emoji: '🐰' },
            { word: 'family', hint: '가족', emoji: '👨‍👩‍👧‍👦' },
            { word: 'mother', hint: '엄마', emoji: '👩' },
            { word: 'father', hint: '아빠', emoji: '👨' },
            { word: 'school', hint: '학교', emoji: '🏫' },
            { word: 'pencil', hint: '연필', emoji: '✏️' },
            { word: 'banana', hint: '바나나', emoji: '🍌' },
            { word: 'yellow', hint: '노란색', emoji: '🟡' },
            { word: 'monkey', hint: '원숭이', emoji: '🐒' },
            { word: 'friend', hint: '친구', emoji: '🤝' },
            { word: 'summer', hint: '여름', emoji: '☀️' },
            { word: 'winter', hint: '겨울', emoji: '❄️' },
            { word: 'flower', hint: '꽃', emoji: '🌸' },
            { word: 'orange', hint: '오렌지', emoji: '🍊' },
            { word: 'animal', hint: '동물', emoji: '🐾' },
            { word: 'dragon', hint: '드래곤 / 용', emoji: '🐲' },
            { word: 'wizard', hint: '마법사', emoji: '🧙‍♂️' }
        ]
    }
};

// 2. LocalStorage Persistence Manager
class SaveSystem {
    static KEY = 'word_wizard_player_profile';

    static getProfile() {
        try {
            const data = localStorage.getItem(SaveSystem.KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Failed to load profile:', e);
            return null;
        }
    }

    static saveProfile(profile) {
        try {
            localStorage.setItem(SaveSystem.KEY, JSON.stringify(profile));
        } catch (e) {
            console.error('Failed to save profile:', e);
        }
    }

    static resetProfile() {
        try {
            localStorage.removeItem(SaveSystem.KEY);
        } catch (e) {
            console.error('Failed to reset profile:', e);
        }
    }
}

// 3. Sound Synthesizer
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

    playMagicSpell() {
        if (!this.enabled || !this.ctx) return;
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(250, now + 0.1);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    }

    playHitImpact() {
        if (!this.enabled || !this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    }

    // Heavy "KWANG~!" Explosion Sound
    playMonsterDefeat() {
        if (!this.enabled || !this.ctx) return;
        const now = this.ctx.currentTime;
        const duration = 2.8;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(22, now + 0.4);

        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);

        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.7));
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, now);
        filter.frequency.exponentialRampToValueAtTime(60, now + duration);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.65, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        whiteNoise.start(now);

        setTimeout(() => this.playVictory(), 250);
    }

    playCorrect() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
    }

    playWrong() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, this.ctx.currentTime);
        osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playVictory() {
        if (!this.enabled || !this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.08);
            osc.stop(this.ctx.currentTime + idx * 0.08 + 0.25);
        });
    }

    playFireworkLaunch() {
        if (!this.enabled || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }
}

// 4. Main Game Application
class WordWizardGame {
    constructor() {
        this.player = {
            name: '',
            avatar: '🧙‍♂️',
            avatarTitle: '불꽃 마법사',
            cumulativeScore: 0,
            unlockedLevel: 1,
            levelStars: { 1: 0, 2: 0, 3: 0 }
        };

        this.currentLevel = 1;
        this.stageScore = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.totalMonstersInWave = 5;
        this.monstersDefeatedInWave = 0;

        this.currentWordList = [];
        this.currentWordIndex = 0;
        this.currentWordObj = null;
        this.typedLetters = '';

        this.soundFx = new SoundFx();

        this.canvas = document.getElementById('battle-canvas');
        this.ctx = this.canvas.getContext('2d');

        this.wizard = { x: 80, y: 200, casting: false };
        this.monster = { x: 620, y: 190, hp: 100, maxHp: 100, emoji: '👾', speed: 0.25, visible: true };
        this.projectiles = [];
        this.particles = [];
        this.fireworks = [];

        this.animationId = null;

        this.initDOM();
        this.setupKeyboardUI();
        this.bindEvents();

        this.checkSavedProfile();
    }

    initDOM() {
        this.profileScreen = document.getElementById('profile-screen');
        this.levelSelectScreen = document.getElementById('level-select-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultModal = document.getElementById('result-modal');

        this.profileFormBox = document.getElementById('profile-form-box');
        this.savedProfileCard = document.getElementById('saved-profile-card');
        this.playerNameInput = document.getElementById('player-name-input');

        this.stageVal = document.getElementById('stage-val');
        this.monstersLeftVal = document.getElementById('monsters-left-val');
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
        document.querySelectorAll('.avatar-option').forEach(opt => {
            opt.addEventListener('click', () => {
                document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
            });
        });

        document.getElementById('save-profile-btn').addEventListener('click', () => {
            const nameInput = this.playerNameInput.value.trim();
            if (!nameInput) {
                alert('마법사의 이름을 입력해주세요!');
                return;
            }
            const activeAvatar = document.querySelector('.avatar-option.active');
            this.player.name = nameInput;
            this.player.avatar = activeAvatar.dataset.avatar;
            this.player.avatarTitle = activeAvatar.dataset.title;

            SaveSystem.saveProfile(this.player);
            this.soundFx.init();
            this.openLevelSelectMap();
        });

        document.getElementById('continue-game-btn').addEventListener('click', () => {
            this.soundFx.init();
            this.openLevelSelectMap();
        });

        document.getElementById('edit-profile-btn').addEventListener('click', () => {
            this.savedProfileCard.classList.add('hidden');
            this.profileFormBox.classList.remove('hidden');
        });

        document.getElementById('reset-data-btn').addEventListener('click', () => {
            if (confirm('저장된 마법사 정보와 점수를 초기화할까요?')) {
                SaveSystem.resetProfile();
                location.reload();
            }
        });

        document.getElementById('back-to-profile-btn').addEventListener('click', () => {
            this.showScreen(this.profileScreen);
            this.checkSavedProfile();
        });

        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                const lvl = parseInt(card.dataset.level);
                if (lvl <= this.player.unlockedLevel) {
                    this.startLevelGame(lvl);
                } else {
                    alert(`이 계급 시험은 아직 잠겨있어요! 이전 계급을 먼저 통과해 주세요! 🔒`);
                }
            });
        });

        const audioBtn = document.getElementById('audio-toggle-btn');
        audioBtn.addEventListener('click', () => {
            this.soundFx.enabled = !this.soundFx.enabled;
            audioBtn.textContent = this.soundFx.enabled ? '🔊' : '🔇';
        });

        document.getElementById('listen-word-btn').addEventListener('click', () => this.speakWord());
        document.getElementById('speak-btn').addEventListener('click', () => this.speakWord());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('exit-game-btn').addEventListener('click', () => {
            if (confirm('게임을 중단하고 승급 맵으로 나갈까요?')) {
                this.openLevelSelectMap();
            }
        });

        document.getElementById('next-stage-btn').addEventListener('click', () => {
            this.resultModal.classList.remove('active');
            if (this.currentLevel < 3) {
                this.startLevelGame(this.currentLevel + 1);
            } else {
                alert('🏆 최고 계급 대마법사 시험을 마스터하셨습니다! 축하합니다!');
                this.openLevelSelectMap();
            }
        });
        document.getElementById('map-return-btn').addEventListener('click', () => {
            this.resultModal.classList.remove('active');
            this.openLevelSelectMap();
        });

        window.addEventListener('keydown', (e) => {
            if (!this.gameScreen.classList.contains('active')) return;
            const key = e.key.toLowerCase();
            if (key >= 'a' && key <= 'z') {
                this.handleKeyPress(key);
                this.animateVirtualKey(key);
            }
        });
    }

    checkSavedProfile() {
        const saved = SaveSystem.getProfile();
        if (saved && saved.name) {
            this.player = saved;
            document.getElementById('saved-avatar').textContent = this.player.avatar;
            document.getElementById('saved-name').textContent = `${this.player.name} 마법사`;
            document.getElementById('saved-total-score').textContent = this.player.cumulativeScore.toLocaleString();

            this.profileFormBox.classList.add('hidden');
            this.savedProfileCard.classList.remove('hidden');
        } else {
            this.profileFormBox.classList.remove('hidden');
            this.savedProfileCard.classList.add('hidden');
        }
    }

    showScreen(targetScreen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        targetScreen.classList.add('active');
    }

    openLevelSelectMap() {
        this.showScreen(this.levelSelectScreen);

        document.getElementById('map-user-avatar').textContent = this.player.avatar;
        document.getElementById('map-user-name').textContent = `${this.player.name} 마법사`;
        document.getElementById('map-user-score').textContent = this.player.cumulativeScore.toLocaleString();

        const rankTitles = ['수습 마법사', '원소 마법사', '대마법사'];

        for (let lvl = 1; lvl <= 3; lvl++) {
            const card = document.querySelector(`.level-card[data-level="${lvl}"]`);
            const statusText = card.querySelector('.level-status');
            const starsBox = document.getElementById(`stars-lvl-${lvl}`);

            if (lvl <= this.player.unlockedLevel) {
                card.classList.remove('locked');
                card.classList.add('unlocked');
                statusText.innerHTML = '🔓 도전 가능';
            } else {
                card.classList.remove('unlocked');
                card.classList.add('locked');
                statusText.innerHTML = `🔒 ${rankTitles[lvl - 2]} 통과시 열림`;
            }

            const starsCount = this.player.levelStars[lvl] || 0;
            starsBox.textContent = '⭐'.repeat(starsCount) + '☆'.repeat(3 - starsCount);
        }
    }

    startLevelGame(levelNum) {
        this.currentLevel = levelNum;
        this.stageScore = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.monstersDefeatedInWave = 0;
        this.fireworks = [];

        const rankInfo = WIZARD_RANK_DATABASE[`rank${this.currentLevel}`] || WIZARD_RANK_DATABASE.rank1;
        this.totalMonstersInWave = rankInfo.monsterCount;

        this.showScreen(this.gameScreen);

        document.getElementById('hud-avatar').textContent = this.player.avatar;
        document.getElementById('hud-player-name').textContent = this.player.name;
        this.stageVal.textContent = rankInfo.title;
        this.updateHUD();

        const shuffledWords = [...rankInfo.words].sort(() => Math.random() - 0.5);
        this.currentWordList = shuffledWords.slice(0, this.totalMonstersInWave);
        this.currentWordIndex = 0;

        this.spawnNextWordMonster();

        if (!this.animationId) {
            this.gameLoop();
        }
    }

    spawnNextWordMonster() {
        if (this.currentWordIndex >= this.currentWordList.length) {
            this.handleLevelClear();
            return;
        }

        this.currentWordObj = this.currentWordList[this.currentWordIndex];
        this.typedLetters = '';

        this.targetEmoji.textContent = this.currentWordObj.emoji;
        this.targetHint.textContent = this.currentWordObj.hint;
        this.updateWordDisplay();

        const rankInfo = WIZARD_RANK_DATABASE[`rank${this.currentLevel}`] || WIZARD_RANK_DATABASE.rank1;
        this.monster.x = 640;
        this.monster.hp = 100;
        this.monster.maxHp = 100;
        this.monster.emoji = this.getMonsterEmoji();
        this.monster.speed = rankInfo.speed;
        this.monster.visible = true; // Make monster visible again for next word

        this.speakWord();
    }

    getMonsterEmoji() {
        const monsters = ['👾', '👻', '👹', '🐲', '🧟', '🧌', '🪼', '👺'];
        return monsters[(this.currentLevel + this.currentWordIndex) % monsters.length];
    }

    updateWordDisplay() {
        this.wordTyped.textContent = this.typedLetters;
        const targetWord = this.currentWordObj.word;
        const remaining = targetWord.slice(this.typedLetters.length);
        this.wordRemaining.textContent = remaining;
    }

    handleKeyPress(letter) {
        if (!this.currentWordObj || !this.monster.visible) return;

        const targetWord = this.currentWordObj.word.toLowerCase();
        const expectedNextChar = targetWord[this.typedLetters.length];

        if (letter === expectedNextChar) {
            this.typedLetters += letter;
            this.combo++;
            if (this.combo > this.maxCombo) this.maxCombo = this.combo;

            const addedScore = 20 * (1 + Math.floor(this.combo / 4));
            this.stageScore += addedScore;
            this.updateHUD();

            this.soundFx.playMagicSpell();

            this.wizard.casting = true;
            setTimeout(() => this.wizard.casting = false, 150);

            const isFinalHit = (this.typedLetters === targetWord);
            this.spawnProjectile(isFinalHit);

            const damage = 100 / targetWord.length;
            this.monster.hp = Math.max(0, this.monster.hp - damage);

            this.updateWordDisplay();
        } else {
            this.combo = 0;
            this.updateHUD();
            this.soundFx.playWrong();

            const card = document.getElementById('monster-target-card');
            card.style.borderColor = '#D63031';
            setTimeout(() => card.style.borderColor = '#6C5CE7', 300);
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
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(this.currentWordObj.word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    }

    updateHUD() {
        this.scoreVal.textContent = this.stageScore;
        this.comboVal.textContent = `${this.combo} 🔥`;
        this.monstersLeftVal.textContent = `${this.totalMonstersInWave - this.monstersDefeatedInWave} / ${this.totalMonstersInWave}`;
    }

    spawnProjectile(isFinalHit) {
        this.projectiles.push({
            x: this.wizard.x + 40,
            y: this.wizard.y - 30,
            speed: 18,
            radius: 9,
            isFinalHit: isFinalHit
        });
    }

    // Called ON IMPACT when missile reaches monster!
    handleProjectileImpact(p) {
        if (p.isFinalHit) {
            // INSTANTLY HIDE MONSTER AT THE EXACT MILLISECOND OF IMPACT!
            this.monster.visible = false;

            // 💣 Heavy "KWANG~!" Explosion Sound RIGHT ON IMPACT!
            this.soundFx.playMonsterDefeat();
            this.spawnExplosion(p.x, p.y, true);

            this.monstersDefeatedInWave++;
            this.updateHUD();

            // Next monster appears after explosion effect finishes
            setTimeout(() => {
                this.currentWordIndex++;
                this.spawnNextWordMonster();
            }, 550);
        } else {
            // Normal hit sound on impact
            this.soundFx.playHitImpact();
            this.spawnExplosion(p.x, p.y, false);
        }
    }

    spawnExplosion(x, y, isBig) {
        const particleCount = isBig ? 50 : 18;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (isBig ? 5 : 2) + Math.random() * 8;
            this.particles.push({
                x: x,
                y: y - 30,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: ['#FFEAA7', '#FF7675', '#A29BFE', '#00CEC9', '#FD79A8'][Math.floor(Math.random() * 5)],
                radius: (isBig ? 6 : 3) + Math.random() * 5,
                alpha: 1.0
            });
        }
    }

    launchFireworks() {
        const colors = ['#FFEAA7', '#FF7675', '#A29BFE', '#00CEC9', '#FD79A8', '#55E6C1', '#F8EFBA'];
        for (let burst = 0; burst < 6; burst++) {
            setTimeout(() => {
                this.soundFx.playFireworkLaunch();
                const startX = 100 + Math.random() * 600;
                const startY = 100 + Math.random() * 120;
                const burstColor = colors[Math.floor(Math.random() * colors.length)];

                for (let i = 0; i < 40; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 2 + Math.random() * 6;
                    this.fireworks.push({
                        x: startX,
                        y: startY,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        color: burstColor,
                        radius: 3 + Math.random() * 4,
                        alpha: 1.0,
                        decay: 0.015 + Math.random() * 0.015
                    });
                }
            }, burst * 250);
        }
    }

    handleLevelClear() {
        this.player.cumulativeScore += this.stageScore;

        if (this.currentLevel < 3 && this.player.unlockedLevel < this.currentLevel + 1) {
            this.player.unlockedLevel = this.currentLevel + 1;
        }

        const stars = this.maxCombo >= 8 ? 3 : (this.maxCombo >= 4 ? 2 : 1);
        if ((this.player.levelStars[this.currentLevel] || 0) < stars) {
            this.player.levelStars[this.currentLevel] = stars;
        }

        SaveSystem.saveProfile(this.player);

        this.launchFireworks();

        const rankTitles = ['수습 마법사', '원소 마법사', '대마법사'];
        document.getElementById('modal-title').textContent = `${rankTitles[this.currentLevel - 1]} 통과!`;
        document.getElementById('modal-icon').textContent = '🎆🎉';
        document.getElementById('modal-message').textContent = '축하합니다! 시험을 완벽하게 통과하셨습니다!';
        document.getElementById('modal-score').textContent = this.stageScore;
        document.getElementById('modal-total-score').textContent = this.player.cumulativeScore.toLocaleString();
        document.getElementById('modal-max-combo').textContent = this.maxCombo;

        const nextBtn = document.getElementById('next-stage-btn');
        if (this.currentLevel >= 3) {
            nextBtn.textContent = '🏆 최고 계급 달성!';
        } else {
            nextBtn.textContent = `다음 계급 시험 도전 ➡️`;
        }

        setTimeout(() => {
            this.resultModal.classList.add('active');
        }, 500);
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();
        this.drawWizard();

        // Draw monster only if visible
        if (this.currentWordObj && this.monster.visible) {
            this.monster.x -= this.monster.speed;
            if (this.monster.x < this.wizard.x + 70) {
                this.monster.x = 640;
            }
            this.drawMonster();
        }

        // Update Projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.x += p.speed;

            this.ctx.save();
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#00CEC9';
            this.ctx.fillStyle = '#FFEAA7';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            if (p.x >= this.monster.x) {
                this.handleProjectileImpact(p);
                this.projectiles.splice(i, 1);
            }
        }

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

        for (let i = 0; i < this.fireworks.length; i++) {
            const fw = this.fireworks[i];
            fw.x += fw.vx;
            fw.y += fw.vy;
            fw.vy += 0.08;
            fw.alpha -= fw.decay;

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, fw.alpha);
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = fw.color;
            this.ctx.fillStyle = fw.color;
            this.ctx.beginPath();
            this.ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            if (fw.alpha <= 0) {
                this.fireworks.splice(i, 1);
                i--;
            }
        }

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 320);
        gradient.addColorStop(0, '#10121D');
        gradient.addColorStop(0.7, '#1D2136');
        gradient.addColorStop(1, '#2B1B47');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 800, 320);

        this.ctx.fillStyle = '#3A2E59';
        this.ctx.fillRect(0, 250, 800, 70);
        this.ctx.fillStyle = '#4E3E75';
        this.ctx.fillRect(0, 250, 800, 8);
    }

    drawWizard() {
        this.ctx.save();
        this.ctx.font = '60px serif';
        this.ctx.textAlign = 'center';

        const floatOffset = Math.sin(Date.now() / 250) * 4;
        this.ctx.fillText(this.player.avatar, this.wizard.x, this.wizard.y + floatOffset);

        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = '#FFEAA7';
        this.ctx.fillStyle = '#00CEC9';
        this.ctx.beginPath();
        this.ctx.arc(this.wizard.x + 35, this.wizard.y - 30 + floatOffset, this.wizard.casting ? 14 : 6, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    drawMonster() {
        this.ctx.save();
        this.ctx.font = '60px serif';
        this.ctx.textAlign = 'center';

        const bounceOffset = Math.abs(Math.sin(Date.now() / 200)) * 6;
        this.ctx.fillText(this.monster.emoji, this.monster.x, this.monster.y - bounceOffset);

        const barW = 60;
        const barH = 8;
        const barX = this.monster.x - barW / 2;
        const barY = this.monster.y - 75;

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

// Start Game
window.addEventListener('DOMContentLoaded', () => {
    window.game = new WordWizardGame();
});
