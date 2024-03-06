import { imageBuilder } from '../lib/sanity';
import { Blog, BlogArticleCardProps } from 'Interfaces/blog';

export const getBlogSchema = (
  logo: string,
  blog: Blog,
  currentUrl: string,
  blogArticles: BlogArticleCardProps[],
  currentSlug?: string
) => {
  const { blogHomepage, blogCategories } = blog;
  const blogArticle = blogHomepage.featuredArticle?.article[0];

  const santizeCopy = (copy: string) => copy?.replace(/(\r\n|\n|\r)/gm, ' ')

  const blogSchema = blog && {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: blogHomepage.header.heading,
    description: blogHomepage.header.heading,
    url: currentUrl,
    image: blogArticle?.hero?.image || undefined,
    blogPosts: blogArticles.map((article) => {
      return {
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${currentUrl}/${article.settings.slug.current}`,
        },
        headline: santizeCopy(article.settings.heading),
        updatedAt: article._updatedAt,
        author: {
          '@type': 'Person',
          name: article.settings.author,
        },
        publisher: {
          '@type': 'Organization',
          name: article.settings.heading,
          logo: {
            '@type': 'ImageObject',
            url: article.hero?.image || undefined,
          },
        },
      };
    })
    ,
    blogCategories: blogCategories.map((category) => {
      return {
        '@context': 'https://schema.org/',
        '@type': 'BlogCategory',
        id: category.id,
        category: santizeCopy(category.title),
        slug: category.slug.current,
      };
    }),
    blogFeaturedArticle:
      blogHomepage.featuredArticle && blogArticle && {
        '@context': 'https://schema.org/',
        '@type': 'BlogFeaturedArticle',
        content: santizeCopy(blogArticle.settings.heading),
        hero: blogArticle.hero?.image || undefined,
        settings: {
          title: blogArticle.settings.publishedAt,
          publishedAt: blogArticle.settings.publishedAt,
          author: blogArticle.settings.author,
          url: `${currentUrl}/${blogArticle.settings.slug.current}`,
        },
      },
  };

  const articleSchema = blogArticles.map((article) => {
    return {
      '@type': 'Article',
      '@context': 'https://schema.org/',
      name: santizeCopy(article.settings.heading),
      description: article.content.subcopy,
      hero: article.hero?.image || undefined,
      settings: {
        title: article.settings.heading,
        publishedAt: article.settings.publishedAt,
        author: article.settings.author,
        url: `${currentUrl}/${article.settings.slug.current}`,
      },
    };
  });

  return [
    {
      '@context': 'https://schema.org/',
      '@type': 'Blog Articles',
      name: santizeCopy(blogHomepage.header.heading),
      image: blogArticle?.hero?.image || undefined,
      description: blogHomepage.header.heading,
      category: currentSlug || 'Blog',
      brand: {
        name: 'Endy',
        '@type': 'Organization',
        logo: logo && imageBuilder.image(logo).url(),
      },
    },
    blogSchema,
    ...articleSchema,
  ];
};
