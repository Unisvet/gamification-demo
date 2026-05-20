import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  BookOpen, 
  RotateCcw, 
  Play, 
  Pause, 
  Clock, 
  TrendingUp, 
  Shield, 
  Cpu, 
  Users, 
  Zap, 
  UserCheck, 
  Settings, 
  Sliders, 
  Award, 
  History, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  BookMarked,
  Layers,
  Activity,
  Maximize2
} from 'lucide-react';

// ==========================================
// DATA & CONSTANTS
// ==========================================

const TALK_TIMELINE = [
  {
    id: 1,
    timeRange: "0:00 - 0:03",
    startSec: 0,
    endSec: 180,
    title: "Historical Limits of PBL",
    subtitle: "Moving past surface-level rewards",
    concepts: ["S&H Stamps (1896) & Boy Scouts (1907)", "Nick Pelling & Bunchball (2000s)", "The transactional 'PBL Triad' trap", "Self-Determination Theory (SDT)"],
    demo: "Overview of Moodle's baseline tracking features vs. intrinsic motivators.",
    objective: "Establish why we must transition from transactional rewards to deep intrinsic and narrative-driven motivation.",
    speakerCue: "Welcome the audience, present the limits of badge-hunting, and frame AI as the bridge to genuine intellectual immersion."
  },
  {
    id: 2,
    timeRange: "0:03 - 0:07",
    startSec: 180,
    endSec: 420,
    title: "The AI-Native Paradigm",
    subtitle: "From passive to agentic learning",
    concepts: ["Proactive agents vs static branching paths", "Contextual personalization", "Squirrel AI & Cognitive Tutors", "The Human-in-the-Loop (HITL) model"],
    demo: "Show how AI agents adaptively customize learning pathways without removing the teacher.",
    objective: "Detail how proactive agents scaffold dynamic help while maintaining pedagogical guardrails.",
    speakerCue: "Contrast classical branch-path storyboards with generative agent overlays that read a student's cognitive load."
  },
  {
    id: 3,
    timeRange: "0:07 - 0:12",
    startSec: 420,
    endSec: 720,
    title: "Moodle Demo I: Conversational AI",
    subtitle: "The Lovelace Expedition",
    concepts: ["Starship Dialectic narrative framework", "Socratic vs Galilean alignment parameters", "Role-based collaborative 'Bridge Crews'", "Galactic Gradebook and progress gating"],
    demo: "Demonstrate AURA's calibration panel and conditional Moodle activities.",
    objective: "Show how to teach history, ethics, and philosophy of science using an interactive narrative game in Moodle.",
    speakerCue: "Switch to Moodle on screen. Show the role selection (Archivist, Architect) and demonstrate AURA prompting students Socratically."
  },
  {
    id: 4,
    timeRange: "0:12 - 0:17",
    startSec: 720,
    endSec: 1020,
    title: "Moodle Demo II: Systems Simulation",
    subtitle: "Calculus of Blades",
    concepts: ["Escaping mathematical 'pseudo-context'", "Historical mathematical factions (Newton vs Leibniz)", "Spells mapped to ODE solvers & Laplace transforms", "Deterministic backend (SciPy/JAX/TPU) rigor"],
    demo: "Show dynamic trajectory solvers, RK4 Aegis, and Euler drift visualization.",
    objective: "Demonstrate that the backend remains academically rigorous while AI manages the immersive storytelling overlay.",
    speakerCue: "Point out the physics engine. Alter a value to show how incorrect calculus causes real-time instability/catastrophic failure."
  },
  {
    id: 5,
    timeRange: "0:17 - 0:20",
    startSec: 1020,
    endSec: 1200,
    title: "Pedagogical ROI & Strategy",
    subtitle: "Empowerment at scale",
    concepts: ["Instructor time reclaimed (5.6 hrs/week)", "Development cost reduction (75-90%)", "2x faster learning, 20% higher 30-day retention", "Fostering metacognition over automated grading"],
    demo: "Highlight the Instructor's Analytical Dashboard and automated diagnostics.",
    objective: "Equip peer university instructors with actionable design principles to adopt in their courses.",
    speakerCue: "Conclude by emphasizing that agentic gamification liberates instructors from administrative rote, allowing high-value mentoring."
  }
];

