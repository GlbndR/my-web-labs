import { useEffect, useState } from 'react';

function Footer() {
  const [sysInfo, setSysInfo] = useState({ agent: '', platform: '' });

  useEffect(() => {
    // Зчитуємо системну інформацію
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    // Зберігаємо у localStorage
    localStorage.setItem('userAgent', userAgent);
    localStorage.setItem('platform', platform);

    // Отримуємо назад для відображення
    setSysInfo({
      agent: localStorage.getItem('userAgent'),
      platform: localStorage.getItem('platform')
    });
  }, []); // Пустий масив означає, що код виконається 1 раз при монтуванні

  return (
    <footer className="p-4 bg-slate-800 text-white text-center mt-8">
      <p>© 2026 Ваше Ім'я. Всі права захищено.</p>
      <div className="mt-4 text-xs text-slate-400">
        <p>Браузер: {sysInfo.agent}</p>
        <p>ОС: {sysInfo.platform}</p>
      </div>
    </footer>
  );
}

export default Footer;