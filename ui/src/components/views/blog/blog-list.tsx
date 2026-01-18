import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';

export const BlogList = () => {
  return (
    <div className="min-h-screen bg-brand-cream-50 pt-24">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-12">
          Blog
        </h1>

        <div className="space-y-12">
          {blogPosts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((post) => (
              <article key={post.id} className="border-b border-gray-200 pb-10 last:border-b-0">
                <Link href={`/blog/${post.id}`} className="group block">
                  <time className="text-sm text-gray-500 mb-2 block">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>

                  <h2 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight mb-4 group-hover:text-brand-teal-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    {`${post.content.find((item) => item.type === "p")?.content.slice(0, 300)}...`}
                  </p>

                  <span className="inline-block mt-4 text-brand-teal-600 font-medium group-hover:text-brand-teal-700">
                    Read more &rarr;
                  </span>
                </Link>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
};
