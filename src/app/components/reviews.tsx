"use client";
import { Container } from "./container";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { initialReviews } from "../../../data/reviews";
import Link from "next/link";

interface ReviewsProps {
  limit?: number;
  showAllLink?: boolean;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-600"}
        />
      ))}
    </div>
  );
};

export default function Reviews({ limit, showAllLink = false }: ReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewSubmit = (newReview: { name: string; rating: number; text: string }) => {
    const reviewWithAvatar = {
      ...newReview,
      avatar: `https://i.pravatar.cc/150?u=${new Date().getTime()}`, // Unique avatar for new review
    };
    setReviews([reviewWithAvatar, ...reviews]);
  };

  const displayedReviews = limit ? reviews.slice(0, limit) : reviews;

  return (
    <Container>
      <section id="reviews" className="py-20 px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
            Отзывы наших клиентов
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Мы гордимся своей работой и ценим доверие, которое нам оказывают.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedReviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30"
            >
              <div className="flex items-center mb-6">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4 border-2 border-gray-700"
                />
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    {review.name}
                  </h4>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center flex-col sm:flex-row flex justify-center items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
          >
            Оставить отзыв
          </button>
          {showAllLink && (
             <Link href="/reviews" className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
              Показать больше
            </Link>
          )}
        </div>
      </section>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </Container>
  );
}
