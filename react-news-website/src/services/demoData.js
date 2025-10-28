// Demo data for when API is not available
export const demoArticles = [
  {
    title: "Breaking: Major Tech Breakthrough Announced",
    description: "Scientists have made a significant breakthrough in quantum computing that could revolutionize the technology industry.",
    urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
    url: "https://example.com/tech-breakthrough",
    publishedAt: new Date().toISOString(),
    source: { name: "Tech Today" },
    author: "John Smith"
  },
  {
    title: "Sports Championship Finals This Weekend",
    description: "The most anticipated sports event of the year is set to take place this weekend with record-breaking attendance expected.",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop",
    url: "https://example.com/sports-championship",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: { name: "Sports Central" },
    author: "Sarah Johnson"
  },
  {
    title: "Global Markets Show Strong Recovery",
    description: "International markets are showing signs of robust recovery as investors gain confidence in the economic outlook.",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    url: "https://example.com/market-recovery",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: "Business Weekly" },
    author: "Michael Chen"
  },
  {
    title: "New Entertainment Streaming Platform Launches",
    description: "A revolutionary new streaming service promises to change how we consume entertainment content with AI-powered recommendations.",
    urlToImage: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=200&fit=crop",
    url: "https://example.com/streaming-platform",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    source: { name: "Entertainment Today" },
    author: "Lisa Rodriguez"
  },
  {
    title: "Health Study Reveals Surprising Benefits",
    description: "A comprehensive health study has uncovered unexpected benefits of a common daily activity that millions of people do.",
    urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    url: "https://example.com/health-study",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    source: { name: "Health Journal" },
    author: "Dr. Amanda Wilson"
  },
  {
    title: "Space Mission Achieves Historic Milestone",
    description: "Scientists celebrate as the latest space mission reaches a historic milestone in our understanding of the universe.",
    urlToImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=200&fit=crop",
    url: "https://example.com/space-mission",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    source: { name: "Science Daily" },
    author: "Prof. Robert Kim"
  }
];

export const getDemoData = (category = null) => {
  if (!category) return demoArticles;
  
  const categoryMap = {
    technology: [demoArticles[0]],
    sports: [demoArticles[1]],
    business: [demoArticles[2]],
    entertainment: [demoArticles[3]],
    health: [demoArticles[4]],
    science: [demoArticles[5]]
  };
  
  return categoryMap[category.toLowerCase()] || [];
};