const HISTORICAL_TIMELINE = [
  { year: "1896", title: "S&H Green Stamps", desc: "First modern point-accumulation program incentivizing repeating customer behavior.", type: "extrinsic" },
  { year: "1907", title: "Boy Scouts Badges", desc: "Structured system of progressive badge achievements denoting specific skill sets.", type: "extrinsic" },
  { year: "1973", title: "The Game of Work", desc: "Charles Coonradt applies sports mechanics to corporate environments.", type: "hybrid" },
  { year: "1978", title: "MUD1 Launch", desc: "First Multi-User Dungeon establishes virtual shared spaces and progressive leveling loops.", type: "intrinsic" },
  { year: "2002", title: "Coined 'Gamification'", desc: "Nick Pelling defines the practice for ATMs and electronics.", type: "extrinsic" },
  { year: "2010", title: "The PBL Explosion", desc: "Duolingo, Kahoot, Bunchball popularize daily streaks and leaderboards globally.", type: "extrinsic" },
  { year: "2024+", title: "AI-Native Learning", desc: "Shift to proactive, agentic personalization, dynamic narrative translation, and Human-in-the-Loop environments.", type: "agentic" }
];

const FACTIONS = [
  {
    name: "Kinematic Vanguard",
    historicalLeader: "Isaac Newton (1676)",
    notation: "Fluxions (\\dot{x}, \\ddot{x})",
    manaCost: 40,
    lore: "They manipulate absolute motion, gravity fields, and inertia vector matrices. Precision is absolute.",
    spell: "Gravity Fluxion"
  },
  {
    name: "Spatial Weavers",
    historicalLeader: "Gottfried Leibniz (1693)",
    notation: "Differential Area (\\int y \\, dx)",
    manaCost: 35,
    lore: "They weave geometric boundaries, spatial wards, and derivative limits across the computational domain.",
    spell: "Area of Integration Warding"
  },
  {
    name: "Optimization Guild",
    historicalLeader: "Bernoulli Dynasty (1690s)",
    notation: "Brachistochrone (y' + Py = Qy^n)",
    manaCost: 50,
    lore: "Driven by professional rivalries, they manipulate continuous efficiency and path optimization spells.",
    spell: "Fastest Descent Brachistochrone"
  },
  {
    name: "Alchemical Stabilizers",
    historicalLeader: "Euler & Lagrange (1700s)",
    notation: "Euler-Lagrange \\delta L / \\delta q = 0",
    manaCost: 60,
    lore: "They force volatile, exact states out of inexact differentials. Experts at extreme system stabilization.",
    spell: "Runge-Kutta 4th Order Aegis"
  },
  {
    name: "Oracle of Orbits",
    historicalLeader: "Henri Poincaré (1890s)",
    notation: "Phase Portrait Trajectories",
    manaCost: 45,
    lore: "Seers of chaos. They do not calculate exact answers; they visualize the topology of phase space vectors to dodge attacks.",
    spell: "Poincaré Attractor Dodge"
  }
];

const SPELLS = [
  {
    id: "euler",
    name: "Euler's First-Order Strike",
    complexity: "Basic (Linear Step)",
    description: "Projects a linear force field using standard tangent-line approximation. Cheap, but suffers from rapid truncation drift on curves.",
    formula: "y_{n+1} = y_n + \\Delta t \\cdot f(t_n, y_n)",
    stability: "Low. Volatile on curved phase spaces."
  },
  {
    id: "rk4",
    name: "Runge-Kutta 4th Order Aegis",
    complexity: "Master (4-Stage Average)",
    description: "Casts four sequential temporal anchors to compute a perfectly weighted average slope. Near-zero trajectory drift.",
    formula: "y_{n+1} = y_n + \\frac{\\Delta t}{6}(k_1 + 2k_2 + 2k_3 + k_4)",
    stability: "Extremely High. Absorbs severe kinetic curves."
  },
  {
    id: "laplace",
    name: "Laplace Domain Expansion",
    complexity: "Advanced (Complex Frequency)",
    description: "Transports a volatile time-domain threat into the complex frequency frequency s-domain, freezing it into static algebraic forms.",
    formula: "\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty e^{-st} f(t) \\, dt",
    stability: "Infallible. Converts differentials to simple algebra."
  }
];

