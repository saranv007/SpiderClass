/**
 * Spidey-Classroom Portal - Interactive Web Application Engine (v2)
 * Handles Timetable CRUD, IoT controls, Web Audio FX, Multiverse Suit Selector, Web-Shooter Ammo, and Lab Tasks.
 */

// --- Default Schedule Initial Data ---
const DEFAULT_SCHEDULE = {
  Monday: [
    { period: 1, time: "08:30 AM - 09:45 AM", title: "Web-Slinging Physics & Trajectories", code: "PHY-301", instructor: "Peter Parker", room: "Midtown High Roof Lab", category: "Physics", note: "Calculating arc length & pendulum vectors under high wind." },
    { period: 2, time: "10:00 AM - 11:15 AM", title: "Advanced AI & Robotics Mechanics", code: "ROB-402", instructor: "Prof. Otto Octavius", room: "Oscorp Sub-Level 3", category: "Robotics", note: "Neural interface alignment for multi-arm actuators." },
    { period: 3, time: "11:30 AM - 12:45 PM", title: "Bio-Genetics & DNA Sequencing", code: "BIO-204", instructor: "Dr. Curtis Connors", room: "ESU Science Center", category: "Genetics", note: "Recombinant reptilian enzyme neutralization labs." },
    { period: 4, time: "01:30 PM - 02:45 PM", title: "Quantum Multiverse Mechanics", code: "PHY-509", instructor: "Dr. Stephen Strange", room: "Sanctum Annex 4", category: "Multiverse", note: "Dimensional displacement vectors & anomaly containment." },
    { period: 5, time: "03:00 PM - 04:15 PM", title: "Crime-Fighting Ethics & Journalism", code: "JRN-101", instructor: "J. Jonah Jameson", room: "Bugle Tech Hub", category: "Ethics", note: "Dissecting sensationalist headlines vs heroic photojournalism." },
    { period: 6, time: "04:30 PM - 05:30 PM", title: "Midtown High Gym & Acrobatics", code: "PE-100", instructor: "Coach Flash Thompson", room: "Gymnasium", category: "Gym", note: "Wall-crawling agility & aerial maneuvering drills." }
  ],
  Tuesday: [
    { period: 1, time: "08:30 AM - 09:45 AM", title: "Advanced AI & Robotics Mechanics", code: "ROB-402", instructor: "Prof. Otto Octavius", room: "Oscorp Sub-Level 3", category: "Robotics", note: "Firmware updates on mechanical pincers." },
    { period: 2, time: "10:00 AM - 11:15 AM", title: "Web-Fluid Polymer Chemistry", code: "CHM-305", instructor: "Peter Parker", room: "Chem Lab 202", category: "Physics", note: "Tensile strength optimization & dissolvability timers." },
    { period: 3, time: "11:30 AM - 12:45 PM", title: "Spider-DNA Mutation Analysis", code: "BIO-408", instructor: "Dr. Curtis Connors", room: "ESU Room 104", category: "Genetics", note: "Arachnid chromosome gene therapy simulation." },
    { period: 4, time: "01:30 PM - 02:45 PM", title: "Multiverse Anomaly Detection", code: "PHY-510", instructor: "Miguel O'Hara", room: "Spider-Society HUD", category: "Multiverse", note: "Cannon event tracking and glitch stabilization." },
    { period: 5, time: "03:00 PM - 04:15 PM", title: "Digital Media & Photography 101", code: "JRN-202", instructor: "Robbie Robertson", room: "Daily Bugle Darkroom", category: "Ethics", note: "Action camera shutter speeds & spider-cam angles." },
    { period: 6, time: "04:30 PM - 05:30 PM", title: "Aerial Web-Swinging Practice", code: "PE-201", instructor: "Miles Morales", room: "Brooklyn Bridge Sector", category: "Gym", note: "Thwip-and-flip sequence mastery." }
  ],
  Wednesday: [
    { period: 1, time: "08:30 AM - 09:45 AM", title: "Quantum Multiverse Mechanics", code: "PHY-509", instructor: "Dr. Stephen Strange", room: "Sanctum Annex 4", category: "Multiverse", note: "Portal opening stability test." },
    { period: 2, time: "10:00 AM - 11:15 AM", title: "Web-Slinging Physics & Trajectories", code: "PHY-301", instructor: "Peter Parker", room: "Midtown High Roof Lab", category: "Physics", note: "Centripetal acceleration around skyscrapers." },
    { period: 3, time: "11:30 AM - 12:45 PM", title: "Nanotech Suit Diagnostics", code: "ROB-501", instructor: "Tony Stark (AI)", room: "Stark Tower Workshop", category: "Robotics", note: "Heads-up display calibration & iron-spider arms." },
    { period: 4, time: "01:30 PM - 02:45 PM", title: "Bio-Genetics & DNA Sequencing", code: "BIO-204", instructor: "Dr. Curtis Connors", room: "ESU Science Center", category: "Genetics", note: "Gene splicing safety protocols." },
    { period: 5, time: "03:00 PM - 04:15 PM", title: "Heroic Ethics & Public Safety", code: "ETH-101", instructor: "Captain Yuri Watanabe", room: "PD Headquarters", category: "Ethics", note: "Collateral damage minimization in urban fights." },
    { period: 6, time: "04:30 PM - 05:30 PM", title: "Stealth & Spider-Camouflage", code: "PE-303", instructor: "Gwen Stacy", room: "Midtown Roof Sector", category: "Gym", note: "Invisibility timing & silent landing techniques." }
  ],
  Thursday: [
    { period: 1, time: "08:30 AM - 09:45 AM", title: "Bio-Genetics & DNA Sequencing", code: "BIO-204", instructor: "Dr. Curtis Connors", room: "ESU Science Center", category: "Genetics", note: "Antidote compound synthesis." },
    { period: 2, time: "10:00 AM - 11:15 AM", title: "Cyber Security & Web Hacking", code: "CS-404", instructor: "Ned Leeds (Guy in the Chair)", room: "Lab 101", category: "Robotics", note: "Bypassing Oscorp firewall security." },
    { period: 3, time: "11:30 AM - 12:45 PM", title: "Web-Slinging Physics & Trajectories", code: "PHY-301", instructor: "Peter Parker", room: "Midtown High Roof Lab", category: "Physics", note: "Terminal velocity deceleration." },
    { period: 4, time: "01:30 PM - 02:45 PM", title: "Multiverse Glitch Neutralization", code: "PHY-512", instructor: "Spider-Gwen", room: "Earth-65 Gym", category: "Multiverse", note: "Dimensional wristwatch frequency calibration." },
    { period: 5, time: "03:00 PM - 04:15 PM", title: "Crime-Fighting Ethics & Journalism", code: "JRN-101", instructor: "J. Jonah Jameson", room: "Bugle Tech Hub", category: "Ethics", note: "Evaluating public perception." },
    { period: 6, time: "04:30 PM - 05:30 PM", title: "Web-Shooter Rapid Reload Drills", code: "PE-104", instructor: "Peter Parker", room: "Midtown Gym", category: "Gym", note: "Sub-second cartridge swap under fire." }
  ],
  Friday: [
    { period: 1, time: "08:30 AM - 09:45 AM", title: "Advanced AI & Robotics Mechanics", code: "ROB-402", instructor: "Prof. Otto Octavius", room: "Oscorp Sub-Level 3", category: "Robotics", note: "Final project submission for autonomous bots." },
    { period: 2, time: "10:00 AM - 11:15 AM", title: "Quantum Multiverse Mechanics", code: "PHY-509", instructor: "Dr. Stephen Strange", room: "Sanctum Annex 4", category: "Multiverse", note: "Timeline divergence tracking." },
    { period: 3, time: "11:30 AM - 12:45 PM", title: "Web-Slinging Physics & Trajectories", code: "PHY-301", instructor: "Peter Parker", room: "Midtown High Roof Lab", category: "Physics", note: "Wind tunnel drag coefficient analysis." },
    { period: 4, time: "01:30 PM - 02:45 PM", title: "Bio-Genetics & DNA Sequencing", code: "BIO-204", instructor: "Dr. Curtis Connors", room: "ESU Science Center", category: "Genetics", note: "Review of arachnid gene therapy." },
    { period: 5, time: "03:00 PM - 04:15 PM", title: "Spider-Man Squad Patrol Briefing", code: "ETH-300", instructor: "Peter Parker & Miles", room: "Midtown Command Room", category: "Ethics", note: "Weekend NYC sector patrol assignments." },
    { period: 6, time: "04:30 PM - 05:30 PM", title: "Spider-Verse Pizza Social & Free Lab", code: "SOC-101", instructor: "MJ Watson", room: "Cafeteria / Lounge", category: "Gym", note: "Relaxation & web-shooter maintenance." }
  ],
  Saturday: [
    { period: 1, time: "09:00 AM - 10:30 AM", title: "Oscorp Sub-Level Tech Infiltration", code: "ROB-601", instructor: "Ned Leeds", room: "Oscorp Sub-Lab 4", category: "Robotics", note: "Analyzing security protocol bypasses." },
    { period: 2, time: "10:45 AM - 12:15 PM", title: "Advanced Web-Fluid Synthesis", code: "CHM-402", instructor: "Peter Parker", room: "Midtown Chem Lab", category: "Physics", note: "Mixing high-tensile web polymer batches." },
    { period: 3, time: "01:30 PM - 03:00 PM", title: "Queens Sector Patrol & Citizen Response", code: "ETH-400", instructor: "Peter Parker & Miles", room: "Queens Rooftops", category: "Ethics", note: "Active city patrol and web-slinging response." },
    { period: 4, time: "03:15 PM - 04:45 PM", title: "Spider-Society Multiverse Portal Duty", code: "PHY-600", instructor: "Miguel O'Hara", room: "Multiverse Nexus", category: "Multiverse", note: "Dimensional anomaly monitoring shift." },
    { period: 5, time: "05:00 PM - 06:30 PM", title: "Bugle Photo Briefing & Pizza Lab", code: "JRN-303", instructor: "MJ Watson", room: "Joe's Pizza & Lounge", category: "Gym", note: "Weekend photo submissions & downtime." }
  ]
};

