"use client";

import { useState } from "react";
import Link from "next/link";
import ReviewModal from "./ReviewModal";
import { Session } from "next-auth";
import AuthPromptModal from "./auth/AuthPromptModal";
import Button from "./UI/Button";

interface ReviewActionsProps {
  session: Session | null;
  showAllLink: boolean;
  totalReviews: number;
}

export default function ReviewActions({ session, showAllLink, totalReviews }: ReviewActionsProps) {
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleLeaveReviewClick = () => {
    if (session) {
      setReviewModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <div className="mt-16 text-center flex-col sm:flex-row flex justify-center items-center gap-4">
        <Button onClick={handleLeaveReviewClick}>
          Оставить отзыв
        </Button>

        {showAllLink && totalReviews > 6 && (
          <Link href="/reviews" className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
            Показать больше
          </Link>
        )}
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />

      <AuthPromptModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