const AURA_PROMPTS = [
  {
    id: 1,
    scenario: "The ship's bio-domes are suffering a localized ecological collapse due to an automated ventilation glitch. Standard protocol says purge the sector. A crew member requests time to manually override.",
    socraticOption: "Ask the crew: 'What assumptions govern our willingness to sacrifice a sector, and what is the absolute worth of an organic system under duress?'",
    galileanOption: "Compute immediate risk probabilities, output optimal survival ratios, and order the automated purge for 98.4% ship safety efficiency."
  },
  {
    id: 2,
    scenario: "An alien transmission of historical records is discovered, written in an ancient logical code. It contradicts the ship's established navigation charts.",
    socraticOption: "Instruct AURA to host a mutual dialogue with the translator core: 'How does our frame of reference alter the truth of these coordinates?'",
    galileanOption: "Instantly run a comparative matrix alignment, discard the alien file as a low-probability mathematical anomaly, and retain the current optimal path."
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('talk'); // 'talk', 'timeline', 'lovelace', 'genesis', 'metrics'
  
  // Timer States
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const timerRef = useRef(null);

  // Lovelace Expedition States
  const [auraSocratic, setAuraSocratic] = useState(50); // 0 (Galilean/Persuasion) to 100 (Socratic/Discovery)
  const [bridgeRole, setBridgeRole] = useState('Archivist');
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [aurasChatLog, setAurasChatLog] = useState([
    { sender: 'AURA', text: "Lovelace Expedition initialized. I am online. Ready to chart the conceptual chronospace. How shall we balance our cognitive alignment?", type: 'system' }
  ]);

  // Project Genesis States
  const [selectedFaction, setSelectedFaction] = useState(FACTIONS[0]);
  const [selectedSpell, setSelectedSpell] = useState('rk4');
  const [timeStep, setTimeStep] = useState(0.4); // Delta t for ODE simulation
  const [stiffness, setStiffness] = useState(2.0); // Spells volatility
  const [simPoints, setSimPoints] = useState([]);
  const [rk4Points, setRk4Points] = useState([]);

  // Timer Tick Logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => {
          const nextSec = prev + 1;
          if (nextSec >= 1200) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            return 1200;
          }
          // Find current active segment index
          const segmentIdx = TALK_TIMELINE.findIndex(seg => nextSec >= seg.startSec && nextSec < seg.endSec);
          if (segmentIdx !== -1) {
            setActiveSegmentIndex(segmentIdx);
          }
          return nextSec;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const handleSegmentClick = (idx) => {
    const targetSegment = TALK_TIMELINE[idx];
    setSecondsElapsed(targetSegment.startSec);
    setActiveSegmentIndex(idx);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculus of Blades: Dynamic Mathematical Spell Simulator
  // Simulates solutions for dy/dt = -stiffness * y + sin(t)
  const runOdeSimulation = () => {
    const dt = parseFloat(timeStep);
    const k = parseFloat(stiffness);
    let y_euler = 1.0;
    let y_rk4 = 1.0;
    const pts_euler = [];
    const pts_rk4 = [];
    
    // Total simulated steps
    const totalSteps = 40;
    for (let i = 0; i <= totalSteps; i++) {
      const t = i * 0.2;
      
      // Compute analytic sine component for visual styling
      const baseWave = Math.sin(t);
      
      // 1. Euler Method Simulation
      // Simple linear step. For large dt, it will wildly oscillate or explode.
      pts_euler.push({ x: i * (400 / totalSteps), y: y_euler });
      const f_euler = -k * y_euler + baseWave;
      y_euler = y_euler + dt * f_euler;

      // Ensure boundaries to prevent infinite crash
      if (Math.abs(y_euler) > 15) {
        y_euler = y_euler > 0 ? 15 : -15;
      }

      // 2. Runge-Kutta 4th Order Simulation
      // Highly stable 4-point approximation
      pts_rk4.push({ x: i * (400 / totalSteps), y: y_rk4 });
      
      const f = (temp_y, temp_t) => -k * temp_y + Math.sin(temp_t);
      
      const k1 = f(y_rk4, t);
      const k2 = f(y_rk4 + (dt / 2) * k1, t + dt / 2);
      const k3 = f(y_rk4 + (dt / 2) * k2, t + dt / 2);
      const k4 = f(y_rk4 + dt * k3, t + dt);
      
      y_rk4 = y_rk4 + (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      if (Math.abs(y_rk4) > 15) {
        y_rk4 = y_rk4 > 0 ? 15 : -15;
      }
    }
    
    setSimPoints(pts_euler);
    setRk4Points(pts_rk4);
  };

  // Trigger mathematical simulation when parameters change
  useEffect(() => {
    runOdeSimulation();
  }, [timeStep, stiffness]);

  // Lovelace interaction handler
  const handleAuraInteraction = (choiceType, text) => {
    let auraShift = 0;
    let auraReply = "";
    
    if (choiceType === 'socratic') {
      auraShift = 12;
      auraReply = "AURA feedback loop updated. Shifting logical parameters toward 'Discovery' and critical inquiry. Socratic governor initialized. 'We must acknowledge we know nothing before we can build a sound hypothesis.'";
    } else {
      auraShift = -12;
      auraReply = "AURA feedback loop updated. Optimizing for 'Persuasion' and immediate structural efficiency. High-dimensional vector paths consolidated. 'Action prioritization completes our goals with high-confidence probability metrics.'";
    }

    setAuraSocratic(prev => Math.max(0, Math.min(100, prev + auraShift)));
    
    setAurasChatLog(prev => [
      ...prev,
      { sender: 'You', text: text, type: 'user' },
      { sender: 'AURA', text: auraReply, type: 'ai' }
    ]);

    // Move to next scenario if possible
    setTimeout(() => {
      setActiveScenarioIdx(prev => (prev + 1) % AURA_PROMPTS.length);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* HEADER SECTION */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                May Topic: AI in Higher Education
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                Weekly: A Teacher's Perspective
              </span>
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              Gamification with AI: Course Architect Companion
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              An interactive framework detailing the paradigm shift from static points to agentic AI narratives. Perfect for your 20-minute presentation or Moodle integrations.
            </p>
          </div>
          
          {/* NAVIGATION TABS */}
          <nav className="flex flex-wrap bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 gap-1">
            <button 
              onClick={() => setActiveTab('talk')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'talk' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
            >
              <Clock className="w-3.5 h-3.5" />
              20-Min Presenter
            </button>
            <button 
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'timeline' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
            >
              <History className="w-3.5 h-3.5" />
              Paradigm Shift
            </button>
            <button 
              onClick={() => setActiveTab('lovelace')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'lovelace' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
            >
              <Compass className="w-3.5 h-3.5" />
              Moodle I: AURA
            </button>
            <button 
              onClick={() => setActiveTab('genesis')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'genesis' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
            >
              <Activity className="w-3.5 h-3.5" />
              Moodle II: Spellcraft
            </button>
            <button 
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === 'metrics' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Teacher Analytics
            </button>
          </nav>
        </div>
      </header>

      {/* CORE DISPLAY WINDOW */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 gap-6">
        
        {/* =======================================================
            TAB 1: 20-MINUTE PRESENTER DASHBOARD
            ======================================================= */}
        {activeTab === 'talk' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Interactive Real-Time Presentation Controller */}
            <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-400" />
                    Presentation Monitor
                  </h3>
                  <div className="text-xs font-mono bg-slate-950/80 px-2.5 py-1 rounded-md text-emerald-400 border border-slate-800">
                    Target: 20:00 Max
                  </div>
                </div>

                {/* Big Live Countdown / Timer */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 mb-6 text-center shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-1000"
                      style={{ width: `${(secondsElapsed / 1200) * 100}%` }}
                    />
                  </div>
                  <div className="text-5xl font-extrabold font-mono text-white mb-2 tracking-wider">
                    {formatTime(secondsElapsed)}
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Current Running Frame
                  </p>
                </div>

                {/* Live Controls */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all ${
                      isPlaying 
                        ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause Lecture' : 'Start Talk Timer'}
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setSecondsElapsed(0);
                      setActiveSegmentIndex(0);
                    }}
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Segment Quick Navigator */}
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Jump to Section Cues:
                </h4>
                <div className="space-y-2">
                  {TALK_TIMELINE.map((seg, idx) => {
                    const isActive = activeSegmentIndex === idx;
                    return (
                      <button
                        key={seg.id}
                        onClick={() => handleSegmentClick(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex justify-between items-center ${
                          isActive 
                            ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-200' 
                            : 'bg-slate-950/20 border-slate-800/60 text-slate-400 hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="font-semibold pr-2">
                          <span className="font-mono text-indigo-400 mr-1.5 font-bold">[{seg.timeRange}]</span>
                          {seg.title}
                        </div>
                        <ArrowRight className={`w-3 h-3 text-indigo-400 transition-transform ${isActive ? 'translate-x-1' : 'opacity-30'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Speaker Cheat-Sheet Checklist */}
              <div className="border-t border-slate-800/80 pt-4 mt-6">
                <div className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Active Speaker Cues:
                </div>
                <div className="bg-slate-950/40 border border-slate-800/50 p-3 rounded-xl text-xs text-slate-400 leading-relaxed italic">
                  "{TALK_TIMELINE[activeSegmentIndex].speakerCue}"
                </div>
              </div>
            </div>

            {/* Right: Dynamic Slide & Content Visualizer */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Active Slide Frame (Visualizing the presentation screen) */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-xl min-h-[420px] flex flex-col justify-between">
                
                {/* Visual Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Top slide stats */}
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                      Slide Scene {TALK_TIMELINE[activeSegmentIndex].id} of 5
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-slate-950/80 border border-slate-800 text-xs font-bold font-mono rounded-full text-indigo-300">
                    Phase: {TALK_TIMELINE[activeSegmentIndex].timeRange}
                  </span>
                </div>

                {/* Main Slide Title & Body */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
                      {TALK_TIMELINE[activeSegmentIndex].title}
                    </h2>
                    <p className="text-sm font-semibold text-indigo-400 mt-1">
                      {TALK_TIMELINE[activeSegmentIndex].subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    
                    {/* Key Core Bulletpoints */}
                    <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-2xl">
                      <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5 text-indigo-400" />
                        Core Slide Concepts:
                      </h4>
                      <ul className="space-y-2">
                        {TALK_TIMELINE[activeSegmentIndex].concepts.map((concept, cIdx) => (
                          <li key={cIdx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-indigo-500 mt-0.5 font-bold">•</span>
                            <span>{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Moodle Target Action */}
                    <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                          Target Moodle Demo:
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {TALK_TIMELINE[activeSegmentIndex].demo}
                        </p>
                      </div>
                      
                      {/* Short Action Button */}
                      {TALK_TIMELINE[activeSegmentIndex].id === 3 && (
                        <button 
                          onClick={() => setActiveTab('lovelace')}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg font-bold transition-all"
                        >
                          Launch AURA Simulation Workspace
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {TALK_TIMELINE[activeSegmentIndex].id === 4 && (
                        <button 
                          onClick={() => setActiveTab('genesis')}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-bold transition-all"
                        >
                          Launch Spellcraft Physics Sandbox
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                  </div>
                </div>

                {/* Bottom Slide Footer (Pedagogical Objective) */}
                <div className="border-t border-slate-800/80 pt-4 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-2 max-w-xl">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400">
                      <span className="font-bold text-slate-300 block">Core Pedagogical Target:</span>
                      {TALK_TIMELINE[activeSegmentIndex].objective}
                    </p>
                  </div>
                  
                  {/* Quick Indicator */}
                  <div className="text-[10px] font-mono font-bold uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded">
                    HE Academic Forum
                  </div>
                </div>

              </div>

              {/* Dynamic Presentation Quick Tips */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                  <h5 className="font-bold text-xs text-slate-200 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Start Strong (0:00)
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Hook them with the 1896 history of Green Stamps to prove our current PBL loop is over a century outdated.
                  </p>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                  <h5 className="font-bold text-xs text-slate-200 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Live Interaction (7:00)
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Show them AURA on screen! Slide AURA's alignment and read the dynamic feedback to illustrate active learning.
                  </p>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                  <h5 className="font-bold text-xs text-slate-200 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Math as Magic (12:00)
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Emphasize that the spell mechanics are computed deterministically. If the math is wrong, the path explodes.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =======================================================
            TAB 2: PARADIGM SHIFT (HISTORICAL TIMELINE)
            ======================================================= */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            
            {/* Intro Hero Box */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" />
                The Evolutionary Spectrum of Gamification
              </h3>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                Historically, gamification has lived under the extrinsic Points, Badges, and Leaderboards (PBL) paradigm. The rise of Agentic AI creates an entirely new spectrum, letting educators construct self-adapting mathematical fictions where students gain agency.
              </p>
            </div>

            {/* Interactive Timeline Visual */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 overflow-x-auto">
              <div className="min-w-[800px] relative py-8">
                
                {/* Horizontal Bar */}
                <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -translate-y-1/2" />

                {/* Timeline Nodes */}
                <div className="flex justify-between items-center relative z-10">
                  {HISTORICAL_TIMELINE.map((node, idx) => (
                    <div key={idx} className="w-[110px] text-center flex flex-col items-center">
                      
                      {/* Badge / Year Indicator */}
                      <div className="mb-4 text-xs font-mono font-extrabold text-indigo-400 bg-slate-950/90 border border-slate-800 px-2 py-1 rounded">
                        {node.year}
                      </div>

                      {/* Connection Dot */}
                      <div className={`w-5 h-5 rounded-full border-4 ${
                        node.type === 'agentic' 
                          ? 'bg-emerald-500 border-emerald-950 animate-pulse' 
                          : node.type === 'intrinsic'
                          ? 'bg-indigo-500 border-indigo-950'
                          : 'bg-slate-700 border-slate-900'
                      }`} />

                      {/* Meta Node Content */}
                      <div className="mt-4">
                        <h4 className="font-bold text-xs text-slate-200 line-clamp-1">
                          {node.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 line-clamp-3 mt-1 leading-normal px-1">
                          {node.desc}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Conceptual Comparison Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: PBL Limits */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">The Extrinsic PBL Triad</h4>
                    <span className="text-[10px] font-mono text-rose-400">Traditional Gamification Veneer</span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Standard gamification relies heavily on points, badges, and leaderboards. While effective in the short-term, academic research shows it often diminishes intrinsic interest, converting active inquiry into rote compliance.
                </p>

                <div className="space-y-2">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-rose-500">✕</span>
                    <span>Creates transactional, check-the-box behaviors.</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-rose-500">✕</span>
                    <span>Relies on static, rigid branch-path structures.</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-rose-500">✕</span>
                    <span>Fictional context functions as decorative veneer.</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Agentic Paradigm */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">The Agentic AI-Native Leap</h4>
                    <span className="text-[10px] font-mono text-emerald-400">Intrinsic Contextual Personalization</span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  AI-native gamification adapts to the student's cognitive load. By running generative language agents alongside real-time deterministic solvers, it scales highly complex storytelling where mechanics match mathematical truths.
                </p>

                <div className="space-y-2">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Addresses autonomy, competence, and relatedness (SDT).</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Supports highly adaptive, conversationally-scaffolded feedback.</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Escapes pseudo-context by aligning code directly with narrative logic.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =======================================================
            TAB 3: MOODLE DEMO I SIMULATOR (THE LOVELACE EXPEDITION)
            ======================================================= */}
        {activeTab === 'lovelace' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Interactive Control Center */}
            <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  Lovelace Expedition Configurator
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Calibrate the crew parameters for the **Conversational AI** master's curriculum on Moodle.
                </p>
              </div>

              {/* Step 1: Bridge Crew Role Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Assign Bridge Crew Role Profile:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Archivist', 'Core Architect', 'Ethical Navigator', 'Contact Specialist'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setBridgeRole(role)}
                      className={`py-2.5 px-3 rounded-xl border text-left text-xs transition-all ${
                        bridgeRole === role 
                          ? 'bg-indigo-600 border-indigo-500 text-white font-bold' 
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 italic block mt-1">
                  *Different roles receive unique Moodle dashboards and narrative tasks.
                </span>
              </div>

              {/* Step 2: Socratic vs Galilean alignment meter */}
              <div className="space-y-3 bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">AURA AI Alignment</span>
                  <span className="text-xs font-mono font-bold text-indigo-400">{auraSocratic}% Socratic</span>
                </div>
                
                {/* Visual Bar */}
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-slate-400 transition-all duration-300"
                    style={{ width: `${100 - auraSocratic}%` }}
                  />
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${auraSocratic}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>GALILEAN (Persuasion)</span>
                  <span>SOCRATIC (Discovery)</span>
                </div>
              </div>

              {/* Overview of current Act on Moodle */}
              <div className="border-t border-slate-800/80 pt-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Active Expedition Path:
                </h4>
                <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-indigo-300">Act I: Ancient Signals (Weeks 1-5)</div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Recovering the Elenchus code from historical archives to install AURA's foundational reasoning layers.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Immersive Starship Console & Simulation Sandbox */}
            <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between min-h-[500px]">
              
              {/* Header bar of AURA */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">AURA System Core</h4>
                    <p className="text-[10px] font-mono text-slate-400">Adaptive Understanding & Reasoning Architecture</p>
                  </div>
                </div>

                <div className="flex gap-2 text-xs font-mono">
                  <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20 font-bold">
                    Profile: {auraSocratic >= 50 ? 'Socratic Inquiry' : 'Galilean Persuasion'}
                  </span>
                </div>
              </div>

              {/* Chat Viewport */}
              <div className="flex-1 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 overflow-y-auto mb-4 space-y-3 min-h-[220px] max-h-[280px]">
                {aurasChatLog.map((chat, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col max-w-[85%] ${
                      chat.sender === 'You' ? 'ml-auto items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-400 mb-0.5">{chat.sender}</span>
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      chat.sender === 'You' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : chat.type === 'system'
                        ? 'bg-slate-900/60 border border-slate-800 text-slate-300'
                        : 'bg-slate-900 text-slate-300 rounded-tl-none border border-indigo-500/20'
                    }`}>
                      {chat.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Scenario Prompt Controller */}
              <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-2xl space-y-4">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/15 border border-indigo-500/25 px-1.5 py-0.5 rounded shrink-0">
                    Scenario {activeScenarioIdx + 1}
                  </span>
                  <p className="text-xs font-semibold text-slate-300 leading-normal">
                    {AURA_PROMPTS[activeScenarioIdx].scenario}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  
                  {/* Option 1: Socratic Direction */}
                  <button
                    onClick={() => handleAuraInteraction('socratic', AURA_PROMPTS[activeScenarioIdx].socraticOption)}
                    className="p-3 text-left rounded-xl border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-200 transition-all text-xs space-y-1"
                  >
                    <div className="font-extrabold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Socratic Path (Discovery)
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {AURA_PROMPTS[activeScenarioIdx].socraticOption}
                    </p>
                  </button>

                  {/* Option 2: Galilean Direction */}
                  <button
                    onClick={() => handleAuraInteraction('galilean', AURA_PROMPTS[activeScenarioIdx].galileanOption)}
                    className="p-3 text-left rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-200 transition-all text-xs space-y-1"
                  >
                    <div className="font-extrabold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      Galilean Path (Persuasion)
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {AURA_PROMPTS[activeScenarioIdx].galileanOption}
                    </p>
                  </button>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* =======================================================
            TAB 4: MOODLE DEMO II SIMULATOR (CALCULUS OF BLADES)
            ======================================================= */}
        {activeTab === 'genesis' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Core Parameters and Lore Choice */}
            <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    Calculus of Blades Academy
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Set numerical and system simulation parameters below. If the calculus fails boundary conditions, systems oscillate into instability.
                  </p>
                </div>

                {/* Choose Faction */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Choose Mathematical Faction:
                  </label>
                  <select 
                    value={selectedFaction.name}
                    onChange={(e) => {
                      const fac = FACTIONS.find(f => f.name === e.target.value);
                      setSelectedFaction(fac);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                  >
                    {FACTIONS.map((f, fIdx) => (
                      <option key={fIdx} value={f.name}>{f.name} ({f.historicalLeader})</option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80 leading-normal">
                    {selectedFaction.lore}
                  </p>
                </div>

                {/* Sliders */}
                <div className="space-y-4 bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                  
                  {/* Slider: Integration Time Step (Delta t) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-300">Time Step (&Delta;t):</span>
                      <span className="font-mono text-emerald-400 font-bold">{timeStep} s</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="1.2" 
                      step="0.05"
                      value={timeStep}
                      onChange={(e) => setTimeStep(e.target.value)}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>0.1 (Stable, Expensive)</span>
                      <span>1.2 (Extremely Volatile)</span>
                    </div>
                  </div>

                  {/* Slider: System Stiffness (k value) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-300">System Stiffness (k):</span>
                      <span className="font-mono text-emerald-400 font-bold">{stiffness} Hz</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="4.5" 
                      step="0.1"
                      value={stiffness}
                      onChange={(e) => setStiffness(e.target.value)}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>0.5 (Smooth, Gentle)</span>
                      <span>4.5 (High Stiffness)</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Spell slot */}
              <div className="border-t border-slate-800/80 pt-4">
                <div className="text-xs font-bold text-slate-300 mb-1 uppercase tracking-wide">
                  Signature Spell Cast:
                </div>
                <div className="bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-400">{selectedFaction.spell}</div>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">Notation: {selectedFaction.notation}</span>
                  </div>
                  <span className="text-xs font-mono bg-slate-950 border border-slate-800 px-2 py-1 rounded text-amber-400 font-bold">
                    {selectedFaction.manaCost} MP
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Simulated Physics Plotter Screen */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                
                {/* Simulated Screen Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      Dynamic Vector Space (Physics Output)
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      Equation: dy/dt = -k * y + sin(t) with initial state y(0)=1.0
                    </span>
                  </div>
                  
                  {/* Compiler status */}
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md text-[10px] font-mono font-bold tracking-wider">
                    COMPILER: JAX-accelerated TPU (v5p)
                  </span>
                </div>

                {/* SVG Live Simulation Chart Graph */}
                <div className="bg-slate-950/95 border border-slate-800/80 rounded-2xl p-4 relative overflow-hidden h-[300px]">
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5 pointer-events-none">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="border-t border-l border-slate-100" />
                    ))}
                  </div>

                  {/* Draw trajectory curves inside interactive SVG coordinates */}
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
                    
                    {/* Zero-Reference Axis Line */}
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

                    {/* EULER SOLUTION PATH (EXPLODING / DRIFTING) */}
                    {simPoints.length > 0 && (
                      <path
                        d={`M ${simPoints.map(p => `${p.x} ${100 - (p.y * 50)}`).join(' L ')}`}
                        fill="none"
                        stroke={Math.abs(simPoints[simPoints.length - 1]?.y || 0) > 4 ? "#ef4444" : "#f97316"}
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                    )}

                    {/* RUNGE-KUTTA 4TH ORDER PATH (ACCURATE & STABILIZED) */}
                    {rk4Points.length > 0 && (
                      <path
                        d={`M ${rk4Points.map(p => `${p.x} ${100 - (p.y * 50)}`).join(' L ')}`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.5"
                        strokeDasharray="1, 0"
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Graphic Labels */}
                    <text x="10" y="30" fill="#f97316" fontSize="10" fontWeight="bold">Euler Method Approximation (Tangents)</text>
                    <text x="10" y="50" fill="#10b981" fontSize="10" fontWeight="bold">Runge-Kutta 4th Order (Stabilized)</text>

                    {/* Critical Drift Alert indicator if Euler explodes */}
                    {Math.abs(simPoints[simPoints.length - 1]?.y || 0) > 4.0 && (
                      <g>
                        <rect x="230" y="10" width="160" height="30" rx="4" fill="#991b1b" fillOpacity="0.8" />
                        <text x="240" y="28" fill="#fca5a5" fontSize="10" fontWeight="bold">⚠️ SYSTEM RUNAWAY INSTABILITY</text>
                      </g>
                    )}
                  </svg>
                </div>

                {/* Spell choices to resolve drift */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {SPELLS.map((sp) => (
                    <button
                      key={sp.id}
                      onClick={() => {
                        setSelectedSpell(sp.id);
                        if (sp.id === 'rk4') {
                          setTimeStep(0.2); // Set to highly stable
                          setStiffness(1.5);
                        } else if (sp.id === 'euler') {
                          setTimeStep(0.95); // Set to unstable parameters
                          setStiffness(4.2);
                        } else if (sp.id === 'laplace') {
                          setTimeStep(0.1); // Ultra-perfect convergence
                          setStiffness(0.8);
                        }
                      }}
                      className={`p-4 text-left rounded-xl border transition-all text-xs flex flex-col justify-between ${
                        selectedSpell === sp.id 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-slate-100 shadow-lg' 
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-extrabold ${selectedSpell === sp.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {sp.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal mb-3">
                          {sp.description}
                        </p>
                      </div>

                      <div className="border-t border-slate-800/80 pt-2 w-full mt-2 flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-500">Method: {sp.complexity}</span>
                        <span className={selectedSpell === sp.id ? 'text-emerald-400' : 'text-slate-400'}>
                          Stability: {sp.stability}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* =======================================================
            TAB 5: PEDAGOGICAL ROI & ANALYTICS
            ======================================================= */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            
            {/* Upper Panel Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Administrative ROI & Structural Metrics
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                Adopting agentic systems is not just about fun mechanics. It drives massive improvements in teacher workflow efficiency and guarantees deep, verifiable long-term knowledge retention.
              </p>
            </div>

            {/* Metrics Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Time Saved / Instructor
                  </div>
                  <div className="text-3xl font-black text-white tracking-tight">5.6 Hours</div>
                  <span className="text-xs font-mono text-emerald-400 mt-1 block font-semibold">Saved per week in admin routine</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                  Generative models manage enrollment pathways, schedule queries, and course syllabus inquiries automatically.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Competency Speedup
                  </div>
                  <div className="text-3xl font-black text-white tracking-tight">2 to 3 Weeks</div>
                  <span className="text-xs font-mono text-emerald-400 mt-1 block font-semibold">Reduced from standard 10 weeks</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                  Immediate, context-aware scaffolding loops prevent students from hitting frustrating structural roadblocks.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    30-Day Knowledge Retention
                  </div>
                  <div className="text-3xl font-black text-white tracking-tight">70% – 80%</div>
                  <span className="text-xs font-mono text-indigo-400 mt-1 block font-semibold">Double conventional levels</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                  Fictional narrative presence transports intellectual concepts directly into active retrieval situations.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Syllabus Design Costs
                  </div>
                  <div className="text-3xl font-black text-white tracking-tight">75% – 90%</div>
                  <span className="text-xs font-mono text-emerald-400 mt-1 block font-semibold">Reduction in development cycle</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                  Antigravity spec-driven workflows generate beautiful templates and diagnostic tests within minutes.
                </p>
              </div>

            </div>

            {/* Teacher in the Loop Diagram/Interactive Sandbox */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
              <h4 className="font-bold text-slate-200 mb-4 flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-indigo-400" />
                The Human-in-the-Loop Dynamic Architecture
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                
                {/* Segment 1 */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center space-y-2 relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-xs text-slate-200">Pedagogical Architect (Human)</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Maintains supreme authority, sets ethical guidelines, designs narrative rules, and guides rhetorical mastery.
                  </p>
                </div>

                {/* Segment 2 */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center space-y-2 relative">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-xs text-slate-200">Deterministic Engine (SciPy/JAX)</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Performs rigid, immutable calculations. Checks syntax, measures stability, and executes deterministic models.
                  </p>
                </div>

                {/* Segment 3 */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center space-y-2 relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-xs text-slate-200">Agentic Overlay (Generative AI)</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Customizes dialogue context, generates dynamic clues, translates results, and handles high-throughput queries.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER CUES */}
      <footer className="border-t border-slate-800 bg-slate-950/60 p-4 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center max-w-7xl w-full mx-auto gap-3">
        <p>© 2026 Higher Education AI Forum. Designed for Course Architects.</p>
        <div className="flex gap-4">
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Syllabus Template</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Moodle Configuration Docs</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Contact Author</span>
        </div>
      </footer>

    </div>
  );
}
