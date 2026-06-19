const FACETS = [
  "polygon(50% 0%, 90% 18%, 100% 58%, 72% 100%, 22% 92%, 0% 38%)",
  "polygon(18% 0%, 82% 6%, 100% 46%, 86% 100%, 28% 96%, 0% 54%)",
  "polygon(38% 0%, 100% 16%, 88% 72%, 54% 100%, 4% 78%, 0% 24%)",
  "polygon(28% 2%, 76% 0%, 100% 40%, 92% 88%, 46% 100%, 0% 62%)",
  "polygon(46% 0%, 96% 28%, 84% 82%, 40% 100%, 2% 64%, 6% 14%)",
  "polygon(8% 10%, 60% 0%, 100% 30%, 94% 78%, 58% 100%, 12% 86%, 0% 45%)",
];

export default function StoneBead2D({
  hex,
  index,
  size = 16,
  ring = true,
}: {
  hex: string;
  index: number;
  size?: number;
  ring?: boolean;
}) {
  const facet = FACETS[index % FACETS.length];
  const rotate = (index * 47) % 360;
  const scale = 0.85 + ((index * 13) % 30) / 100;

  return (
    <span
      className={`inline-block shrink-0 ${ring ? "shadow-sm" : ""}`}
      style={{
        width: size,
        height: size,
        clipPath: facet,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        backgroundColor: hex,
        backgroundImage:
          "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.75), rgba(255,255,255,0) 45%), linear-gradient(155deg, rgba(0,0,0,0.25), rgba(0,0,0,0) 62%), repeating-linear-gradient(35deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 2px, transparent 4px)",
      }}
    />
  );
}
