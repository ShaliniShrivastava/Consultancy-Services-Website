const StatsCard = ({ title, count, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{count}</h3>
    </div>
    <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
      {icon}
    </div>
  </div>
);