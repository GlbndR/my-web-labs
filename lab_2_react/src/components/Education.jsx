function Education() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6">🎓 Освіта</h2>
      
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-blue-700 mb-1">Національний університет "Львівська політехніка"</h3>
        <p className="text-slate-700 font-medium mb-2">Студент, спеціальність: 125 Кібербезпека</p>
        <div className="flex items-center text-sm text-slate-500">
          <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-semibold">2023 - 2027</span>
          <span className="ml-3 italic">Бакалавр</span>
        </div>
      </div>
    </section>
  );
}

export default Education;