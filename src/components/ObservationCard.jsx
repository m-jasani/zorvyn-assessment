const ObservationCard = ({ icon, title, text, tag, borderColor, isDark }) => (
  <div
    className={`p-6 rounded-2xl border border-l-4 transition-all duration-300 hover:scale-105 ${borderColor} ${
      isDark
        ? "bg-slate-900 border-slate-800"
        : "bg-white border-slate-100 shadow-sm"
    }`}
  >
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h4
        className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
      >
        {title}
      </h4>
    </div>
    <p
      className={`text-[11px] leading-relaxed mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}
    >
      {text}
    </p>
    <span
      className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-300"}`}
    >
      {tag}
    </span>
  </div>
);

export default ObservationCard;
