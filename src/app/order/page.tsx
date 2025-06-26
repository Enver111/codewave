"use client";
import { Container } from "../components/container";
import Header from "../components/header";
import { useState } from "react";
import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// Пример массива макетов
const templates = [
  {
    id: 'template1',
    name: 'Современный лендинг',
    image: '/images/corp-portal.jpg',
    description: 'Яркий одностраничник для презентации продукта или услуги.',
    figmaUrl: 'https://www.figma.com/file/your-figma-link-1',
    type: 'landing',
  },
  {
    id: 'template2',
    name: 'Корпоративный сайт',
    image: '/images/monitor.png',
    description: 'Классический сайт для компании с разделами и блогом.',
    figmaUrl: 'https://www.figma.com/file/your-figma-link-2',
    type: 'corporate',
  },
  {
    id: 'custom',
    name: 'Индивидуальный макет',
    image: '',
    description: 'Выберите этот вариант, если хотите уникальный дизайн, созданный специально для вас. Мы свяжемся для обсуждения деталей.',
    figmaUrl: '',
    type: 'custom',
  },
  // Добавь больше макетов по необходимости
];

const siteTypes = [
  { id: 'landing', name: 'Лендинг', description: 'Одностраничный сайт для презентации продукта, услуги или события. Отлично подходит для быстрой рекламы и сбора заявок.' },
  { id: 'corporate', name: 'Корпоративный сайт', description: 'Многостраничный сайт для компании с разделами о компании, услугах, новостях и контактами.' },
  { id: 'ecommerce', name: 'Интернет-магазин', description: 'Платформа для онлайн-продаж с каталогом товаров, корзиной и оплатой.' },
  { id: 'webapp', name: 'Веб-приложение', description: 'Сложный сервис с личным кабинетом, интерактивными функциями и интеграциями.' },
  { id: 'other', name: 'Другое', description: 'Индивидуальное решение под ваши задачи. Опишите подробнее в комментарии.' },
];

// Для Headless UI Listbox
const typeOptions = [
  { id: 'all', name: 'Все типы' },
  ...siteTypes
];

