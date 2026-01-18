const StickerCard = ({ item }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-orange-600 rounded-3xl group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>

      <div className="relative bg-white border-2 border-orange-600 rounded-3xl p-4 flex flex-col h-full">
        <div className={`aspect-square rounded-2xl bg-orange-100 mb-4 relative overflow-hidden`}>
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-white border border-orange-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase">
            {item.category}
          </div>
        </div>

        <h3 className="text-xl font-black uppercase italic mb-2">{item.title}</h3>

        <p className="text-xs text-gray-500 mb-4 grow">
          High resolution PNG & SVG. Ready for print, cut, and DIY projects.
        </p>

        <span className="text-lg font-black text-orange-600 mb-4">
          Rp {item.price.IDR.toLocaleString()}
        </span>

        <button className="py-3 bg-orange-600 text-white rounded-xl font-black uppercase">
          View Details
        </button>
      </div>
    </div>
  );
};

export default StickerCard;
