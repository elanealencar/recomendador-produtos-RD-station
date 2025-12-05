// Form.js

import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsChange }) {
  const { preferences, features, products } = useProducts();

  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica para atualizar as recomendações e passar para a lista de recomendações
    const recommendationsResult = getRecommendations(formData);
  
    // Normaliza o retorno do service para sempre ser uma lista
    const normalizedRecommendations = Array.isArray(recommendationsResult)
      ? recommendationsResult
      : recommendationsResult
      ? [recommendationsResult]
      : [];

      if (typeof onRecommendationsChange === 'function') {
        onRecommendationsChange(normalizedRecommendations);
      }
    };

  return (
    <form
      className="mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <div className="mt-4 flex justify-center">
        <SubmitButton text="Obter recomendação" />
      </div>
    </form>
  );
}

export default Form;