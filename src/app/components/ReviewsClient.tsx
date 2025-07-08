"use client";

import { Container } from "./container";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import ReviewActions from "./ReviewActions";
import ReviewDeleteButton from "./ReviewDeleteButton";
import { Session } from "next-auth";
import Title from "./UI/Title";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './services-swiper.css';
import './scrollbar-hide.css';

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
const CARD_HEIGHT = '20rem';
const ReviewCard = ({ review, session, onReviewDeleted, mobile = false }: { review: any; session: Session | null; onReviewDeleted?: () => void; mobile?: boolean }) => (
  <div
    className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8  transform md:hover:-translate-y-2 transition-all duration-300 md:hover:shadow-2xl md:hover:shadow-yellow-500/10 md:hover:border-yellow-500/30 relative flex flex-col h-full`}
    style={{ width: '20rem', minWidth: '20rem', maxWidth: '20rem', minHeight: CARD_HEIGHT, maxHeight: CARD_HEIGHT, height: CARD_HEIGHT }}
  >
    <ReviewDeleteButton
      reviewId={review.id}
      reviewAuthorName={review.user.name || "Аноним"}
      session={session}
      onReviewDeleted={onReviewDeleted}
    />

    <div className="flex items-center mb-3" style={{ minHeight: 64 }}>
      <Image
        src={review.user.image || `https://i.pravatar.cc/150?u=${review.userId}`}
        alt={review.user.name || "Аноним"}
        width={48}
        height={48}
        className="rounded-full mr-3 border-2 border-gray-700"
      />
      <div>
        <h4 className="text-base font-semibold text-white">
          {review.user.name || "Аноним"}
        </h4>
        <StarRating rating={review.rating} />
      </div>
    </div>
    <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
      <p className="text-gray-300 leading-relaxed break-words break-all whitespace-pre-line overflow-hidden">{review.text}</p>
    </div>
  </div>
);

export default function ReviewsClient({ reviews, session, limit, showAllLink = false }: ReviewsClientProps) {
  const displayedReviews = limit ? reviews.slice(0, limit) : reviews;

  const handleReviewDeleted = () => {
    // Обновляем страницу после удаления отзыва
    window.location.reload();
  };

  return (
    <Container>
      <section id="reviews" className="py-16 px-6">
        <div className="text-center mb-16">
          <Title>Отзывы наших клиентов</Title>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mt-4 text-lg">
            Мы гордимся своей работой и ценим доверие, которое нам оказывают.
          </p>
        </div>

        {displayedReviews.length > 0 ? (
          <>
            {/* Мобильный свайпер */}
            <div className="md:hidden pb-2">
              <Swiper
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                centeredSlides={true}
                pagination={{ clickable: true, el: '.custom-swiper-pagination-reviews' }}
                style={{ width: '100%', maxWidth: 400 }}
                className="w-full flex flex-col items-center mb-2"
              >
                {displayedReviews.map((review: any) => (
                  <SwiperSlide key={review.id} className="!flex !justify-center">
                    <div className="w-[20rem] min-w-[20rem] max-w-[20rem] h-80 min-h-80 max-h-80 flex">
                      <ReviewCard review={review} session={session} onReviewDeleted={handleReviewDeleted} mobile />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="custom-swiper-pagination-reviews flex justify-center mt-1" />
            </div>
            {/* Десктопная сетка */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-20">
              {displayedReviews.map((review: any) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  session={session}
                  onReviewDeleted={handleReviewDeleted}
                />
              ))}
            </div>
          </>
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
