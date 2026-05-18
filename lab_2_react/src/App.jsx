import { useState, useEffect } from 'react';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import CyberCore from './components/CyberCore';
import SkillsShowcase from './components/SkillsShowcase';

function App() {
  const [theme, setTheme] = useState('light');

  // Автоматична зміна теми залежно від часу (07:00 - 21:00)
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 21) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'dark' ? 'bg-slate-900 text-white min-h-screen transition-colors duration-500' : 'bg-slate-50 text-slate-900 min-h-screen transition-colors duration-500'}>
      
      {/* Головний контент сайту обгорнутий в container */}
      <div className="container mx-auto p-4 md:p-8">
        
        {/* Кнопка зміни теми */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={toggleTheme} 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 font-medium"
          >
            {theme === 'light' ? '🌙 Нічний режим' : '☀️ Денний режим'}
          </button>
        </div>

        <Header />
        
        {/* Твоя візитка */}
        <AboutMe />
        
        {/* Головне 3D Ядро (Топологія мережі) */}
        <section className="relative mt-12 mb-20 overflow-hidden rounded-3xl bg-gradient-to-b from-transparent to-blue-500/5">
          <div className="relative z-10 py-10">
            <h2 className="text-3xl font-black text-center mb-2 tracking-tight uppercase">
              Cybersecurity Analyst Data Hub
            </h2>
            <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full mb-8"></div>
            <CyberCore /> 
            <p className="text-slate-500 text-center mt-4 text-sm font-light tracking-widest uppercase">
              Взаємодійте з інфраструктурою за допомогою миші
            </p>
          </div>
          {/* Декоративний фон для 3D */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-0"></div>
        </section>

        {/* Клікабельні картки з індивідуальними 3D-сценами */}
        <section className="mt-16 mb-20 relative z-10">
          <h2 className="text-3xl font-black text-center mb-2 tracking-tight uppercase">
            Детальний розбір проєктів
          </h2>
          <div className="h-1 w-24 bg-cyan-500 mx-auto rounded-full mb-8"></div>
          <SkillsShowcase />
        </section>

        {/* Основний контент */}
        <main className="space-y-20">
          <section>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">01</span>
              Відгуки з мережі
            </h3>
            {/* <Reviews /> */}
          </section>
        </main>

        <Footer />
      </div>

      {/* ПЕРЕНЕСЕНО СЮДИ:
        Модальне вікно винесене за межі '.container' на самий верхній рівень DOM.
        Тепер воно перекриватиме абсолютно все на сторінці.
      */}
      <ContactForm />

    </div>
  );
}

export default App;