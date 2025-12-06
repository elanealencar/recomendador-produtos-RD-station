import axios from 'axios';

const baseURL = 'http://localhost:3001';
const isDev = process.env.NODE_ENV === 'development';

const getProducts = async () => {
  try {
    // Em produção (Vercel) e em testes, usando os mocks locais
    if (!isDev) {
      return mockProducts;
    }

    // Em desenvolvimento local, usando o json-server
    const response = await axios.get(`${baseURL}/products`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    throw error;
  }
};

export default getProducts;
