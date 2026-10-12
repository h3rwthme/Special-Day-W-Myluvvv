/**
 * HAPPY 18th BIRTHDAY SELYY EPPA PUSPITAA - INTERACTIVE ENGINE
 * Created with Love for Selyy Eppa Puspitaa (Born 13 Oct 2008, 18th Birthday)
 * Menemani selama 2 Tahun (Jadian 25-05-2024)
 * Username: arhaan / lyyhan | Password: 25052024
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- SOUND EFFECTS (Web Audio API Synthesizer) ---
  class SoundManager {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.isAmbientPlaying = false;
      this.ambientTimer = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playPop() {
      if (this.isMuted) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    }

    playSparkle() {
      if (this.isMuted) return;
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (this.isMuted) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.25);
        }, idx * 60);
      });
    }

    playSuccessChord() {
      if (this.isMuted) return;
      this.init();
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50]; // Cmaj7 arpeggio
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.6);
        }, idx * 90);
      });
    }

    // Melodic Romantic Ambient Chord generator (Lofi Piano vibe)
    startAmbient() {
      if (this.isAmbientPlaying) return;
      this.isAmbientPlaying = true;
      this.init();

      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23]  // G7
      ];
      let chordIndex = 0;

      const playChord = () => {
        if (!this.isAmbientPlaying || this.isMuted) return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, idx) => {
          setTimeout(() => {
            if (!this.isAmbientPlaying || this.isMuted) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 2.5);
          }, idx * 120);
        });
      };

      playChord();
      this.ambientTimer = setInterval(playChord, 3200);
    }

    stopAmbient() {
      this.isAmbientPlaying = false;
      if (this.ambientTimer) clearInterval(this.ambientTimer);
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        this.stopAmbient();
      }
      return this.isMuted;
    }
  }

  const sound = new SoundManager();

  // --- FLOATING PARTICLES CANVAS (Hearts & Twinkles) ---
  const particleCanvas = document.getElementById('particleCanvas');
  const pCtx = particleCanvas.getContext('2d');
  let particles = [];

  function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeParticleCanvas);
  resizeParticleCanvas();

  class FloatingParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = particleCanvas.height + Math.random() * 50;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.isHeart = Math.random() > 0.4;
      this.color = Math.random() > 0.5 ? 'rgba(255, 117, 143, ' : 'rgba(224, 170, 255, ';
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.02;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.angle) * 0.4;
      this.angle += this.spin;
      if (this.y < -30) {
        this.reset();
      }
    }
    draw() {
      pCtx.save();
      pCtx.translate(this.x, this.y);
      pCtx.rotate(this.angle);
      pCtx.fillStyle = this.color + this.opacity + ')';

      if (this.isHeart) {
        // Draw Heart
        const s = this.size;
        pCtx.beginPath();
        pCtx.moveTo(0, -s / 4);
        pCtx.bezierCurveTo(-s / 2, -s * 0.8, -s, -s * 0.1, 0, s * 0.8);
        pCtx.bezierCurveTo(s, -s * 0.1, s / 2, -s * 0.8, 0, -s / 4);
        pCtx.fill();
      } else {
        // Draw Twinkling Star
        pCtx.beginPath();
        pCtx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        pCtx.fill();
      }
      pCtx.restore();
    }
  }

  for (let i = 0; i < 35; i++) {
    particles.push(new FloatingParticle());
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // --- CONFETTI CANNON ENGINE ---
  const confettiCanvas = document.getElementById('confettiCanvas');
  const cCtx = confettiCanvas.getContext('2d');
  let confettiPieces = [];

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfettiCanvas);
  resizeConfettiCanvas();

  const confettiColors = ['#ff477e', '#ff758f', '#e0aaff', '#ffd166', '#a8dadc', '#ffbe0b', '#f72585'];

  class ConfettiPiece {
    constructor(x, y) {
      this.x = x || Math.random() * confettiCanvas.width;
      this.y = y || confettiCanvas.height * 0.5;
      this.size = Math.random() * 9 + 6;
      this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      this.speedX = (Math.random() - 0.5) * 14;
      this.speedY = -(Math.random() * 12 + 6);
      this.gravity = 0.35;
      this.rotation = Math.random() * 360;
      this.spinSpeed = (Math.random() - 0.5) * 12;
      this.opacity = 1;
      this.shape = Math.random() > 0.4 ? 'rect' : 'circle';
    }
    update() {
      this.speedY += this.gravity;
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.spinSpeed;
      if (this.y > confettiCanvas.height - 20) {
        this.opacity -= 0.025;
      }
    }
    draw() {
      cCtx.save();
      cCtx.translate(this.x, this.y);
      cCtx.rotate((this.rotation * Math.PI) / 180);
      cCtx.globalAlpha = Math.max(0, this.opacity);
      cCtx.fillStyle = this.color;

      if (this.shape === 'rect') {
        cCtx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
      } else {
        cCtx.beginPath();
        cCtx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        cCtx.fill();
      }
      cCtx.restore();
    }
  }

  function launchConfetti(originX, originY, count = 80) {
    sound.playSparkle();
    const x = originX || confettiCanvas.width / 2;
    const y = originY || confettiCanvas.height * 0.45;
    for (let i = 0; i < count; i++) {
      confettiPieces.push(new ConfettiPiece(x, y));
    }
  }

  function animateConfetti() {
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const piece = confettiPieces[i];
      piece.update();
      piece.draw();
      if (piece.opacity <= 0 || piece.y > confettiCanvas.height + 40) {
        confettiPieces.splice(i, 1);
      }
    }
    requestAnimationFrame(animateConfetti);
  }
  animateConfetti();

  // --- LOGIN GATE / AUTHENTICATION ---
  const loginOverlay = document.getElementById('loginOverlay');
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const togglePwBtn = document.getElementById('togglePwBtn');
  const hintToggleBtn = document.getElementById('hintToggleBtn');
  const hintBox = document.getElementById('hintBox');
  const loginFeedback = document.getElementById('loginFeedback');
  const mascotAvatar = document.getElementById('mascotAvatar');
  const btnLockScreen = document.getElementById('btnLockScreen');

  // Mascot dynamic reaction
  usernameInput.addEventListener('focus', () => {
    mascotAvatar.textContent = '🐱';
  });
  passwordInput.addEventListener('focus', () => {
    mascotAvatar.textContent = '🙈'; // Cute cover eyes when entering password
  });
  passwordInput.addEventListener('blur', () => {
    mascotAvatar.textContent = '🐱';
  });

  // Toggle Password Visibility
  togglePwBtn.addEventListener('click', () => {
    sound.playPop();
    const isPw = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPw ? 'text' : 'password');
    togglePwBtn.textContent = isPw ? '🙈' : '👁️';
  });

  // Toggle Hint
  hintToggleBtn.addEventListener('click', () => {
    sound.playPop();
    hintBox.classList.toggle('show');
  });

  // Form Submit Authentication
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sound.init();

    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    // Required Credentials: user: lyyhan or arhaan, pw: 25052024
    if ((username === 'lyyhan' || username === 'arhaan') && password === '25052024') {
      loginFeedback.className = 'login-feedback success';
      loginFeedback.textContent = 'Aww kuncinya cocok! Selamat datang sayangg, bebuy tercantik Selyy Eppa Puspitaa! 💖✨';
      mascotAvatar.textContent = '🥰';
      sound.playSuccessChord();
      launchConfetti(window.innerWidth / 2, window.innerHeight / 2, 120);

      setTimeout(() => {
        loginOverlay.classList.add('hidden');
        localStorage.setItem('selyy_authenticated_18', 'true');
        sound.startAmbient();
      }, 900);
    } else {
      sound.playPop();
      mascotAvatar.textContent = '🥺';
      loginFeedback.className = 'login-feedback error';
      if (username !== 'lyyhan' && username !== 'arhaan') {
        loginFeedback.textContent = 'Username salah! Masukkan "arhaan" atau "lyyhan" yaa bebuy 🤍';
      } else {
        loginFeedback.textContent = 'Eits! Masa bebuy lupa tanggal jadian kita sih? 🥺 Coba ingat lagi ya sayangg (25052024)~';
      }
      setTimeout(() => {
        mascotAvatar.textContent = '🐱';
      }, 1500);
    }
  });

  // Re-lock screen button
  if (btnLockScreen) {
    btnLockScreen.addEventListener('click', () => {
      sound.playPop();
      localStorage.removeItem('selyy_authenticated_18');
      localStorage.removeItem('pita_authenticated_18');
      loginOverlay.classList.remove('hidden');
      passwordInput.value = '';
      loginFeedback.textContent = '';
      sound.stopAmbient();
    });
  }

  // Check persisted auth
  if (localStorage.getItem('selyy_authenticated_18') === 'true' || localStorage.getItem('pita_authenticated_18') === 'true') {
    loginOverlay.classList.add('hidden');
    sound.startAmbient();
  }

  // --- AUDIO MUTE / AMBIENT TOGGLE IN TOP BAR ---
  const btnToggleMute = document.getElementById('btnToggleMute');
  if (btnToggleMute) {
    btnToggleMute.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      btnToggleMute.textContent = isMuted ? '🔇' : '🎵';
      btnToggleMute.classList.toggle('active-pulse', !isMuted);
      if (!isMuted && !sound.isAmbientPlaying) {
        sound.startAmbient();
      }
    });
  }

  // Top Bar Confetti Trigger
  const btnTopConfetti = document.getElementById('btnTopConfetti');
  if (btnTopConfetti) {
    btnTopConfetti.addEventListener('click', () => {
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.3, 70);
    });
  }

  // --- TAB NAVIGATION (BOTTOM DOCK) ---
  const navTabs = document.querySelectorAll('.nav-tab-btn');
  const viewSections = document.querySelectorAll('.view-section');

  function switchTab(targetTabId) {
    sound.playPop();
    navTabs.forEach(tab => {
      if (tab.dataset.target === targetTabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    viewSections.forEach(section => {
      if (section.id === targetTabId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.target);
    });
  });

  // Quick Card links on home page
  document.querySelectorAll('.quick-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) switchTab(target);
    });
  });

  // --- INTERACTIVE CAKE & CANDLE BLOWING ---
  const btnBlowCandle = document.getElementById('btnBlowCandle');
  const candleFlames = document.querySelectorAll('.candle-flame');
  const wishUnlockedCard = document.getElementById('wishUnlockedCard');
  const cakeVisualWrap = document.querySelector('.cake-visual-wrap');
  let candlesBlown = false;

  function blowOutCandles() {
    if (candlesBlown) {
      // Re-light candles
      sound.playSparkle();
      candleFlames.forEach(flame => flame.classList.remove('blown-out'));
      btnBlowCandle.innerHTML = 'Tiup Lilin 18 & Make a Wish! 🕯️💨';
      wishUnlockedCard.classList.remove('show');
      candlesBlown = false;
      return;
    }

    sound.playSparkle();
    candlesBlown = true;
    candleFlames.forEach(flame => flame.classList.add('blown-out'));

    // Huge celebratory explosion
    const rect = cakeVisualWrap.getBoundingClientRect();
    launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 140);

    setTimeout(() => {
      launchConfetti(window.innerWidth * 0.3, window.innerHeight * 0.3, 80);
      launchConfetti(window.innerWidth * 0.7, window.innerHeight * 0.3, 80);
    }, 300);

    btnBlowCandle.innerHTML = 'Nyalakan Lilin Lagi ✨🕯️';
    wishUnlockedCard.classList.add('show');
  }

  if (btnBlowCandle) {
    btnBlowCandle.addEventListener('click', blowOutCandles);
  }
  if (cakeVisualWrap) {
    cakeVisualWrap.addEventListener('click', blowOutCandles);
  }

  // --- 2 YEARS RELATIONSHIP COUNTER & COUNTDOWN ---
  function updateCounters() {
    // Relationship anniversary: 25 Mei 2024
    const anniversaryDate = new Date('2024-05-25T00:00:00+07:00');
    const now = new Date();
    const diffTime = Math.abs(now - anniversaryDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const daysCountElem = document.getElementById('anniversaryDaysCount');
    if (daysCountElem) {
      daysCountElem.textContent = `${diffDays}+ Hari`;
    }

    // Birthday: 13 Oktober (Born 13 Oct 2008 -> 18 Years)
    const birthdayDate = new Date('2026-10-13T00:00:00+07:00');
    const bdayDiff = birthdayDate - now;

    const bdayCountdownBadge = document.getElementById('bdayCountdownBadge');
    if (bdayCountdownBadge) {
      if (bdayDiff <= 0) {
        bdayCountdownBadge.innerHTML = '🎉 HARI INI ULANG TAHUN KE-18 BEBUY CANTIK! HAPPY BIRTHDAY SELYY EPPA PUSPITAA! 🎂✨';
      } else {
        const hours = Math.floor(bdayDiff / (1000 * 60 * 60));
        const mins = Math.floor((bdayDiff % (1000 * 60 * 60)) / (1000 * 60));
        bdayCountdownBadge.innerHTML = `✨ H-1 Menuju Ulang Tahun ke-18 Bebuy Selyy Eppa Puspitaa! (${hours} Jam ${mins} Menit Lagi) 🎁`;
      }
    }
  }
  updateCounters();
  setInterval(updateCounters, 60000);

  // --- PAGE 2: LOVE LETTER & LOVE METER ---
  const envelopeContainer = document.getElementById('envelopeContainer');
  const parchmentLetter = document.getElementById('parchmentLetter');
  const btnSendLove = document.getElementById('btnSendLove');
  const loveProgressBar = document.getElementById('loveProgressBar');
  const lovePercentageText = document.getElementById('lovePercentageText');
  let lovePercentage = 100;

  if (envelopeContainer && parchmentLetter) {
    envelopeContainer.addEventListener('click', () => {
      sound.playSparkle();
      envelopeContainer.style.display = 'none';
      parchmentLetter.classList.add('open');
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 60);
    });
  }

  if (btnSendLove) {
    btnSendLove.addEventListener('click', () => {
      sound.playPop();
      lovePercentage += 50;
      if (lovePercentage > 1000) {
        lovePercentageText.textContent = '❤️ INFINITY % UNTUK BEBUY SAYANGG!';
      } else {
        lovePercentageText.textContent = `${lovePercentage}%`;
      }
      loveProgressBar.style.width = '100%';

      // Floating heart burst around button
      const rect = btnSendLove.getBoundingClientRect();
      launchConfetti(rect.left + rect.width / 2, rect.top, 25);
    });
  }

  // --- PAGE 3: MEMORY GALLERY & LIGHTBOX ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxStory = document.getElementById('lightboxStory');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');

  const memoryStories = {
    '1': {
      title: 'Pertemuan Pertama (25 Mei 2024) 🤍',
      story: 'Hari yang ga akan pernah aku lupain seumur hidup. Hari di mana kita pertama kali bertemu tatap muka dan resmi memulai komitmen manis yang sudah menemani selama 2 tahun penuh kehangatan.'
    },
    '2': {
      title: 'First Date Romantis 🌸',
      story: 'Kencan pertama kita berdua. Masih ingat banget rasa deg-degan tapi bahagia luar biasa bisa jalan bareng, makan bareng, dan ngobrol panjang sama bidadari secantik kamu.'
    },
    '3': {
      title: 'Senyum Manis Bebuy Selyy ✨',
      story: 'Senyuman bebuy yang selalu jadi obat paling ampuh buat ngilangin segala penat dan capek. Setiap kali kamu tersenyum manis, duniaku langsung terasa damai.'
    },
    '4': {
      title: 'Momen Hangat Berdua ☕',
      story: 'Quality time santai di tempat favorit kita. Ngobrol dari hal penting sampai hal receh yang bikin ketawa ga berhenti-henti. Waktu selalu terasa cepat kalau lagi bareng sayangg.'
    },
    '5': {
      title: 'Kencan & Foto Gemes 📸',
      story: 'Pose lucu dan gaya gemes kamu di depan kamera yang selalu bikin aku kangen. Lucu, manis, dan apa adanya, ga pernah ada yang bisa gantiin kamu di hatiku.'
    },
    '6': {
      title: 'Dunia Milik Kita Berdua 💖',
      story: 'Di antara riuhnya dunia luar, tempat ternyaman dan paling damai adalah saat aku bisa duduk di samping bebuy dan saling menggenggam tangan.'
    },
    '7': {
      title: 'Mata Indah Kesayangan 🕊️',
      story: 'Tatapan teduh dari mata indah kamu yang selalu tulus dan penuh kasih. Dari tatapan ini aku selalu tahu kalau rumah terbaik untuk pulang adalah kamu.'
    },
    '8': {
      title: 'Cerita & Petualangan Kita 🚗',
      story: 'Momen jalan-jalan sore, muter-muter tanpa tujuan yang jelas sambil setel lagu favorit dan saling curhat. Kenangan sederhana yang nilainya ga ternilai.'
    },
    '9': {
      title: 'Bidadari Paling Cantik 🌸',
      story: 'Salah satu potret terindah bebuy Selyy yang selalu bikin Arhaan terpesona. Kamu selalu cantik, anggun, dan mempesona luar dalam setiap hari.'
    },
    '10': {
      title: 'Peluk & Kehangatan Cinta 🤍',
      story: 'Dua tahun perjalanan kita melewati suka dan duka bersama. Terimakasih sudah selalu setia menemani, memeluk hangat, dan menerima aku apa adanya.'
    },
    '11': {
      title: 'Tawa Lepas Bahagia 🎉',
      story: 'Mendengar tawa renyah kamu adalah salah satu kebahagiaan terbesar dalam hidupku. Semoga senyum dan tawa bahagiamu ini selalu mekar setiap hari ya sayangg!'
    },
    '12': {
      title: 'Menyambut Chapter ke-18 🎂',
      story: 'Selamat bertambah usia yang ke-18, bebuy sayangg Selyy Eppa Puspitaa! Di babak baru kedewasaanmu ini, Arhaan janji akan selalu setia menemani, menjaga, dan mencintaimu.'
    }
  };

  document.querySelectorAll('.polaroid-card').forEach(card => {
    card.addEventListener('click', () => {
      sound.playPop();
      const id = card.dataset.memoryId;
      const img = card.querySelector('.polaroid-img');
      const caption = card.querySelector('.polaroid-caption');

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : 'Kenangan Manis Kita 🤍';
        lightboxStory.textContent = (memoryStories[id] && memoryStories[id].story) || 'Setiap momen bareng kamu adalah kenangan terindah yang ga akan pernah aku lupain.';
        lightboxModal.classList.add('show');
      }
    });
  });

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', () => {
      sound.playPop();
      lightboxModal.classList.remove('show');
    });
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('show');
      }
    });
  }

  // Custom Photo Upload
  const photoUploadInput = document.getElementById('photoUploadInput');
  const btnTriggerUpload = document.getElementById('btnTriggerUpload');
  const galleryGrid = document.getElementById('galleryGrid');

  if (btnTriggerUpload && photoUploadInput) {
    btnTriggerUpload.addEventListener('click', () => {
      sound.playPop();
      photoUploadInput.click();
    });

    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        sound.playSparkle();
        const customImgUrl = event.target.result;

        // Create new polaroid card
        const newCard = document.createElement('div');
        newCard.className = 'polaroid-card';
        newCard.innerHTML = `
          <div class="polaroid-img-wrap">
            <img src="${customImgUrl}" alt="Kenangan Baru" class="polaroid-img" />
          </div>
          <div class="polaroid-caption">Kenangan Spesial Kita ✨</div>
          <div class="polaroid-date-tag">Baru Ditambahkan 🤍</div>
        `;
        newCard.addEventListener('click', () => {
          lightboxImg.src = customImgUrl;
          lightboxCaption.textContent = 'Kenangan Spesial Kita ✨';
          lightboxStory.textContent = 'Foto kenangan manis yang kamu tambahkan sendiri ke galeri cinta kita.';
          lightboxModal.classList.add('show');
        });

        galleryGrid.prepend(newCard);
        launchConfetti(window.innerWidth / 2, window.innerHeight * 0.5, 50);
      };
      reader.readAsDataURL(file);
    });
  }

  // --- PAGE 4: MUSIC PLAYER (SELYY'S PLAYLIST) ---
  const vinylDisk = document.getElementById('vinylDisk');
  const equalizerWrap = document.getElementById('equalizerWrap');
  const btnPlayPause = document.getElementById('btnPlayPause');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const btnPrevTrack = document.getElementById('btnPrevTrack');
  const btnNextTrack = document.getElementById('btnNextTrack');
  const currentTrackTitle = document.getElementById('currentTrackTitle');
  const currentTrackArtist = document.getElementById('currentTrackArtist');
  const currentLyricsLine = document.getElementById('currentLyricsLine');
  const nextLyricsLine = document.getElementById('nextLyricsLine');
  const audioSliderFill = document.getElementById('audioSliderFill');
  const currentTimeDisplay = document.getElementById('currentTimeDisplay');
  const totalTimeDisplay = document.getElementById('totalTimeDisplay');
  const audioSliderWrap = document.getElementById('audioSliderWrap');
  const musicUploadInput = document.getElementById('musicUploadInput');
  const btnUploadMusic = document.getElementById('btnUploadMusic');

  const tracks = [
    {
      title: 'Until I Found You',
      artist: 'Stephen Sanchez',
      src: 'assets/songs/song1.mp3',
      duration: 180,
      lyrics: [
        { time: 0, text: 'Georgia, wrap me up in all your...', next: 'I would rather hurt with you than love someone new' },
        { time: 10, text: 'I would never fall in love until I found her...', next: 'I said, "I would never fall unless it\'s you I fall into"' },
        { time: 25, text: 'I was lost within the darkness, but then I found her 🤍', next: 'Heaven into my eyes...' },
        { time: 45, text: 'Ketemu bebuy Selyy Eppa Puspitaa, and everything felt so right ✨', next: 'Now you\'re 18 and more beautiful than ever, sayangg...' }
      ]
    },
    {
      title: 'Monokrom',
      artist: 'TULUS',
      src: 'assets/songs/tulus.mp3',
      duration: 215,
      lyrics: [
        { time: 0, text: 'Lembar lagu ini untukmu, bila suatu saat nanti kau dengarkan...', next: 'Ku tak pernah siap melepasmu, tapi ku selalu siap merindukanmu' },
        { time: 18, text: 'Kita tertawa bersama, mengukir warna indah berdua...', next: 'Di setiap langkah 2 tahun yang kita lewati' },
        { time: 38, text: 'Terimakasih bebuy Selyy Eppa Puspitaa sudah menemani 2 tahun ini 💖', next: 'Kamu warna terindah di setiap lembar hidup Arhaan...' }
      ]
    },
    {
      title: 'Sempurna',
      artist: 'Andra and The Backbone',
      src: 'assets/songs/song3.mp3',
      duration: 240,
      lyrics: [
        { time: 0, text: 'Kau begitu sempurna...', next: 'Dimataku kau begitu indah' },
        { time: 20, text: 'Kau membuat diriku selalu membutuhkanmu...', next: 'Peluk erat tubuhku saat ku terjatuh' },
        { time: 40, text: 'Selamat ulang tahun ke-18 ya sayangg Selyy Eppa Puspitaa 🎂', next: 'Tetap jadi bebuy yang manis, ceria, dan sempurna selalu' }
      ]
    },
    {
      title: 'About You',
      artist: 'The 1975',
      src: 'assets/songs/song4.mp3',
      duration: 220,
      lyrics: [
        { time: 0, text: 'Do you think I have forgotten about you? 🎶', next: 'There was something \'bout you that now I can\'t remember' },
        { time: 20, text: 'It\'s on my mind every single day...', next: 'Celebrating your 18th sweet chapter together, bebuyy!' }
      ]
    },
    {
      title: 'Golden Hour',
      artist: 'JVKE',
      src: 'assets/songs/song5.mp3',
      duration: 200,
      lyrics: [
        { time: 0, text: 'It\'s your golden hour, glowing brighter at 18 ✨', next: 'You look so beautiful tonight' },
        { time: 20, text: 'She\'s got a smile that makes the whole world shine...', next: 'Happy 18th Birthday Sayangku Selyy!' }
      ]
    },
    {
      title: 'Film Favorit',
      artist: 'Sheila On 7',
      src: 'assets/songs/sheila_on_7_film_favorit.mp3',
      duration: 226,
      lyrics: [
        { time: 0, text: 'Sama seperti di film favoritmu, semua cara akan kucoba...', next: 'Walau peran yang kumainkan bukan pemeran utamanya' },
        { time: 18, text: 'Kuingin kau tahu isi hatiku, tak akan menyerah mencintaimu ✨', next: 'Dan membawamu ke tempat paling bahagia' },
        { time: 38, text: 'Kisah cinta 2 tahun kita lebih indah dari film favorit manapun, sayangg! 🎬💖', next: 'Happy 18th Birthday Bebuy Selyy Eppa Puspitaa!' }
      ]
    }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  const mainAudio = new Audio();
  mainAudio.preload = 'metadata';

  function formatTime(secs) {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updatePlaylistActiveState() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === currentTrackIdx);
    });
  }

  function loadTrack(idx) {
    currentTrackIdx = idx;
    const track = tracks[currentTrackIdx];
    currentTrackTitle.textContent = track.title;
    currentTrackArtist.textContent = track.artist;
    totalTimeDisplay.textContent = formatTime(track.duration);
    currentTimeDisplay.textContent = '0:00';
    audioSliderFill.style.width = '0%';

    if (track.lyrics && track.lyrics[0]) {
      currentLyricsLine.textContent = track.lyrics[0].text;
      nextLyricsLine.textContent = track.lyrics[0].next || '';
    }

    updatePlaylistActiveState();

    if (mainAudio.src !== track.src && !mainAudio.src.endsWith(track.src)) {
      mainAudio.src = track.src;
      mainAudio.currentTime = 0;
      mainAudio.load();
    }
  }

  // Audio event listeners
  mainAudio.addEventListener('loadedmetadata', () => {
    if (mainAudio.duration && !isNaN(mainAudio.duration)) {
      tracks[currentTrackIdx].duration = Math.floor(mainAudio.duration);
      totalTimeDisplay.textContent = formatTime(tracks[currentTrackIdx].duration);
    }
  });

  mainAudio.addEventListener('timeupdate', () => {
    const cur = Math.floor(mainAudio.currentTime);
    const dur = Math.floor(mainAudio.duration) || tracks[currentTrackIdx].duration;
    currentTimeDisplay.textContent = formatTime(cur);

    if (dur > 0) {
      const pct = Math.min(100, (cur / dur) * 100);
      audioSliderFill.style.width = `${pct}%`;
    }

    // Lyrics synchronization
    const track = tracks[currentTrackIdx];
    if (track && track.lyrics) {
      for (let i = track.lyrics.length - 1; i >= 0; i--) {
        if (cur >= track.lyrics[i].time) {
          currentLyricsLine.textContent = track.lyrics[i].text;
          nextLyricsLine.textContent = track.lyrics[i].next || '';
          break;
        }
      }
    }
  });

  mainAudio.addEventListener('ended', () => {
    nextTrack();
  });

  mainAudio.addEventListener('play', () => {
    isPlaying = true;
    vinylDisk.classList.add('playing');
    equalizerWrap.classList.add('playing');
    playPauseIcon.textContent = '⏸️';
    sound.stopAmbient();
  });

  mainAudio.addEventListener('pause', () => {
    isPlaying = false;
    vinylDisk.classList.remove('playing');
    equalizerWrap.classList.remove('playing');
    playPauseIcon.textContent = '▶️';
  });

  function startPlayer() {
    sound.stopAmbient();
    const track = tracks[currentTrackIdx];
    if (!mainAudio.src || (!mainAudio.src.endsWith(track.src) && !mainAudio.src.includes(track.src))) {
      mainAudio.src = track.src;
    }

    const promise = mainAudio.play();
    if (promise !== undefined) {
      promise.catch((err) => {
        console.warn('Playback error or user interaction needed:', err);
      });
    }
  }

  function pausePlayer() {
    mainAudio.pause();
  }

  function togglePlayPause() {
    sound.playPop();
    if (isPlaying) {
      pausePlayer();
    } else {
      startPlayer();
    }
  }

  function nextTrack() {
    sound.playPop();
    currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
    loadTrack(currentTrackIdx);
    startPlayer();
  }

  function prevTrack() {
    sound.playPop();
    currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIdx);
    startPlayer();
  }

  if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlayPause);
  if (btnNextTrack) btnNextTrack.addEventListener('click', nextTrack);
  if (btnPrevTrack) btnPrevTrack.addEventListener('click', prevTrack);

  // Scrubber click seek
  if (audioSliderWrap) {
    audioSliderWrap.addEventListener('click', (e) => {
      const rect = audioSliderWrap.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const dur = mainAudio.duration || tracks[currentTrackIdx].duration;
      const targetTime = pct * dur;
      mainAudio.currentTime = targetTime;
      audioSliderFill.style.width = `${pct * 100}%`;
      currentTimeDisplay.textContent = formatTime(Math.floor(targetTime));
    });
  }

  // Playlist click binding
  function attachPlaylistClicks() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, idx) => {
      item.onclick = () => {
        sound.playPop();
        loadTrack(idx);
        startPlayer();
      };
    });
  }
  attachPlaylistClicks();

  // Load first track into player
  loadTrack(0);

  // Upload Custom MP3
  if (btnUploadMusic && musicUploadInput) {
    btnUploadMusic.addEventListener('click', () => {
      sound.playPop();
      musicUploadInput.click();
    });

    musicUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const fileUrl = URL.createObjectURL(file);
      const customTrack = {
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Pilihan Spesial Bebuy 💖',
        src: fileUrl,
        duration: 200,
        isCustom: true,
        lyrics: [
          { time: 0, text: `Sedang memutar lagu pilihan sayangg: ${file.name} 🎵`, next: 'Lagu favorit bebuy di hari ulang tahun ke-18!' },
          { time: 20, text: 'Dua tahun penuh kenangan indah bersama Selyy Eppa Puspitaa 🤍', next: 'Semoga suka lagunya yaa sayangg!' }
        ]
      };

      tracks.unshift(customTrack);

      const playlistItemsContainer = document.querySelector('.playlist-items');
      if (playlistItemsContainer) {
        const newItem = document.createElement('div');
        newItem.className = 'playlist-item active';
        newItem.setAttribute('data-index', '0');
        newItem.innerHTML = `
          <div class="playlist-item-left">
            <span class="playlist-item-num">★</span>
            <div class="playlist-item-info">
              <div class="playlist-song-name">${customTrack.title}</div>
              <div class="playlist-song-sub">Upload Pribadi • Pilihan Bebuy Selyy 💖</div>
            </div>
          </div>
          <span class="playlist-play-icon">▶</span>
        `;
        playlistItemsContainer.prepend(newItem);
        attachPlaylistClicks();
      }

      loadTrack(0);
      startPlayer();
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 60);
    });
  }

  // --- PAGE 5: 18 REASONS / HAL YANG BIKIN SAYANG ---
  const reasonsData = [
    { num: 1, front: 'Alasan #1', text: 'Senyum manis kamu yang selalu berhasil bikin hari-hari aku yang capek jadi langsung cerah lagi.' },
    { num: 2, front: 'Alasan #2', text: 'Ketawa kamu yang renyah dan lucu, terutama waktu kamu ketawa hal receh bareng aku.' },
    { num: 3, front: 'Alasan #3', text: 'Kesabaran kamu nemenin aku selama 2 tahun ini melewati berbagai cerita dan waktu.' },
    { num: 4, front: 'Alasan #4', text: 'Cara kamu manggil nama aku dengan nada khas yang cuma kamu yang punya.' },
    { num: 5, front: 'Alasan #5', text: 'Mata indah kamu yang selalu teduh dan tulus setiap kali kita tatap-tatapan.' },
    { num: 6, front: 'Alasan #6', text: 'Perhatian-perhatian kecil kamu yang sederhana tapi artinya luar biasa besar buat aku.' },
    { num: 7, front: 'Alasan #7', text: 'Gaya kamu yang selalu gemes dan apa adanya waktu lagi ngobrol berdua.' },
    { num: 8, front: 'Alasan #8', text: 'Cara kamu dengerin cerita aku tanpa pernah ngehakimi, bikin aku selalu merasa aman.' },
    { num: 9, front: 'Alasan #9', text: 'Momen pas kamu cemberut atau ngambek lucu, bukannya kesel malah makin pengen dipeluk!' },
    { num: 10, front: 'Alasan #10', text: 'Selera musik dan hal-hal favorit kamu yang unik dan selalu seru buat dibahas bareng.' },
    { num: 11, front: 'Alasan #11', text: 'Kehangatan hati kamu yang selalu peduli sama orang-orang di sekitar kamu.' },
    { num: 12, front: 'Alasan #12', text: 'Gimana kita berdua bisa ngobrol dari hal ga jelas sampe topik masa depan sampai lupa waktu.' },
    { num: 13, front: 'Alasan #13', text: 'Semangat kamu waktu lagi ngejar hal yang kamu suka, aura kamu bener-bener bersinar!' },
    { num: 14, front: 'Alasan #14', text: 'Kamu selalu jadi rumah dan tempat ternyaman buat aku pulang di dunia yang bising ini.' },
    { num: 15, front: 'Alasan #15', text: 'Semua lelucon dan panggilan khusus yang cuma kita berdua yang tau artinya.' },
    { num: 16, front: 'Alasan #16', text: 'Gimana kamu selalu bikin aku pengen jadi versi diri aku yang lebih baik setiap harinya.' },
    { num: 17, front: 'Alasan #17', text: 'Dua tahun ini membuktikan kalau aku ga pernah salah memilih kamu jadi orang tersayang.' },
    { num: 18, front: 'Alasan #18', text: 'Karena kamu adalah sayangg Selyy Eppa Puspitaa. Ga ada bebuy yang bisa gantiin kamu di hati Arhaan, sekarang dan selamanya! 💖' }
  ];

  const reasonsGrid = document.getElementById('reasonsGrid');
  const openedReasonsCount = document.getElementById('openedReasonsCount');
  let flippedCount = 0;

  if (reasonsGrid) {
    reasonsData.forEach(r => {
      const card = document.createElement('div');
      card.className = 'reason-flip-card';
      card.innerHTML = `
        <div class="reason-flip-inner">
          <div class="reason-front">
            <div class="reason-number-badge">${r.num}</div>
            <div class="reason-front-label">${r.front}</div>
          </div>
          <div class="reason-back">
            <div class="reason-back-text">${r.text}</div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        sound.playPop();
        if (!card.classList.contains('flipped')) {
          card.classList.add('flipped');
          flippedCount++;
          if (openedReasonsCount) {
            openedReasonsCount.textContent = `${flippedCount} / 18`;
          }
          if (flippedCount === 18) {
            setTimeout(() => {
              launchConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 150);
              sound.playSuccessChord();
              alert('🎉 Selamat Bebuy Selyy! Kamu sudah membuka semua 18 alasan manis kenapa Arhaan sayanggg banget sama bebuy! 💖✨');
            }, 500);
          }
        } else {
          card.classList.remove('flipped');
          flippedCount = Math.max(0, flippedCount - 1);
          if (openedReasonsCount) {
            openedReasonsCount.textContent = `${flippedCount} / 18`;
          }
        }
      });

      reasonsGrid.appendChild(card);
    });
  }

  // --- PAGE 6: WISH CAPSULE / KOTAK HARAPAN ---
  const wishInput = document.getElementById('wishInput');
  const btnAddWish = document.getElementById('btnAddWish');
  const wishesList = document.getElementById('wishesList');

  const defaultWishes = [
    { text: 'Semoga di umur ke-18 bebuy Selyy selalu sehat, panjang umur, dan bahagia selalu! 🌸', date: 'Doa Pertama' },
    { text: 'Semoga semua cita-cita dan mimpi sayangg Selyy Eppa Puspitaa tercapai dengan mudah dan lancar! ✨', date: 'Doa Kedua' },
    { text: 'Semoga hubungan kita berdua selalu langgeng dan saling menyayangi terus ya sayangg! 🤍', date: 'Doa Ketiga' }
  ];

  function loadWishes() {
    const saved = localStorage.getItem('selyy_wishes_18') || localStorage.getItem('pita_wishes_18');
    let wishes = saved ? JSON.parse(saved) : defaultWishes;
    if (wishesList) {
      wishesList.innerHTML = '';
      wishes.forEach(w => {
        const item = document.createElement('div');
        item.className = 'wish-item-scroll';
        item.innerHTML = `
          <div class="wish-item-text">${w.text}</div>
          <div class="wish-item-time">${w.date}</div>
        `;
        wishesList.appendChild(item);
      });
    }
  }
  loadWishes();

  if (btnAddWish && wishInput) {
    btnAddWish.addEventListener('click', () => {
      const text = wishInput.value.trim();
      if (!text) return;
      sound.playPop();

      const saved = localStorage.getItem('selyy_wishes_18') || localStorage.getItem('pita_wishes_18');
      let wishes = saved ? JSON.parse(saved) : defaultWishes;
      const nowStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      wishes.unshift({ text, date: `Ditulis oleh Bebuy Selyy • ${nowStr}` });
      localStorage.setItem('selyy_wishes_18', JSON.stringify(wishes));

      wishInput.value = '';
      loadWishes();
      launchConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 50);
    });
  }
});
