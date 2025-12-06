import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).not.toBeNull();
    expect(recommendations.name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendation = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendation).not.toBeNull();
    expect(recommendation.name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendation = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendation).not.toBeNull();
    expect(recommendation.name).toBe('RD Conversas'); 
  });

  test('MultipleProducts: retorna lista vazia quando nenhum produto atende às preferências/funcionalidades', () => {
    const formData = {
      selectedPreferences: ['Coisa que não existe no catálogo'],
      selectedFeatures: ['Outra coisa inexistente'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations).toHaveLength(0);
  });

  test('SingleProduct: retorna null quando nenhum produto atende às preferências/funcionalidades', () => {
    const formData = {
      selectedPreferences: ['Preferência totalmente inexistente'],
      selectedFeatures: ['Funcionalidade totalmente inexistente'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendation = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendation).toBeNull();
  });

  test('Usa SingleProduct como padrão quando selectedRecommendationType não é informado', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      // selectedRecommendationType ausente
    };

    const recommendation = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendation).not.toBeNull();
    expect(recommendation.name).toBe('RD Station Marketing');
  });
});
