export default function BlurBackground() {
  return (
    <div className="absolute left-0 top-96 z-0 blur-3xl">
      <div
        className="aspect-[16/9] w-screen bg-green-9 opacity-15"
        style={{
          clipPath: 'polygon(8% 0, 94% 0, 94% 100%, 8% 100%)'
        }}
      ></div>
    </div>
  );
}
