import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import Logo from './logo.svg';

function App() {
  const [recommendations, setRecommendations ] = useState([])

  const handleRecommendationsChange = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="RD Station"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-slate-900">
              Recomendador de Produtos RD Station
            </h1>
            <span className="hidden text-xs text-right font-medium text-slate-500 md:inline">
              Desafio técnico • Engenharia de Software Jr • Frontend
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:py-10">
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm text-center">
        <h2 className="mb-2 text-3xl font-bold text-slate-900">
          Bem-vindo ao Recomendador de Produtos <span className="text-blue-900">RD Station</span>!
        </h2>
        <h3 className="text-2xl">Encontre a solução ideal para o seu negócio!</h3>
        <p className="text-lg leading-relaxed text-slate-600 my-2">
          De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. 
          Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas, e nós vamos analisar os produtos da RD Station e recomendar as soluções personalizadas que mais melhor atendam às suas necessidades. 
        </p>
        </section>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna esquerda: formulário */}
          <div>
            <Form onRecommendationsChange={handleRecommendationsChange} />
          </div>

          {/* Coluna direita: recomendações */}
          <div className="rounded-md bg-white p-4">
            <h3 className="text-lg font-bold mb-2">
              Lista de Recomendações:
            </h3>
            
            {recommendations?.length === 0 ? (
              <div className="flex h-1/2 flex-col items-center justify-center gap-2 border border-slate-200 p-4 text-center">
                <p className="text-md font-medium text-slate-700">
                  Nenhum produto recomendado ainda
                </p>
                <p className="text-sm text-slate-500">
                  Preencha o formulário ao lado e clique em <span className="font-semibold">Obter recomendação </span> 
                  para ver os produtos recomendados.
                </p>
              </div>
            ) : (
              <RecommendationList recommendations={recommendations} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;