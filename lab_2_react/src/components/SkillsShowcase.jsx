import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder } from '@react-three/drei';

// Індивідуальна Сцена 1
function SceneA() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#00ffcc" />
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial color="#00ffcc" wireframe />
      </Box>
      <OrbitControls autoRotate />
    </Canvas>
  );
}

// Індивідуальна Сцена 2
function SceneB() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#3b82f6" />
      <Cylinder args={[0.5, 0.5, 1, 16]}>
        <meshStandardMaterial color="#3b82f6" wireframe />
      </Cylinder>
      <OrbitControls autoRotate />
    </Canvas>
  );
}

export default function SkillsShowcase() {
  const [activeItem, setActiveItem] = useState(null);

  const portfolioItems = [
    {
      id: 'project1',
      title: 'Проєкт 1 (Python / Tkinter)',
      shortDesc: 'Розробка десктопних додатків та архітектура БД.',
      fullDesc: 'Тут ти можеш описати свій реальний досвід: як саме створювався інтерфейс, які бази даних використовувалися та як оптимізувалася робота програми.',
      scene: <SceneA />
    },
    {
      id: 'project2',
      title: 'Проєкт 2 (Digital Media)',
      shortDesc: 'Створення структурованих портфоліо та аналіз.',
      fullDesc: 'Опис процесу роботи з композицією, метаданими та налаштуванням візуальної складової.',
      scene: <SceneB />
    }
  ];

  // Якщо елемент вибрано — показуємо детальну сторінку
  if (activeItem) {
    const item = portfolioItems.find(i => i.id === activeItem);
    return (
      <div className="p-6 bg-slate-900 rounded-3xl border border-blue-500/50 shadow-lg mt-8">
        <button 
          onClick={() => setActiveItem(null)}
          className="mb-6 px-4 py-2 bg-slate-800 text-cyan-400 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          ← Повернутися до списку
        </button>
        
        <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
        <p className="text-slate-300 mb-8 leading-relaxed font-light">{item.fullDesc}</p>
        
        {/* Блок з унікальною 3D-сценою */}
        <div className="h-80 w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
          {item.scene}
        </div>
      </div>
    );
  }

  // Якщо нічого не вибрано — показуємо список карток
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {portfolioItems.map(item => (
        <div 
          key={item.id} 
          onClick={() => setActiveItem(item.id)}
          className="p-6 bg-slate-800/50 rounded-3xl cursor-pointer hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all group"
        >
          <h4 className="text-xl font-bold text-blue-400 group-hover:text-cyan-400 transition-colors mb-2">{item.title}</h4>
          <p className="text-sm text-slate-400 font-light">{item.shortDesc}</p>
        </div>
      ))}
    </div>
  );
}