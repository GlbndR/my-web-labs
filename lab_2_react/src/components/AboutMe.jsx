import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Box, Sphere, Float, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D СЦЕНИ ДЛЯ НАВИЧОК ---

// 1. Сцена для Мереж/Wireshark (Потік даних)
function NetworkTrafficScene() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  return (
    <group ref={ref}>
      <Sphere args={[0.5, 16, 16]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" wireframe />
      </Sphere>
      <Sphere args={[0.5, 16, 16]} position={[1, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" wireframe />
      </Sphere>
      {/* Лінія зв'язку */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>
      {/* "Пакет", що летить */}
      <Sphere args={[0.1, 8, 8]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#00ffcc" />
      </Sphere>
    </group>
  );
}

// 2. Сцена для Криптографії (Складний замок/Вузол)
function CryptoScene() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <TorusKnot ref={ref} args={[0.6, 0.2, 100, 16]}>
      <meshStandardMaterial color="#8b5cf6" emissive="#4c1d95" emissiveIntensity={0.5} wireframe />
    </TorusKnot>
  );
}

// 3. Сцена для OSINT (Глобальний Радар/Мережа зв'язків)
function OsintScene() {
  const radarRef = useRef();
  const nodesRef = useRef();

  // Генеруємо випадкові точки один раз, щоб вони не блимали
  const dataNodes = useMemo(() => {
    return [...Array(12)].map(() => ({
      pos: [(Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5],
      color: Math.random() > 0.5 ? "#10b981" : "#ffffff"
    }));
  }, []);

  useFrame((state) => {
    radarRef.current.rotation.z = state.clock.getElapsedTime() * 2;
    nodesRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    nodesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <group>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#0f172a" wireframe={false} emissive="#022c22" />
      </Sphere>
      <Sphere args={[0.52, 16, 16]}>
        <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.15} />
      </Sphere>

      <mesh ref={radarRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>
      
      <mesh ref={radarRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.8, 32, 0, Math.PI / 4]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      <group ref={nodesRef}>
        {dataNodes.map((node, i) => (
          <mesh key={i} position={node.pos}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// 4. Сцена для Програмування (Архітектура/Серверні стійки)
const ServerBlock = ({ position, color, delay }) => {
  const ref = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    ref.current.material.emissiveIntensity = Math.max(0.2, Math.sin(time * 3));
  });
  return (
    <Box ref={ref} args={[1.2, 0.2, 0.8]} position={position}>
      <meshStandardMaterial color={color} emissive={color} transparent opacity={0.8} />
    </Box>
  );
};

function CodeScene() {
  const groupRef = useRef();
  
  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    groupRef.current.rotation.x = 0.1;
  });

  return (
    <group ref={groupRef}>
      <Box args={[1.4, 1.8, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1e293b" wireframe />
      </Box>

      <ServerBlock position={[0, 0.6, 0]} color="#38bdf8" delay={0} />
      <ServerBlock position={[0, 0.3, 0]} color="#38bdf8" delay={1.5} />
      <ServerBlock position={[0, -0.3, 0]} color="#fbbf24" delay={0.7} />
      <ServerBlock position={[0, -0.6, 0]} color="#fbbf24" delay={2.2} />

      <mesh position={[0.6, 0, 0.4]}>
        <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
}

// --- БАЗА ДАНИХ НАВИЧОК ---
const skillsData = [
  {
    id: 'wireshark',
    title: 'Етичний хакінг та аналіз трафіку',
    category: 'hard',
    shortLabel: 'Етичний хакінг та аналіз трафіку (Wireshark)',
    description: 'Глибокий аналіз мережевих протоколів, перехоплення та читання дампів (PCAP). Виявлення аномалій у трафіку, розуміння архітектури клієнт-серверної взаємодії та пошук вразливостей на рівні мережі.',
    scene: <NetworkTrafficScene />
  },
  {
    id: 'osint',
    title: 'OSINT (Розвідка з відкритих джерел)',
    category: 'hard',
    shortLabel: 'OSINT (розвідка з відкритих джерел)',
    description: 'Збір, аналіз та структурування інформації з публічних баз даних, соціальних мереж та відкритих реєстрів. Використання спеціалізованих інструментів для побудови зв\'язків та цифрових профілів.',
    scene: <OsintScene />
  },
  {
    id: 'crypto',
    title: 'Криптографія',
    category: 'hard',
    shortLabel: 'Криптографія (Blum-Blum-Shub, Афінний шифр)',
    description: 'Розуміння математичних основ шифрування. Практичний досвід реалізації криптографічних алгоритмів, генераторів псевдовипадкових чисел та оцінка надійності алгоритмів захисту.',
    scene: <CryptoScene />
  },
  {
    id: 'dev',
    title: 'Програмування',
    category: 'hard',
    shortLabel: 'Програмування: Python, JavaScript, React',
    description: 'Розробка скриптів для автоматизації безпеки на Python. Створення інтерактивних веб-додатків та інтерфейсів за допомогою сучасних фреймворків (React, Three.js).',
    scene: <CodeScene />
  },
  {
    id: 'packets',
    title: 'Аналіз інфраструктури',
    category: 'exp',
    shortLabel: 'Аналіз мережевих пакетів в інфраструктурі',
    description: 'Практичний досвід роботи з віртуальними машинами (Kali Linux), налаштування середовищ для тестування безпеки та моніторинг локальних мереж.',
    scene: <NetworkTrafficScene />
  },
  {
    id: 'desktop',
    title: 'Розробка десктопних додатків',
    category: 'exp',
    shortLabel: 'Розробка десктопних додатків (Python/Tkinter + БД)',
    description: 'Повний цикл розробки програмного забезпечення: від проєктування графічного інтерфейсу до налаштування та підключення баз даних для збереження інформації.',
    scene: <CodeScene />
  },
  {
    id: 'hardware',
    title: 'Мережеве обладнання',
    category: 'exp',
    shortLabel: 'Оптимізація та налаштування мережевого обладнання',
    description: 'Тонке налаштування роутерів, оптимізація пропускної здатності каналів, забезпечення стабільності з\'єднання (зниження пінгу) та базове налаштування безпеки мережі (WPA3, фільтрація).',
    scene: <CryptoScene />
  }
];

// --- ГОЛОВНИЙ КОМПОНЕНТ ---
export default function AboutMe() {
  const [activeSkillId, setActiveSkillId] = useState(null);

  const activeSkill = skillsData.find(s => s.id === activeSkillId);

  return (
    <section className="mb-12 mt-8 bg-[#0f172a] p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden">
      {/* Декоративний фон */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      {/* Верхня частина (Завжди видима) */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10 mb-8 border-b border-slate-800 pb-8">
        <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex-shrink-0 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,204,0.2)]">
          <span className="text-3xl font-black text-slate-900 tracking-tighter">АГ</span>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-1">Глоба Андрій</h2>
          <p className="text-cyan-400 font-mono mb-4 text-xs uppercase tracking-widest">
            Спеціаліст з кібербезпеки (Спец. 125)
          </p>
          <p className="text-slate-400 leading-relaxed font-light text-sm">
            Студент Національного університету «Львівська політехніка». Спеціалізуюся на мережевій безпеці, OSINT та криптографії. Маю аналітичне мислення, швидко опановую нові технології та готовий до виконання складних технічних завдань.
          </p>
        </div>
      </div>

      {/* Динамічна частина: Або списки, або детальне вікно з 3D */}
      <div className="relative z-10 min-h-[300px]">
        
        {/* ЯКЩО СКІЛ ВИБРАНО -> ПОКАЗУЄМО ДЕТАЛІ ТА 3D */}
        {activeSkill ? (
          <div className="animate-fade-in">
            <button 
              onClick={() => setActiveSkillId(null)}
              className="mb-4 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
            >
              ← Повернутися до списків
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">{activeSkill.title}</h3>
                <p className="text-slate-300 leading-relaxed">{activeSkill.description}</p>
              </div>
              
              {/* Міні 3D-Сцена для конкретного скіла */}
              <div className="w-full md:w-64 h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#00ffcc" />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    {activeSkill.scene}
                  </Float>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                </Canvas>
              </div>
            </div>
          </div>
        ) : (
          /* ЯКЩО СКІЛ НЕ ВИБРАНО -> ПОКАЗУЄМО ДВА СТОВПЦІ */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            {/* HARD SKILLS */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Hard Skills
              </h3>
              <ul className="space-y-3">
                {skillsData.filter(s => s.category === 'hard').map(skill => (
                  <li 
                    key={skill.id}
                    onClick={() => setActiveSkillId(skill.id)}
                    className="flex items-start gap-2 text-sm text-slate-400 cursor-pointer hover:text-cyan-400 hover:translate-x-2 transition-all group"
                  >
                    <span className="text-slate-600 group-hover:text-cyan-400 transition-colors">▹</span>
                    <span>{skill.shortLabel}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* ПРАКТИЧНИЙ ДОСВІД */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Практичний досвід
              </h3>
              <ul className="space-y-3">
                {skillsData.filter(s => s.category === 'exp').map(skill => (
                  <li 
                    key={skill.id}
                    onClick={() => setActiveSkillId(skill.id)}
                    className="flex items-start gap-2 text-sm text-slate-400 cursor-pointer hover:text-cyan-400 hover:translate-x-2 transition-all group"
                  >
                    <span className="text-slate-600 group-hover:text-cyan-400 transition-colors">▹</span>
                    <span>{skill.shortLabel}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}