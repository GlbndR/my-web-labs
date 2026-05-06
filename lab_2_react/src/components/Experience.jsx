function Experience() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6">💻 Технічні навички</h2>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition-colors">
        <ul className="list-disc list-inside text-slate-700 space-y-3 marker:text-blue-500">
          <li>
            <strong className="text-slate-900">Мережева безпека:</strong> Модель OSI, стек TCP/IP, налаштування та захист периметра.
          </li>
          <li>
            <strong className="text-slate-900">Кіберрозвідка (OSINT):</strong> Збір інформації з відкритих джерел, ідентифікація загроз.
          </li>
          <li>
            <strong className="text-slate-900">Інструменти:</strong> Глибокий аналіз пакетів у Wireshark, утиліти для сканування мереж.
          </li>
          <li>
            <strong className="text-slate-900">Програмування:</strong> Python (автоматизація завдань з безпеки), JavaScript, React.
          </li>
          <li>
            <strong className="text-slate-900">Криптографія:</strong> Афінний шифр, алгоритм Blum-Blum-Shub.
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Experience;