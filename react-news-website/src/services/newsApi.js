import axios from 'axios';
import { demoArticles, getDemoData } from './demoData';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const getTopHeadlines = async (country = 'us') => {
  try {
    // Check if API key is available
    if (!API_KEY || API_KEY === 'your_newsapi_key_here') {
      console.log('Using demo data - Please add your NewsAPI key to .env file');
      return { articles: demoArticles };
    }
    
    const response = await newsApi.get('/top-headlines', {
      params: { country },
    });
    return response.data;
  } catch (error) {
    console.log('API failed, using demo data:', error.message);
    return { articles: demoArticles };
  }
};

export const getNewsByCategory = async (category, country = 'us') => {
  try {
    // Check if API key is available
    if (!API_KEY || API_KEY === 'your_newsapi_key_here') {
      console.log('Using demo data - Please add your NewsAPI key to .env file');
      return { articles: getDemoData(category) };
    }
    
    const response = await newsApi.get('/top-headlines', {
      params: { 
        category: category.toLowerCase(),
        country 
      },
    });
    return response.data;
  } catch (error) {
    console.log('API failed, using demo data:', error.message);
    return { articles: getDemoData(category) };
  }
};

export const searchNews = async (query) => {
  try {
    // Check if API key is available
    if (!API_KEY || API_KEY === 'your_newsapi_key_here') {
      console.log('Using demo data - Please add your NewsAPI key to .env file');
      const filtered = demoArticles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
      return { articles: filtered };
    }
    
    const response = await newsApi.get('/everything', {
      params: { 
        q: query,
        sortBy: 'publishedAt',
        language: 'en'
      },
    });
    return response.data;
  } catch (error) {
    console.log('API failed, using demo data:', error.message);
    const filtered = demoArticles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase())
    );
    return { articles: filtered };
  }
};

export default newsApi;