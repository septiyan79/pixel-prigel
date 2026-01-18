// src/components/StickerGrid.jsx
import { useEffect, useState } from "react";
import StickerCard from "./StickerCard";

const StickerGrid = ({ getStickers }) => {
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStickers({ limit: 5 });
        setStickers(data);
      } catch (error) {
        console.error("Error fetching sticker:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getStickers]);

  if(loading) return <p>Loading ...</p>

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
