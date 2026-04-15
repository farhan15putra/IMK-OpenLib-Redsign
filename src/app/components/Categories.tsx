import { BookOpen, Lightbulb, Heart, Rocket, Brain, Globe } from "lucide-react";

const categories = [
  { name: "Fiction", icon: BookOpen, color: "bg-blue-500/10 text-blue-600" },
  { name: "Science", icon: Rocket, color: "bg-purple-500/10 text-purple-600" },
  { name: "Romance", icon: Heart, color: "bg-pink-500/10 text-pink-600" },
  { name: "Philosophy", icon: Brain, color: "bg-amber-500/10 text-amber-600" },
  { name: "History", icon: Globe, color: "bg-green-500/10 text-green-600" },
  { name: "Self-Help", icon: Lightbulb, color: "bg-orange-500/10 text-orange-600" },
];

export function Categories() {
  return (
    <section className="py-12 border-b">
      <div className="container">
        <h2 className="text-2xl mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-card hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className={`p-3 rounded-full ${category.color}`}>
                  <Icon className="size-6" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
