import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  category: string;
  featured?: boolean;
}

export function BookCard({ title, author, cover, category, featured }: BookCardProps) {
  return (
    <div
      className={`group relative cursor-pointer transition-all duration-300 ${featured ? "scale-105 z-10" : "hover:-translate-y-1"}`}
    >
      {/* Book cover */}
      <div
        className={`relative overflow-hidden rounded-xl mb-3 ${featured ? "shadow-2xl" : "shadow-md"}`}
        style={{
          aspectRatio: "2/3",
          boxShadow: featured
            ? "0 25px 50px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,0,0,0.3)"
            : "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <ImageWithFallback
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Featured ribbon */}
        {featured && (
          <div
            className="absolute top-4 left-4 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide flex items-center justify-center leading-none"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            Featured
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}>
          <span className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ background: "var(--primary)", color: "#fff" }}>
            {category}
          </span>
        </div>
      </div>

      {/* Book info */}
      <div className="px-1">
        <h3
          className={`line-clamp-2 leading-snug mb-1 ${featured ? "text-sm font-bold" : "text-xs font-medium"}`}
          style={{ color: featured ? "var(--foreground)" : "var(--muted-foreground)" }}
        >
          {title}
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span className="italic">{author}</span>
        </p>
      </div>
    </div>
  );
}
