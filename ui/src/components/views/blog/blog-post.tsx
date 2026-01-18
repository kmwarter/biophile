import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { blogPosts, type BlogContent } from '@/data/blog-posts';
import { notFound } from 'next/navigation';

interface BlogPostProps {
  slug: string;
}

export const BlogPost = ({ slug }: BlogPostProps) => {
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  const renderContent = (item: BlogContent) => {
    switch (item.type) {
      case 'h1':
        return (
          <h1 key={item.id} className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight mb-6">
            {item.content}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={item.id} className="text-2xl font-medium text-gray-900 mt-10 mb-4">
            {item.content}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={item.id} className="text-xl font-medium text-gray-900 mt-8 mb-3">
            {item.content}
          </h3>
        );
      case 'p':
        return (
          <p key={item.id} className="text-lg text-gray-700 leading-relaxed mb-6">
            {item.content}
          </p>
        );
      case 'quote':
        return (
          <blockquote
            key={item.id}
            className="border-l-4 border-brand-teal-500 pl-6 py-2 my-8 text-xl text-gray-700 italic"
          >
            {item.content}
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream-50 pt-24">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-10">
          <time className="text-sm text-gray-500 mb-2 block">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span className="text-sm text-gray-500">by {post.author}</span>
        </header>

        <div className="prose prose-lg">
          {post.content.map((item) => renderContent(item))}
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-teal-600 hover:text-brand-teal-700 font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
};
