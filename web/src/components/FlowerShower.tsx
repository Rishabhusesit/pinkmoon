import { useEffect, useState } from "react";

interface Flower {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export default function FlowerShower({ trigger }: { trigger: number }) {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    // Create 25-35 flowers randomly positioned
    const newFlowers: Flower[] = Array.from({ length: Math.floor(Math.random() * 11) + 25 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100, // 0-100% across screen
      delay: Math.random() * 0.8, // Stagger the start
      duration: Math.random() * 2 + 3, // 3-5 seconds fall time
    }));

    setFlowers(newFlowers);

    // Clean up after animation completes
    const timer = setTimeout(() => {
      setFlowers([]);
    }, 6000);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (flowers.length === 0) return null;

  return (
    <div className="flowerShower">
      {flowers.map((flower) => {
        const size = Math.random() * 30 + 50; // 50-80px (larger)
        return (
          <div
            key={flower.id}
            className="flower"
            style={{
              left: `${flower.left}%`,
              animationDelay: `${flower.delay}s`,
              animationDuration: `${flower.duration}s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          >
            <img src="/gifs/flowers.gif" alt="flower" className="flowerImg" />
          </div>
        );
      })}
    </div>
  );
}
