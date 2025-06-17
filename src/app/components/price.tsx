'use client';

import { useState } from 'react';
import RequestModal from './RequestModal';

interface PriceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

interface FeatureOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

const projectTypes: PriceOption[] = [
  {
    id: 'landing',
    name: 'Лендинг',
    basePrice: 50000,
    description: 'Одностраничный сайт для презентации продукта или услуги'
  },
  {
    id: 'corporate',
    name: 'Корпоративный сайт',
    basePrice: 150000,
    description: 'Многостраничный сайт для компании с каталогом и блогом'
  },
  {
    id: 'ecommerce',
    name: 'Интернет-магазин',
    basePrice: 250000,
    description: 'Полнофункциональный онлайн-магазин с каталогом и корзиной'
  },
  {
    id: 'webapp',
    name: 'Веб-приложение',
    basePrice: 400000,
    description: 'Сложное веб-приложение с личным кабинетом и API'
  }
];

const features: FeatureOption[] = [
  {
    id: 'responsive',
    name: 'Адаптивный дизайн',
    price: 20000,
    description: 'Сайт будет корректно отображаться на всех устройствах'
  },
  {
    id: 'seo',
    name: 'SEO-оптимизация',
    price: 30000,
    description: 'Базовые настройки для продвижения в поисковых системах'
  },
  {
    id: 'cms',
    name: 'CMS система',
    price: 40000,
    description: 'Система управления контентом для самостоятельного обновления'
  },
  {
    id: 'analytics',
    name: 'Аналитика',
    price: 15000,
    description: 'Интеграция с системами аналитики и отслеживания'
  },
  {
    id: 'payment',
    name: 'Платежные системы',
    price: 35000,
    description: 'Интеграция с популярными платежными системами'
  },
  {
    id: 'api',
    name: 'API интеграции',
    price: 50000,
    description: 'Интеграция с внешними сервисами через API'
  }
];

export default function Price() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotal = () => {
    const basePrice = projectTypes.find(type => type.id === selectedType)?.basePrice || 0;
    const featuresPrice = selectedFeatures.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);
    return basePrice + featuresPrice;
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <section className="py-24 px-4 md:px-12 relative" id="price">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0a0e1a]/80 to-[#0a0e1a] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-100 to-blue-400 bg-clip-text text-transparent">
            Рассчитайте стоимость проекта
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto text-lg">
            Выберите тип проекта и необходимые функции для расчета предварительной стоимости
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Тип проекта */}
          <div className="bg-[#10182a] rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-yellow-100 mb-6">Тип проекта</h3>
            <div className="space-y-4">
              {projectTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedType === type.id
                      ? 'bg-[#1a2540] border border-blue-500/50'
                      : 'bg-[#0a0e1a] hover:bg-[#1a2540]'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-medium text-yellow-100">{type.name}</h4>
                    <span className="text-blue-400">{formatPrice(type.basePrice)}</span>
                  </div>
                  <p className="text-neutral-300 text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Дополнительные функции */}
          <div className="bg-[#10182a] rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-yellow-100 mb-6">Дополнительные функции</h3>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedFeatures.includes(feature.id)
                      ? 'bg-[#1a2540] border border-blue-500/50'
                      : 'bg-[#0a0e1a] hover:bg-[#1a2540]'
                  }`}
                  onClick={() => toggleFeature(feature.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-medium text-yellow-100">{feature.name}</h4>
                    <span className="text-blue-400">+{formatPrice(feature.price)}</span>
                  </div>
                  <p className="text-neutral-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Итоговая стоимость */}
        <div className="mt-12 bg-[#10182a] rounded-xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-yellow-100 mb-2">Итоговая стоимость</h3>
              <p className="text-neutral-300">
                {selectedType
                  ? `Выбран ${projectTypes.find(t => t.id === selectedType)?.name.toLowerCase()}`
                  : 'Выберите тип проекта'}
                {selectedFeatures.length > 0 && ` + ${selectedFeatures.length} дополнительных функций`}
              </p>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="text-4xl font-bold text-blue-400">
                {selectedType ? formatPrice(calculateTotal()) : '—'}
              </div>
              {selectedType && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Оставить заявку
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Примечание */}
        <div className="mt-8 text-center text-neutral-400 text-sm">
          * Это предварительная оценка стоимости. Точная стоимость будет рассчитана после детального обсуждения требований к проекту.
        </div>
      </div>

      {/* Модальное окно с формой */}
      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectType={selectedType}
        totalPrice={calculateTotal()}
        selectedFeatures={selectedFeatures}
      />
    </section>
  );
}
