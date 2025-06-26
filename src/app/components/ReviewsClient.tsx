"use client";

import { Container } from "./container";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import ReviewActions from "./ReviewActions";
import { Session } from "next-auth";

interface ReviewsClientProps {
  reviews: any[];
  session: Session | null;
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

// Using 'any' to bypass persistent typing issues
const ReviewCard = ({ review }: { review: any }) => (
  <div
    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30"
  >
    <div className="flex items-center mb-6">
      <Image
        src={review.user.image || `https://i.pravatar.cc/150?u=${review.userId}`}
        alt={review.user.name || "Аноним"}
        width={64}
        height={64}
        className="rounded-full mr-4 border-2 border-gray-700"
      />
      <div>
        <h4 className="text-xl font-semibold text-white">
          {review.user.name || "Аноним"}
        </h4>
        <StarRating rating={review.rating} />
      </div>
    </div>
    <p className="text-gray-300 leading-relaxed">{review.text}</p>
  </div>
);

export default function ReviewsClient({ reviews, session, limit, showAllLink = false }: ReviewsClientProps) {
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

        {displayedReviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedReviews.map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10">
            <p className="text-lg">Отзывов пока нет.</p>
            <p>Станьте первым, кто поделится своим мнением!</p>
          </div>
        )}

        <ReviewActions
          session={session}
          showAllLink={showAllLink}
          totalReviews={reviews.length}
        />
      </section>
    </Container>
  );
}