// --- Web Audio API Sound Synthesizer ---
class SpideyAudioEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playThwip() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playPowerOn() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.18);
    } catch(e) {}
  }

  playAlarm() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.setValueAtTime(1200, now + 0.1);
      osc.frequency.setValueAtTime(900, now + 0.2);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.3);
    } catch(e) {}
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.05);
    } catch(e) {}
  }
}

const audioFX = new SpideyAudioEngine();

// --- App Controller ---
class SpideyAppController {
  constructor() {
    this.scheduleData = this.loadSchedule();
    this.selectedDay = "Monday";
    this.selectedCategory = "All";
    this.currentHeroTheme = "peter";
    this.webFluidLevel = 98;
    this.dangerLevel = "NORMAL"; // NORMAL, WARNING, DANGER

    this.iotState = {
      projector: true,
      projectorMode: "Spider-Sense HUD",
      attendance: true,
      climate: true,
      temp: 68,
      lighting: true,
      lightColor: "#FF0844"
    };

    this.labTasks = [
      { id: 1, text: "Synthesize anti-venom polymer compound", done: true },
      { id: 2, text: "Calibrate Spider-Sense radar sensitivity", done: true },
      { id: 3, text: "Grade Web-Slinging Physics lab reports", done: false },
      { id: 4, text: "Refill web-shooter cartridges (98%)", done: false }
    ];

    this.apiBase = window.location.port === '5000' || window.location.origin.includes('5000') ? '/api' : 'http://localhost:5000/api';
    this.init();
  }

