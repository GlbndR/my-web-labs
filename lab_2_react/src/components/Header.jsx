function Header() {
  return (
    <header className="bg-slate-800 text-white p-10 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">Андрій Глоба</h1>
      <p className="text-xl text-slate-300 font-medium mb-4">Junior Cybersecurity Analyst</p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm opacity-90 mt-4">
        <p>📍 м. Львів, Україна (віддалена робота)</p>
        <p className="hidden sm:block">•</p>
        <a href="mailto:email@example.com" className="hover:text-blue-400 transition-colors">email@example.com</a>
        <p className="hidden sm:block">•</p>
        <a href="https://github.com/твоє-посилання" className="hover:text-blue-400 transition-colors">GitHub</a>
      </div>
    </header>
  );
}

export default Header;