import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div>
      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mt-2 text-center text-lg">
            {recommendation.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