// Типизация для Headless UI Listbox Option
type ListboxOptionProps = {
  active: boolean;
  selected: boolean;
};

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [siteType, setSiteType] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [comment, setComment] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateTypeFilter, setTemplateTypeFilter] = useState('all');

  // Для финального шага
  const selectedTemplateObj = templates.find(t => t.id === selectedTemplate);
  const selectedSiteTypeObj = siteTypes.find(t => t.id === siteType);
  const previewTemplateObj = templates.find(t => t.id === previewTemplate);

  // Для анимации карточек макетов
  const cardAnimation = "transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-2xl opacity-0 animate-fade-in";

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white font-sans pt-24">
      <Container>
        <Header />
        <h1 className="text-4xl font-bold mb-6">Заказать сайт мечты</h1>
        <div className="max-w-2xl mx-auto">
          {/* Шаги */}
          <div className="mb-8 flex gap-2 justify-center">
            {[1,2,3,4].map(n => (
              <div key={n} className={`w-8 h-2 rounded-full ${step === n ? 'bg-yellow-400' : 'bg-gray-700'}`}/>
            ))}
          </div>

          {/* Шаг 1: Тип сайта */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Выберите тип сайта</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {siteTypes.map(type => (
                  <button
                    key={type.id}
                    className={`px-5 py-3 rounded-full border-2 font-semibold focus:outline-none transition-all duration-300 transform text-base
                      ${siteType === type.id
                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-200 scale-105 shadow-lg'
                        : 'border-gray-700 bg-[#181f2e] text-white hover:border-yellow-400 hover:bg-yellow-400/10 hover:scale-105'}
                    `}
                    style={{ boxShadow: siteType === type.id ? '0 4px 24px 0 rgba(255, 221, 51, 0.10)' : undefined }}
                    onClick={() => setSiteType(type.id)}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
              {siteType && (
                <div className="mb-6 p-4 bg-[#181f2e] rounded-xl border-l-4 border-yellow-400 text-neutral-200 animate-fade-in">
                  <b>{siteTypes.find(t => t.id === siteType)?.name}:</b> {siteTypes.find(t => t.id === siteType)?.description}
                </div>
              )}
              <div className="flex justify-end">
                <button
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                  onClick={() => setStep(2)}
                  disabled={!siteType}
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* Шаг 2: Макет */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Выберите макет сайта</h2>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative min-w-[180px]">
                  <Listbox value={templateTypeFilter} onChange={setTemplateTypeFilter}>
                    <div className="relative">
                      <Listbox.Button className="w-full cursor-pointer rounded-full bg-[#181f2e] border-2 border-gray-700 py-3 pl-5 pr-12 text-left shadow font-semibold text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300">
                        <span className="block truncate">{typeOptions.find(o => o.id === templateTypeFilter)?.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <ChevronUpDownIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-[#181f2e] py-2 shadow-2xl ring-1 ring-black/20 focus:outline-none animate-fade-in border border-gray-700">
                          {typeOptions.map((option) => (
                            <Listbox.Option
                              key={option.id}
                              value={option.id}
                              className={(props: ListboxOptionProps) =>
                                `relative cursor-pointer select-none py-3 pl-10 pr-4 text-base rounded-lg mx-2 mb-1
                                ${props.active ? 'bg-yellow-400/10 text-yellow-200' : 'text-white'}
                                ${props.selected ? 'font-bold bg-yellow-400/20 text-yellow-300' : ''}`
                              }
                            >
                              {(props: ListboxOptionProps) => (
                                <>
                                  <span className={`block truncate ${props.selected ? 'font-bold' : ''}`}>{option.name}</span>
                                  {props.selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-400">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <input
                  type="text"
                  placeholder="Поиск макета по названию..."
                  className="flex-1 px-5 py-3 rounded-full bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300"
                  value={templateSearch}
                  onChange={e => setTemplateSearch(e.target.value)}
                />
              </div>
              {/* Фильтрация макетов с анимацией карточек */}
              {(() => {
                let filtered = templates;
                if (templateTypeFilter !== 'all') {
                  filtered = filtered.filter(tpl => tpl.type === templateTypeFilter || tpl.id === 'custom');
                }
                if (templateSearch.trim()) {
                  filtered = filtered.filter(tpl => tpl.name.toLowerCase().includes(templateSearch.trim().toLowerCase()));
                }
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {filtered.map((tpl, idx) => (
                      <div
                        key={tpl.id}
                        className={`rounded-xl overflow-hidden shadow-lg border-2 cursor-pointer bg-[#181f2e] hover:scale-105 ${selectedTemplate === tpl.id ? 'border-yellow-400' : 'border-transparent'} ${cardAnimation}`}
                        style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'forwards' }}
                      >
                        {tpl.image ? (
                          <img
                            src={tpl.image}
                            alt={tpl.name}
                            className="w-full h-40 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                            onClick={() => setPreviewTemplate(tpl.id)}
                          />
                        ) : (
                          <div className="w-full h-40 flex items-center justify-center bg-gradient-to-br from-yellow-100/10 to-blue-400/10 text-yellow-300 text-xl font-bold select-none">
                            <span>Индивидуальный макет</span>
                          </div>
                        )}
                        <div className="p-4">
                          <div className="font-bold text-lg mb-2 transition-colors duration-200">{tpl.name}</div>
                          <div className="flex gap-2">
                            <button
                              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedTemplate === tpl.id ? 'bg-yellow-400 text-black scale-105 shadow-lg' : 'bg-gray-700 text-white hover:bg-yellow-400 hover:text-black hover:scale-105'}`}
                              onClick={() => setSelectedTemplate(tpl.id)}
                            >
                              {selectedTemplate === tpl.id ? 'Выбрано' : 'Выбрать'}
                            </button>
                            {tpl.figmaUrl && (
                              <button
                                className="px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105"
                                onClick={() => setPreviewTemplate(tpl.id)}
                              >
                                Посмотреть
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {filtered.length === 0 && (
                      <div className="col-span-full text-center text-neutral-400 py-8">Нет макетов по выбранным параметрам</div>
                    )}
                  </div>
                );
              })()}
              <div className="flex justify-between">
                <button
                  className="text-gray-400 hover:text-white underline"
                  onClick={() => setStep(1)}
                >
                  Назад
                </button>
                <button
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                  onClick={() => setStep(3)}
                  disabled={!selectedTemplate}
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* Модальное окно предпросмотра макета */}
          {previewTemplateObj && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
              <button
                className="absolute top-4 right-6 text-white text-4xl font-bold hover:text-yellow-400 z-50"
                onClick={() => setPreviewTemplate(null)}
                aria-label="Закрыть"
              >
                ×
              </button>
              <div className="w-full h-full flex items-center justify-center p-6 sm:p-12">
                <img
                  src={previewTemplateObj.image}
                  alt="preview"
                  className="max-w-full max-h-[80vh] object-contain select-none rounded-xl shadow-2xl"
                />
              </div>
              {previewTemplateObj.figmaUrl && (
                <a
                  href={previewTemplateObj.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-yellow-400 transition z-50"
                >
                  Открыть макет в Figma
                </a>
              )}
            </div>
          )}

          {/* Шаг 3: Контактные данные */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4">3. Ваши контактные данные</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full mb-3 px-5 py-3 rounded-full bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: '100ms', animationFillMode: 'both' }}
                  value={contact.name}
                  onChange={e => setContact({ ...contact, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full mb-3 px-5 py-3 rounded-full bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: '200ms', animationFillMode: 'both' }}
                  value={contact.email}
                  onChange={e => setContact({ ...contact, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full mb-3 px-5 py-3 rounded-full bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: '300ms', animationFillMode: 'both' }}
                  value={contact.phone ? `+7${contact.phone}` : '+7'}
                  onFocus={e => {
                    setIsPhoneFocused(true);
                    // Если поле пустое, сразу подставляем +7 и ставим курсор после +7
                    if (!contact.phone) {
                      setContact({ ...contact, phone: '' });
                      setTimeout(() => {
                        if (e.target.setSelectionRange) {
                          e.target.setSelectionRange(2, 2);
                        }
                      }, 0);
                    }
                  }}
                  onBlur={e => {
                    setIsPhoneFocused(false);
                    // Если ничего не введено, очищаем поле
                    if (!contact.phone) {
                      setContact({ ...contact, phone: '' });
                    }
                  }}
                  onChange={e => {
                    // Удаляем всё, кроме цифр
                    let value = e.target.value.replace(/\D/g, '');
                    // Убираем ведущую 7, если пользователь её ввёл
                    if (value.startsWith('7')) value = value.slice(1);
                    // Ограничиваем длину (например, 10 цифр после +7)
                    if (value.length > 10) value = value.slice(0, 10);
                    setContact({ ...contact, phone: value });
                  }}
                  maxLength={12}
                />
                <textarea
                  placeholder="Пожелания, детали, ссылки, комментарии..."
                  className="w-full mb-3 px-5 py-3 rounded-2xl bg-[#181f2e] border-2 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none font-semibold transition-all duration-300 min-h-[80px] resize-y animate-slide-up"
                  style={{ animationDelay: '400ms', animationFillMode: 'both' }}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="text-gray-400 hover:text-white underline"
                  onClick={() => setStep(2)}
                >
                  Назад
                </button>
                <button
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                  onClick={() => setStep(4)}
                  disabled={!contact.name || !contact.email || !contact.phone}
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* Шаг 4: Подтверждение */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Подтверждение заказа</h2>
              <div className="bg-[#181f2e] rounded-xl p-6 mb-6">
                <div className="mb-2"><b>Тип сайта:</b> {selectedSiteTypeObj?.name}</div>
                <div className="mb-2"><b>Макет:</b> {selectedTemplateObj?.name}</div>
                <div className="mb-2"><b>Имя:</b> {contact.name}</div>
                <div className="mb-2"><b>E-mail:</b> {contact.email}</div>
                <div className="mb-2"><b>Телефон:</b> {contact.phone}</div>
                {comment && (
                  <div className="mb-2"><b>Пожелания:</b> {comment}</div>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  className="text-gray-400 hover:text-white underline"
                  onClick={() => setStep(3)}
                >
                  Назад
                </button>
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold"
                  onClick={() => alert('Заявка отправлена!')}
                >
                  Отправить заявку
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
      {/* Кастомная анимация fade-in для карточек и выпадающего списка */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s both;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }
      `}</style>
    </main>
  );
}
