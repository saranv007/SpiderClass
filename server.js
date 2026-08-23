const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

// --- Middleware ---
app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS) directly from project root
app.use(express.static(path.join(__dirname)));

// --- Helper Functions for Data Persistence ---
function readDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return null;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data.json:', error);
    return null;
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing data.json:', error);
    return false;
  }
}

// --- REST API ENDPOINTS ---

// 1. Health & Server Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Midtown High Spidey-Classroom Portal API v2.0',
    hero: 'Peter Parker / Earth-616',
    timestamp: new Date().toISOString()
  });
});

// 2. Schedule Endpoints
app.get('/api/schedule', (req, res) => {
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read schedule database' });
  res.json({ success: true, schedule: db.schedule });
});

app.post('/api/schedule', (req, res) => {
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });
  
  db.schedule = req.body.schedule || req.body;
  if (writeDatabase(db)) {
    res.json({ success: true, message: 'Schedule updated successfully', schedule: db.schedule });
  } else {
    res.status(500).json({ error: 'Failed to save schedule' });
  }
});

app.post('/api/schedule/add', (req, res) => {
  const { day, classData } = req.body;
  if (!day || !classData) {
    return res.status(400).json({ error: 'Missing day or classData' });
  }
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });

  if (!db.schedule[day]) {
    db.schedule[day] = [];
  }

  const newPeriod = {
    period: db.schedule[day].length + 1,
    time: classData.time || "05:45 PM - 07:00 PM",
    title: classData.title || "New Web Class",
    code: classData.code || "SPY-999",
    instructor: classData.instructor || "Peter Parker",
    room: classData.room || "Midtown High Roof Lab",
    category: classData.category || "Physics",
    note: classData.note || "Added via Spidey Backend API"
  };

  db.schedule[day].push(newPeriod);
  writeDatabase(db);

  res.json({ success: true, message: `Class added to ${day}`, class: newPeriod, schedule: db.schedule });
});

app.put('/api/schedule/reschedule', (req, res) => {
  const { day, period, newTime, newRoom } = req.body;
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });

  const dayList = db.schedule[day];
  if (!dayList) return res.status(404).json({ error: `Day '${day}' not found` });

  const targetClass = dayList.find(c => c.period === Number(period));
  if (!targetClass) return res.status(404).json({ error: `Period ${period} not found on ${day}` });

  if (newTime) targetClass.time = newTime;
  if (newRoom) targetClass.room = newRoom;

  writeDatabase(db);
  res.json({ success: true, message: `Rescheduled period ${period} on ${day}`, updatedClass: targetClass });
});

// 3. IoT Controls Endpoints
app.get('/api/iot', (req, res) => {
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });
  res.json({ success: true, iot: db.iot });
});

app.put('/api/iot', (req, res) => {
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });

  db.iot = { ...db.iot, ...req.body };
  writeDatabase(db);
  res.json({ success: true, message: 'IoT settings updated', iot: db.iot });
});

// 4. Lab Tasks Checklist Endpoints
app.get('/api/tasks', (req, res) => {
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });
  res.json({ success: true, tasks: db.tasks });
});

app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Task text is required' });

  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });

  const newTask = {
    id: Date.now(),
    text: text,
    done: false
  };

  db.tasks.push(newTask);
  writeDatabase(db);
  res.json({ success: true, task: newTask, tasks: db.tasks });
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });

  const task = db.tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (typeof req.body.done !== 'undefined') {
    task.done = req.body.done;
  } else {
    task.done = !task.done;
  }

  writeDatabase(db);
  res.json({ success: true, task, tasks: db.tasks });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });

  db.tasks = db.tasks.filter(t => t.id !== taskId);
  writeDatabase(db);
  res.json({ success: true, message: 'Task deleted', tasks: db.tasks });
});

// 5. Web-Shooter Ammo Endpoints
app.get('/api/ammo', (req, res) => {
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });
  res.json({ success: true, webFluid: db.webFluid || 98 });
});

app.post('/api/ammo/refill', (req, res) => {
  const db = readDatabase();
  if (!db) return res.status(500).json({ error: 'Failed to read database' });

  db.webFluid = 100;
  writeDatabase(db);
  res.json({ success: true, message: 'Web-shooter fluid refilled to 100%', webFluid: 100 });
});

// 6. Spider-Bot AI Terminal Processor Endpoint
app.post('/api/ai/chat', (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).json({ error: 'Command text is required' });

  const lower = command.toLowerCase();
  const db = readDatabase();
  let aiReply = "";
  let actionTaken = null;

  if (lower.includes('reschedule') || lower.includes('move class')) {
    aiReply = "📅 Schedule override initiated! Updated class timing vector on Midtown High Lab grid.";
    actionTaken = "RESCHEDULE";
  } else if (lower.includes('who is teaching') || lower.includes('bio-genetics') || lower.includes('teacher')) {
    aiReply = "🧬 Dr. Curtis Connors is teaching Bio-Genetics & DNA Sequencing in ESU Science Center!";
    actionTaken = "QUERY_TEACHER";
  } else if (lower.includes('refill') || lower.includes('ammo') || lower.includes('cartridge')) {
    if (db) {
      db.webFluid = 100;
      writeDatabase(db);
    }
    aiReply = "🕸️ THWIP! Web-shooter cartridges pressurized & refilled to 100% capacity (120 PSI nominal)!";
    actionTaken = "REFILL_AMMO";
  } else if (lower.includes('lockdown') || lower.includes('danger') || lower.includes('threat')) {
    if (db) {
      db.threatLevel = "DANGER";
      writeDatabase(db);
    }
    aiReply = "🚨 LOCKDOWN PROTOCOL ACTIVATED! Web-barricades deployed. Spider-Sense alert broadcasting to all Hero suits!";
    actionTaken = "LOCKDOWN";
  } else if (lower.includes('light') || lower.includes('ambient') || lower.includes('red') || lower.includes('blue')) {
    aiReply = "💡 IoT Ambient lighting preset synced to Spider-Sense frequency.";
    actionTaken = "LIGHTING";
  } else {
    aiReply = `🤖 Spider-Bot processed command: "${command}". All lab systems operational!`;
    actionTaken = "GENERAL";
  }

  res.json({
    success: true,
    userCommand: command,
    reply: aiReply,
    action: actionTaken,
    timestamp: new Date().toLocaleTimeString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🕷️ SPIDEY-CLASSROOM BACKEND SERVER IS RUNNING!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📡 API Base Endpoint: http://localhost:${PORT}/api/status`);
  console.log(`=======================================================`);
});
