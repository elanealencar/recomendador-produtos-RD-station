import React from 'react';
import { render, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import getProducts from '../services/product.service';

jest.mock('../services/product.service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useProducts', () => {
  test('busca produtos e popula preferences, features e products corretamente', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'RD Station CRM',
        preferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas',
          'Relatórios avançados',
        ],
        features: [
          'Gestão de leads e oportunidades',
          'Automação de fluxos de trabalho de vendas',
          'Rastreamento de interações com clientes',
        ],
      },
      {
        id: 2,
        name: 'RD Station Marketing',
        preferences: [
          'Automação de marketing',
          'Testes A/B para otimização de campanhas',
          'Segmentação avançada de leads',
        ],
        features: [
          'Criação e gestão de campanhas de e-mail',
          'Rastreamento de comportamento do usuário',
          'Análise de ROI de campanhas',
        ],
      },
    ];

    getProducts.mockResolvedValueOnce(mockProducts);

    let hookValue = null;

    function TestComponent() {
      const value = useProducts();

      React.useEffect(() => {
        hookValue = value;
      }, [value]);

      return null;
    }

    render(<TestComponent />);

    await waitFor(() => {
      expect(hookValue).not.toBeNull();
      expect(hookValue.products.length).toBe(2);
    });

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(hookValue.products).toEqual(mockProducts);

    // Deve pegar 2 prefs e 2 features de cada produto (total 4 de cada)
    expect(hookValue.preferences.length).toBe(4);
    expect(hookValue.features.length).toBe(4);

    const allPrefsFromProducts = mockProducts.flatMap((p) => p.preferences);
    const allFeaturesFromProducts = mockProducts.flatMap((p) => p.features);

    hookValue.preferences.forEach((pref) => {
      expect(allPrefsFromProducts).toContain(pref);
    });

    hookValue.features.forEach((feat) => {
      expect(allFeaturesFromProducts).toContain(feat);
    });
  });

  test('não quebra e loga erro quando getProducts falha', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    getProducts.mockRejectedValueOnce(new Error('Network error'));

    let hookValue = null;

    function TestComponent() {
      const value = useProducts();

      React.useEffect(() => {
        hookValue = value;
      }, [value]);

      return null;
    }

    render(<TestComponent />);

    // products deve continuar sendo array vazio
    await waitFor(() => {
      expect(hookValue).not.toBeNull();
      expect(hookValue.products).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});
