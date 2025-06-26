"use client";
import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { createReview } from "@/actions/createReview";
import { useRouter } from "next/navigation";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
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


export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !text) {
      setError("Пожалуйста, выберите оценку и напишите отзыв.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      await createReview({ rating, text });
      // Reset form and close modal
      setText("");
      setRating(0);
      onClose();
      router.refresh(); // Refresh the page to show the new review
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Не удалось отправить отзыв.");
    } finally {
        setIsSubmitting(false);
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="text-center pt-4">
             <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Отправка..." : "Отправить отзыв"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
