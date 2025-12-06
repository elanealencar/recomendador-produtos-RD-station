import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

jest.mock('../../hooks/useProducts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../hooks/useForm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../hooks/useRecommendations', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

describe('<Form />', () => {
  test('chama onRecommendationsChange com recomendações normalizadas ao enviar o formulário', () => {
    const mockOnRecommendationsChange = jest.fn();

    // mock dos dados de produtos/preferences/features
    useProducts.mockReturnValue({
      preferences: ['Automação de marketing'],
      features: ['Criação e gestão de campanhas de e-mail'],
      products: [{ id: 1, name: 'RD Station Marketing' }],
    });

    // estado do formulário simulado
    const mockFormData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: ['Criação e gestão de campanhas de e-mail'],
      selectedRecommendationType: 'SingleProduct',
    };

    useForm.mockReturnValue({
      formData: mockFormData,
      handleChange: jest.fn(),
    });

    // mock do hook de recomendações
    const mockRecommendation = { id: 1, name: 'RD Station Marketing' };
    useRecommendations.mockReturnValue({
      getRecommendations: jest.fn(() => mockRecommendation),
    });

    const { getByText } = render(
      <Form onRecommendationsChange={mockOnRecommendationsChange} />
    );

    const submitButton = getByText('Obter recomendação');

    fireEvent.click(submitButton);

    // SingleProduct volta objeto, o Form normaliza pra array
    expect(mockOnRecommendationsChange).toHaveBeenCalledTimes(1);
    expect(mockOnRecommendationsChange).toHaveBeenCalledWith([
      mockRecommendation,
    ]);
  });
});
