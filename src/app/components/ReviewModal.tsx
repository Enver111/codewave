"use client";
import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { name: string; rating: number; text: string }) => void;
}

const StarRatingInput = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer transition-colors duration-200"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};


export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && text && rating > 0) {
      onSubmit({ name, rating, text });
      // Reset form and close modal
      setName("");
      setText("");
      setRating(0);
      onClose();
    } else {
      alert("Пожалуйста, заполните все поля и выберите оценку.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 m-4 w-full max-w-lg relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Оставить отзыв
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Ваше имя</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="Иван Петров"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Ваша оценка</label>
            <StarRatingInput rating={rating} setRating={setRating} />
          </div>
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">Текст отзыва</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="Расскажите о вашем опыте работы с нами..."
              required
            ></textarea>
          </div>
          <div className="text-center pt-4">
             <button type="submit" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
              Отправить отзыв
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
