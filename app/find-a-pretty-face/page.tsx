import Image from "next/image";

export default function FindAPrettyFacePage() {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl flex items-center justify-center">
        {/* Big container so image covers most of viewport but is fully visible */}
        <div className="relative w-full h-[82vh] rounded-2xl bg-white/40 border border-rose-200/60 shadow-[0_30px_120px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <Image
            src="/images/ms-paint.png"
            alt="Find A Pretty Face"
            fill
            priority
            sizes="(max-width: 768px) 95vw, 1100px"
            style={{ objectFit: "contain" }} // ✅ fully visible
          />
        </div>
      </div>
    </main>
  );
}
