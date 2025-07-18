"use client";

const articles = [
  {
    id: 1,
    title: "Importance of Seeking Islamic Knowledge",
    description:
      "Seeking knowledge is an obligation upon every Muslim. Learn how it strengthens Imaan and benefits the Ummah.",
    image: "/blog/knowledge.jpg",
    link: "/blog/importance-of-seeking-knowledge",
  },
  {
    id: 2,
    title: "Daily Sunnah Practices to Revive",
    description:
      "Discover forgotten Sunnahs that can bring immense rewards and blessings into your everyday life.",
    image: "/blog/sunnah.jpg",
    link: "/blog/daily-sunnah-practices",
  },
  {
    id: 3,
    title: "Is Earning from Online Work Halal?",
    description:
      "A brief Islamic perspective on freelancing, YouTube, and online earnings in light of Shariah.",
    image: "/blog/online-income.jpg",
    link: "/blog/is-online-income-halal",
  },
];

const BlogSection = () => {
  return (
    <section className="py-8" id="blog">
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-4">
          Islamic Articles & Blog
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Stay informed with short, insightful articles on Islamic lifestyle, rulings, updates, and more — all written by experienced scholars and students of knowledge.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {article.description}
                </p>
                <a
                  href={article.link}
                  className="inline-block text-blue-600 hover:underline font-medium text-sm"
                >
                  🔗 Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
