import React from 'react';
import { render } from '@testing-library/react';
import useRecommendations from './useRecommendations';
import recommendationService from '../services/recommendation.service';

jest.mock('../services/recommendation.service', () => ({
  __esModule: true,
  default: {
    getRecommendations: jest.fn(),
  },
}));

describe('useRecommendations', () => {
  test('chama recommendationService.getRecommendations com formData e products', () => {
    const products = [
      { id: 1, name: 'RD Station CRM' },
      { id: 2, name: 'RD Station Marketing' },
    ];

    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Criação e gestão de campanhas de e-mail'],
      selectedRecommendationType: 'SingleProduct',
    };

    const mockResult = { id: 2, name: 'RD Station Marketing' };
    recommendationService.getRecommendations.mockReturnValueOnce(mockResult);

    let receivedResult = null;

    function TestComponent() {
      const { getRecommendations } = useRecommendations(products);

      React.useEffect(() => {
        receivedResult = getRecommendations(formData);
      }, []);

      return null;
    }

    render(<TestComponent />);

    expect(recommendationService.getRecommendations).toHaveBeenCalledTimes(1);
    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      formData,
      products
    );
    expect(receivedResult).toBe(mockResult);
  });
});