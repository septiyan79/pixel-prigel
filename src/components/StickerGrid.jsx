// src/components/StickerGrid.jsx
import StickerCard from "./StickerCard";

const StickerGrid = ({ stickers }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {stickers.map((item) => (
          <StickerCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default StickerGrid;
