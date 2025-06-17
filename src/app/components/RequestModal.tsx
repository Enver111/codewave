'use client';

import { useState } from 'react';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectType: string;
  totalPrice: number;
  selectedFeatures: string[];
}

export default function RequestModal({
  isOpen,
  onClose,
  projectType,
  totalPrice,
  selectedFeatures,
}: RequestModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectType,
          totalPrice,
          selectedFeatures,
        }),
      });

      if (response.ok) {
        alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        onClose();
        setFormData({
          firstName: '',
          lastName: '',
          middleName: '',
          phone: '',
          email: '',
        });
      } else {
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
      }
    } catch (error) {
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#10182a] rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          ✕
        </button>

        <h3 className="text-2xl font-semibold text-yellow-100 mb-6">
          Оставить заявку
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-neutral-300 mb-2" htmlFor="lastName">
              Фамилия *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#0a0e1a] text-white border border-neutral-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 mb-2" htmlFor="firstName">
              Имя *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#0a0e1a] text-white border border-neutral-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 mb-2" htmlFor="middleName">
              Отчество
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#0a0e1a] text-white border border-neutral-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 mb-2" htmlFor="phone">
              Номер телефона *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#0a0e1a] text-white border border-neutral-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 mb-2" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#0a0e1a] text-white border border-neutral-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