  async init() {
    this.bindClock();
    await this.fetchBackendData();
    this.renderTimetable();
    this.bindDayTabs();
    this.bindCategoryFilters();
    this.bindIoTControls();
    this.bindAITerminal();
    this.bindModalEvents();
    this.bindMultiverseSuitSwapper();
    this.bindWebShooterGauge();
    this.bindDangerSimulator();
    this.bindLabTasks();

    document.querySelectorAll('.btn-webshooter, .btn-webshooter-blue').forEach(btn => {
      btn.addEventListener('click', () => audioFX.playThwip());
    });
  }

  async fetchBackendData() {
    try {
      const res = await fetch(`${this.apiBase}/schedule`);
      if (res.ok) {
        const data = await res.json();
        if (data.schedule) {
          this.scheduleData = data.schedule;
          this.saveScheduleLocally();
        }
      }
    } catch (e) {
      console.log('Backend server offline or unreachable; using local storage/defaults');
    }

    try {
      const iotRes = await fetch(`${this.apiBase}/iot`);
      if (iotRes.ok) {
        const iotData = await iotRes.json();
        if (iotData.iot) this.iotState = { ...this.iotState, ...iotData.iot };
      }
    } catch (e) {}

    try {
      const tasksRes = await fetch(`${this.apiBase}/tasks`);
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        if (tasksData.tasks) this.labTasks = tasksData.tasks;
      }
    } catch (e) {}
  }

  loadSchedule() {
    const saved = localStorage.getItem('spidey_classroom_schedule');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.Saturday) {
          parsed.Saturday = DEFAULT_SCHEDULE.Saturday;
        }
        return parsed;
      } catch(e) {}
    }
    return DEFAULT_SCHEDULE;
  }

  saveScheduleLocally() {
    localStorage.setItem('spidey_classroom_schedule', JSON.stringify(this.scheduleData));
  }

  async saveSchedule() {
    this.saveScheduleLocally();
    try {
      await fetch(`${this.apiBase}/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedule: this.scheduleData })
      });
    } catch (e) {}
  }

  // --- Clock & Threat Monitor ---
  bindClock() {
    const clockEl = document.getElementById('live-clock');
    const dateEl = document.getElementById('live-date');
    const statusEl = document.getElementById('threat-status');

    const statusOptions = [
      "SPIDER-SENSE: ALL CLEAR",
      "SENSORS: OCTAVIUS DOCK DETECTED",
      "WEATHER: HIGH WIND ON BROOKLYN BRIDGE",
      "STATUS: WEB-SHOOTER FLUID AT 98%",
      "SPIDER-SENSE: NORMAL ATMOSPHERIC PRESS"
    ];

    let statusIdx = 0;
    setInterval(() => {
      if (this.dangerLevel === "NORMAL" && Math.random() < 0.15 && statusEl) {
        statusIdx = (statusIdx + 1) % statusOptions.length;
        statusEl.innerText = "● " + statusOptions[statusIdx];
      }
    }, 8000);

    const updateTime = () => {
      const now = new Date();
      if (clockEl) {
        clockEl.innerText = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
      if (dateEl) {
        dateEl.innerText = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // --- Multiverse Character Suit Swapper ---
  bindMultiverseSuitSwapper() {
    const heroButtons = document.querySelectorAll('.hero-select-btn');
    const suitAvatar = document.getElementById('hero-suit-avatar');
    const heroNameEl = document.getElementById('hero-name-display');
    const heroUniverseEl = document.getElementById('hero-universe-display');

    const heroProfiles = {
      peter: {
        name: "PETER PARKER (CLASSIC SPIDER-MAN)",
        universe: "EARTH-616 • MIDTOWN HIGH LAB",
        avatar: "🕷️",
        themeClass: "",
        greeting: "Spider-Bot AI synced to Peter Parker suit HUD. Ready for web-slinging physics!"
      },
      miles: {
        name: "MILES MORALES (SPIDER-MAN)",
        universe: "EARTH-1610 • BROOKLYN VISION LAB",
        avatar: "⚡",
        themeClass: "theme-miles",
        greeting: "Spider-Bot AI synced to Miles Morales suit HUD. Venom shock capabilities online!"
      },
      gwen: {
        name: "GWEN STACY (SPIDER-GWEN)",
        universe: "EARTH-65 • SUB-LEVEL MUSIC LAB",
        avatar: "🕸️",
        themeClass: "theme-gwen",
        greeting: "Spider-Bot AI synced to Gwen Stacy suit HUD. Dimensional wristwatches calibrated!"
      },
      2099: {
        name: "MIGUEL O'HARA (SPIDER-MAN 2099)",
        universe: "EARTH-928 • ALCHEMAX FUTURES LAB",
        avatar: "🌌",
        themeClass: "theme-2099",
        greeting: "Spider-Bot AI synced to Miguel O'Hara suit HUD. Lyla AI protocol active!"
      }
    };

    heroButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        audioFX.playThwip();
        const heroKey = btn.getAttribute('data-hero');
        const profile = heroProfiles[heroKey];
        if (!profile) return;

        heroButtons.forEach(b => b.classList.remove('border-red-500', 'bg-red-600/30', 'text-white'));
        btn.classList.add('border-red-500', 'bg-red-600/30', 'text-white');

        document.body.className = "bg-[#090D16] text-slate-100 min-h-screen relative overflow-x-hidden " + profile.themeClass;
        if (suitAvatar) suitAvatar.innerText = profile.avatar;
        if (heroNameEl) heroNameEl.innerText = profile.name;
        if (heroUniverseEl) heroUniverseEl.innerText = profile.universe;

        this.currentHeroTheme = heroKey;
        this.appendTerminalOutput(profile.greeting);
      });
    });
  }

  // --- Web-Shooter Ammo Gauge & Refill ---
  bindWebShooterGauge() {
    const refillBtn = document.getElementById('refill-ammo-btn');
    const fluidBar = document.getElementById('web-fluid-bar');
    const fluidText = document.getElementById('web-fluid-val');

    if (refillBtn) {
      refillBtn.addEventListener('click', () => {
        audioFX.playThwip();
        this.webFluidLevel = 100;
        if (fluidBar) fluidBar.style.width = "100%";
        if (fluidText) fluidText.innerText = "100%";
        this.appendTerminalOutput("WEB-SHOOTER CARTRIDGE REFILLED TO 100%! Pressure 120 PSI nominal.");
      });
    }
  }

  // --- Spider-Sense Danger Threat Simulator ---
  bindDangerSimulator() {
    const threatBtns = document.querySelectorAll('.threat-sim-btn');
    const statusEl = document.getElementById('threat-status');
    const mainContainer = document.querySelector('main');

    threatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.getAttribute('data-level');
        this.dangerLevel = level;

        threatBtns.forEach(b => b.classList.remove('border-red-500', 'bg-red-600/30', 'text-white'));
        btn.classList.add('border-red-500', 'bg-red-600/30', 'text-white');

        if (level === "NORMAL") {
          audioFX.playClick();
          if (statusEl) {
            statusEl.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40";
            statusEl.innerText = "● SPIDER-SENSE: ALL CLEAR";
          }
          if (mainContainer) mainContainer.classList.remove('danger-flash');
          this.appendTerminalOutput("Spider-Sense returned to normal baseline. Threat clear.");
        } else if (level === "WARNING") {
          audioFX.playPowerOn();
          if (statusEl) {
            statusEl.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse";
            statusEl.innerText = "⚠️ SPIDER-SENSE: ELEVATED THREAT";
          }
          if (mainContainer) mainContainer.classList.remove('danger-flash');
          this.appendTerminalOutput("⚠️ WARNING: Unusual seismic energy detected near Oscorp Tower!");
        } else if (level === "DANGER") {
          audioFX.playAlarm();
          if (statusEl) {
            statusEl.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white border border-red-400 animate-bounce";
            statusEl.innerText = "🚨 SPIDER-SENSE: DOC OCK ATTACK!";
          }
          if (mainContainer) mainContainer.classList.add('danger-flash');
          this.appendTerminalOutput("🚨 DANGER! Mechanical tentacles detected breaching Midtown High lab windows! Deploy web-barricades!");
        }
      });
    });
  }

  // --- Lab Task Checklist ---
  bindLabTasks() {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    
    if (addTaskBtn && taskInput) {
      addTaskBtn.addEventListener('click', () => {
        const val = taskInput.value.trim();
        if (val) {
          audioFX.playClick();
          this.labTasks.push({ id: Date.now(), text: val, done: false });
          taskInput.value = '';
          this.renderLabTasks();
        }
      });

      taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = taskInput.value.trim();
          if (val) {
            audioFX.playClick();
            this.labTasks.push({ id: Date.now(), text: val, done: false });
            taskInput.value = '';
            this.renderLabTasks();
          }
        }
      });
    }

    this.renderLabTasks();
  }

  renderLabTasks() {
    const listEl = document.getElementById('lab-tasks-list');
    if (!listEl) return;

    listEl.innerHTML = this.labTasks.map(t => `
      <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs">
        <label class="flex items-center gap-2 cursor-pointer ${t.done ? 'line-through text-slate-500' : 'text-slate-200'}">
          <input type="checkbox" ${t.done ? 'checked' : ''} onchange="app.toggleTask(${t.id})" class="accent-red-500 rounded cursor-pointer">
          <span>${t.text}</span>
        </label>
        <button onclick="app.deleteTask(${t.id})" class="text-slate-500 hover:text-red-400 p-1">
          &times;
        </button>
      </div>
    `).join('');
  }

  toggleTask(id) {
    audioFX.playClick();
    const task = this.labTasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      this.renderLabTasks();
    }
  }

  deleteTask(id) {
    audioFX.playClick();
    this.labTasks = this.labTasks.filter(t => t.id !== id);
    this.renderLabTasks();
  }

  // --- Timetable Rendering ---
  renderTimetable() {
    const grid = document.getElementById('timetable-grid');
    if (!grid) return;

    const daySchedule = this.scheduleData[this.selectedDay] || [];
    const filtered = daySchedule.filter(item => {
      if (this.selectedCategory === "All") return true;
      return item.category.toLowerCase() === this.selectedCategory.toLowerCase();
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full p-8 text-center spidey-glass rounded-xl text-slate-400">
          <p class="text-base font-bold text-cyan-400 mb-1">NO CLASSES SCHEDULED</p>
          <p class="text-xs">Free period detected! Time for NYC rooftop web patrol or lab research.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const categoryBadges = {
        Physics: 'bg-red-500/20 text-red-400 border-red-500/40',
        Robotics: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
        Genetics: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        Multiverse: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
        Ethics: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        Gym: 'bg-blue-500/20 text-blue-400 border-blue-500/40'
      };

      const badgeClass = categoryBadges[item.category] || 'bg-slate-700/50 text-slate-300 border-slate-600';

      return `
        <div class="timetable-slot active-class p-4.5 cursor-pointer group" onclick="app.openClassModal('${this.selectedDay}', ${item.period})">
          <div class="flex items-center justify-between mb-2.5">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border ${badgeClass}">
              PERIOD ${item.period} • ${item.category}
            </span>
            <span class="text-xs font-mono text-cyan-300 font-medium flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 9 0 0118 0z"></path></svg>
              ${item.time}
            </span>
          </div>

          <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
            ${item.title}
          </h3>

          <div class="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2.5 border-t border-white/10">
            <span class="flex items-center gap-1.5 text-slate-200 font-medium">
              <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              ${item.instructor}
            </span>
            <span class="flex items-center gap-1 font-mono text-cyan-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
              ${item.room}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  bindDayTabs() {
    const tabs = document.querySelectorAll('.day-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        audioFX.playClick();
        tabs.forEach(t => {
          t.classList.remove('bg-red-600', 'text-white', 'border-red-500', 'shadow-lg');
          t.classList.add('bg-slate-900/60', 'text-slate-400', 'border-white/10');
        });
        tab.classList.remove('bg-slate-900/60', 'text-slate-400', 'border-white/10');
        tab.classList.add('bg-red-600', 'text-white', 'border-red-500', 'shadow-lg');

        this.selectedDay = tab.getAttribute('data-day');
        this.renderTimetable();
      });
    });
  }

  bindCategoryFilters() {
    const filterBtns = document.querySelectorAll('.cat-filter');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audioFX.playClick();
        filterBtns.forEach(b => b.classList.remove('border-cyan-400', 'text-cyan-300', 'bg-cyan-500/20'));
        btn.classList.add('border-cyan-400', 'text-cyan-300', 'bg-cyan-500/20');
        this.selectedCategory = btn.getAttribute('data-cat');
        this.renderTimetable();
      });
    });
  }

  // --- Modal Controls ---
  openClassModal(day, period) {
    audioFX.playThwip();
    const dayList = this.scheduleData[day] || [];
    const item = dayList.find(i => i.period === period);
    if (!item) return;

    const modal = document.getElementById('class-detail-modal');
    if (!modal) return;

    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-code').innerText = `${item.code} • PERIOD ${item.period}`;
    document.getElementById('modal-instructor').innerText = item.instructor;
    document.getElementById('modal-room').innerText = item.room;
    document.getElementById('modal-time').innerText = item.time;
    document.getElementById('modal-note').innerText = item.note;
    document.getElementById('modal-category').innerText = item.category;

    modal.setAttribute('data-day', day);
    modal.setAttribute('data-period', period);

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeModal() {
    audioFX.playClick();
    const modal = document.getElementById('class-detail-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  bindModalEvents() {
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    const rescheduleBtn = document.getElementById('modal-reschedule-btn');
    if (rescheduleBtn) {
      rescheduleBtn.addEventListener('click', () => {
        const modal = document.getElementById('class-detail-modal');
        const day = modal.getAttribute('data-day');
        const period = parseInt(modal.getAttribute('data-period'));
        this.closeModal();

        const terminalInput = document.getElementById('ai-input');
        if (terminalInput) {
          terminalInput.value = `Reschedule Period ${period} on ${day}`;
          this.processAICommand(`Reschedule Period ${period} on ${day}`);
        }
      });
    }

    const addClassBtn = document.getElementById('add-class-btn');
    if (addClassBtn) {
      addClassBtn.addEventListener('click', () => {
        audioFX.playThwip();
        this.showAddClassPrompt();
      });
    }
  }

  showAddClassPrompt() {
    const title = prompt("Enter Class Title:", "Advanced Web-Fluid Chemistry");
    if (!title) return;
    const instructor = prompt("Enter Instructor Name:", "Peter Parker");
    const room = prompt("Enter Room Location:", "Roof Lab 4");
    const time = prompt("Enter Time Slot:", "05:45 PM - 07:00 PM");

    const newPeriod = {
      period: (this.scheduleData[this.selectedDay].length || 0) + 1,
      time: time || "05:45 PM - 07:00 PM",
      title: title,
      code: "SPY-999",
      instructor: instructor || "Peter Parker",
      room: room || "Midtown High Lab",
      category: "Physics",
      note: "Custom web-lab period."
    };

    if (!this.scheduleData[this.selectedDay]) this.scheduleData[this.selectedDay] = [];
    this.scheduleData[this.selectedDay].push(newPeriod);
    this.saveSchedule();
    this.renderTimetable();
    this.appendTerminalOutput(`ADDED NEW CLASS: "${title}" to ${this.selectedDay} schedule!`);
  }

  // --- IoT Classroom Controls ---
  bindIoTControls() {
    const projToggle = document.getElementById('toggle-projector');
    if (projToggle) {
      projToggle.checked = this.iotState.projector;
      projToggle.addEventListener('change', (e) => {
        this.iotState.projector = e.target.checked;
        if (e.target.checked) audioFX.playPowerOn(); else audioFX.playClick();
        this.updateIoTVisuals();
      });
    }

    document.querySelectorAll('.proj-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        audioFX.playClick();
        document.querySelectorAll('.proj-mode-btn').forEach(b => b.classList.remove('bg-red-600', 'text-white', 'border-red-500'));
        btn.classList.add('bg-red-600', 'text-white', 'border-red-500');
        this.iotState.projectorMode = btn.innerText;
        this.appendTerminalOutput(`HOLOGRAPHIC HUD MODE SWITCHED TO: ${btn.innerText.toUpperCase()}`);
      });
    });

    const attToggle = document.getElementById('toggle-attendance');
    if (attToggle) {
      attToggle.checked = this.iotState.attendance;
      attToggle.addEventListener('change', (e) => {
        this.iotState.attendance = e.target.checked;
        if (e.target.checked) audioFX.playPowerOn(); else audioFX.playClick();
        this.updateIoTVisuals();
      });
    }

    const climateToggle = document.getElementById('toggle-climate');
    const tempSlider = document.getElementById('temp-slider');
    const tempVal = document.getElementById('temp-display');

    if (climateToggle) {
      climateToggle.checked = this.iotState.climate;
      climateToggle.addEventListener('change', (e) => {
        this.iotState.climate = e.target.checked;
        if (e.target.checked) audioFX.playPowerOn(); else audioFX.playClick();
        this.updateIoTVisuals();
      });
    }

    if (tempSlider) {
      tempSlider.value = this.iotState.temp;
      tempSlider.addEventListener('input', (e) => {
        this.iotState.temp = e.target.value;
        if (tempVal) tempVal.innerText = `${e.target.value}°F`;
      });
    }

    const lightToggle = document.getElementById('toggle-lighting');
    if (lightToggle) {
      lightToggle.checked = this.iotState.lighting;
      lightToggle.addEventListener('change', (e) => {
        this.iotState.lighting = e.target.checked;
        if (e.target.checked) audioFX.playPowerOn(); else audioFX.playClick();
        this.updateIoTVisuals();
      });
    }

    document.querySelectorAll('.light-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        audioFX.playClick();
        const color = btn.getAttribute('data-color');
        const name = btn.getAttribute('data-name');
        this.iotState.lightColor = color;
        this.appendTerminalOutput(`AMBIENT LIGHTING PRESET ACTIVE: ${name.toUpperCase()}`);
        document.getElementById('light-status-label').innerText = `${name} Mode`;
      });
    });

    this.updateIoTVisuals();
  }

  updateIoTVisuals() {
    const projCard = document.getElementById('proj-card');
    if (projCard) {
      if (this.iotState.projector) {
        projCard.classList.add('spidey-glass-red', 'spider-sense-active');
        projCard.classList.remove('opacity-60');
      } else {
        projCard.classList.remove('spidey-glass-red', 'spider-sense-active');
        projCard.classList.add('opacity-60');
      }
    }

    const attCard = document.getElementById('att-card');
    if (attCard) {
      if (this.iotState.attendance) {
        attCard.classList.add('spidey-glass-blue');
        attCard.classList.remove('opacity-60');
      } else {
        attCard.classList.remove('spidey-glass-blue');
        attCard.classList.add('opacity-60');
      }
    }

    const climateCard = document.getElementById('climate-card');
    if (climateCard) {
      if (this.iotState.climate) {
        climateCard.classList.add('spidey-glass-blue');
        climateCard.classList.remove('opacity-60');
      } else {
        climateCard.classList.remove('spidey-glass-blue');
        climateCard.classList.add('opacity-60');
      }
    }

    const lightCard = document.getElementById('light-card');
    if (lightCard) {
      if (this.iotState.lighting) {
        lightCard.classList.add('spidey-glass-red');
        lightCard.classList.remove('opacity-60');
      } else {
        lightCard.classList.remove('spidey-glass-red');
        lightCard.classList.add('opacity-60');
      }
    }
  }

  // --- AI Terminal ---
  bindAITerminal() {
    const input = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const chips = document.querySelectorAll('.ai-chip');

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => {
        const val = input.value.trim();
        if (val) {
          audioFX.playThwip();
          this.processAICommand(val);
          input.value = '';
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = input.value.trim();
          if (val) {
            audioFX.playThwip();
            this.processAICommand(val);
            input.value = '';
          }
        }
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        audioFX.playClick();
        const text = chip.innerText.trim().replace(/^"/, '').replace(/"$/, '');
        if (input) input.value = text;
        this.processAICommand(text);
      });
    });
  }

  appendTerminalOutput(text, isUser = false) {
    const terminal = document.getElementById('terminal-logs');
    if (!terminal) return;

    const line = document.createElement('div');
    line.className = isUser ? "text-cyan-300 font-mono text-xs my-1 font-semibold flex items-start gap-1" : "text-emerald-400 font-mono text-xs my-1 leading-relaxed";

    if (isUser) {
      line.innerHTML = `<span class="text-red-400">spidey@midtown-lab:~$</span> ${text}`;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    } else {
      line.innerHTML = `<span class="text-cyan-400 font-bold">[SPIDER-BOT AI]:</span> `;
      const contentSpan = document.createElement('span');
      line.appendChild(contentSpan);
      terminal.appendChild(line);

      let i = 0;
      const timer = setInterval(() => {
        contentSpan.textContent += text.charAt(i);
        i++;
        terminal.scrollTop = terminal.scrollHeight;
        if (i >= text.length) clearInterval(timer);
      }, 10);
    }
  }

  async processAICommand(cmd) {
    this.appendTerminalOutput(cmd, true);

    let reply = "";
    try {
      const res = await fetch(`${this.apiBase}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd })
      });
      if (res.ok) {
        const data = await res.json();
        reply = data.reply;
        if (data.action === "RESCHEDULE") {
          if (this.scheduleData["Tuesday"]) {
            const chem = this.scheduleData["Tuesday"].find(c => c.code === "CHM-305");
            if (chem) chem.time = "02:00 PM - 03:15 PM";
            this.saveSchedule();
            this.renderTimetable();
          }
        } else if (data.action === "REFILL_AMMO") {
          this.webFluidLevel = 100;
          const bar = document.getElementById('web-fluid-bar');
          const val = document.getElementById('web-fluid-val');
          if (bar) bar.style.width = "100%";
          if (val) val.innerText = "100%";
        } else if (data.action === "LOCKDOWN") {
          const statusEl = document.getElementById('threat-status');
          if (statusEl) statusEl.innerText = "🚨 LEVEL 5 LOCKDOWN ACTIVE!";
          audioFX.playAlarm();
        }
      }
    } catch (e) {
      console.log('AI API offline, using local client logic');
    }

    if (!reply) {
      const lower = cmd.toLowerCase();
      if (lower.includes("reschedule") && (lower.includes("chemistry") || lower.includes("chm"))) {
        reply = "Got it, Parker! Chemistry lab has been moved to 2:00 PM on Tuesday. Don't melt the bunsen burners with web-fluid again!";
        if (this.scheduleData["Tuesday"]) {
          const chem = this.scheduleData["Tuesday"].find(c => c.code === "CHM-305");
          if (chem) chem.time = "02:00 PM - 03:15 PM";
          this.saveSchedule();
          this.renderTimetable();
        }
      } else if (lower.includes("bio-genetics") || lower.includes("who is teaching")) {
        reply = "Bio-Genetics is taught by Dr. Curtis Connors at ESU Science Center. Friendly reminder: do NOT mention reptilian tail regeneration during office hours!";
      } else if (lower.includes("projector")) {
        this.iotState.projector = !this.iotState.projector;
        const toggle = document.getElementById('toggle-projector');
        if (toggle) toggle.checked = this.iotState.projector;
        this.updateIoTVisuals();
        reply = `Holographic HUD Projector turned ${this.iotState.projector ? 'ON' : 'OFF'}. Spider-Sense visual grid active!`;
      } else if (lower.includes("lockdown") || lower.includes("alert")) {
        reply = "🚨 LOCKDOWN PROTOCOL INITIATED! Web-barricades deployed at Midtown High entrance. Oscorp security drones notified!";
        document.getElementById('threat-status').innerText = "🚨 LEVEL 5 LOCKDOWN ACTIVE!";
        audioFX.playAlarm();
      } else if (lower.includes("refill") || lower.includes("web-shooter")) {
        this.webFluidLevel = 100;
        document.getElementById('web-fluid-bar').style.width = "100%";
        document.getElementById('web-fluid-val').innerText = "100%";
        reply = "Web-Fluid cartridges refilled to 100%! Tensile strength 500 lbs/sq inch. Ready for thwip action!";
      } else {
        reply = `Command received: "${cmd}". Analyzing Spider-Verse lab database... Execution complete! Stay webbed!`;
      }
    }

    setTimeout(() => {
      this.appendTerminalOutput(reply, false);
    }, 200);
  }
}

let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new SpideyAppController();
});
