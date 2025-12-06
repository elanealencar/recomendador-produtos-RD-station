// RecommendationList.js
import React from 'react';

const PRODUCT_LINKS = {
  'RD Station CRM': 'https://www.rdstation.com/produtos/crm/',
  'RD Station Marketing': 'https://www.rdstation.com/produtos/marketing/',
  'RD Conversas': 'https://www.rdstation.com/produtos/conversas/',
  'RD Mentor AI': 'https://www.rdstation.com/produtos/mentor-ai/',
};

function getProductUrl(name) {
  return PRODUCT_LINKS[name] || 'https://www.rdstation.com/produtos/';
}

function RecommendationList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {recommendations.map((product) => {
        const url = getProductUrl(product.name);

        return (
          <article
            key={product.id ?? product.name}
            className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm"
          >
            <header className="mb-2 flex items-center justify-between gap-2">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h4>
                {product.category && (
                  <p className="text-sm font-medium text-slate-500">
                    {product.category}
                  </p>
                )}
              </div>

              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Saiba mais
                <span aria-hidden="true">↗</span>
              </a>
            </header>

            {/*mostrando preferências e features de cada card */}
            {Array.isArray(product.preferences) && product.preferences.length > 0 && (
              <div className="mb-1">
                <p className="text-[11px] font-medium text-slate-500">
                  Preferências atendidas:
                </p>
                <ul className="mt-1 flex flex-wrap gap-1">
                  {product.preferences.slice(0, 3).map((pref) => (
                    <li
                      key={pref}
                      className="rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-700 border border-slate-200"
                    >
                      {pref}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(product.features) && product.features.length > 0 && (
              <div className="mt-2">
                <p className="text-[11px] font-medium text-slate-500">
                  Funcionalidades:
                </p>
                <ul className="mt-1 flex flex-wrap gap-1">
                  {product.features.slice(0, 3).map((feat) => (
                    <li
                      key={feat}
                      className="rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-700 border border-slate-200"
                    >
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default RecommendationList;
