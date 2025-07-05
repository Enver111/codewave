"use client";

import { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { deleteReview } from "@/actions/reviewActions";
import { Session } from "next-auth";

interface ReviewDeleteButtonProps {
  reviewId: string;
  reviewAuthorName: string;
  session: Session | null;
  onReviewDeleted?: () => void;
}

export default function ReviewDeleteButton({
  reviewId,
  reviewAuthorName,
  session,
  onReviewDeleted
}: ReviewDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState("");

  // Показываем кнопку только администраторам
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return null;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const result = await deleteReview(reviewId);

      if (result.success) {
        setShowConfirmModal(false);
        // Вызываем callback для обновления UI
        if (onReviewDeleted) {
          onReviewDeleted();
        }
      } else {
        setError(result.message || "Произошла ошибка при удалении отзыва.");
      }
    } catch (err) {
      setError("Произошла непредвиденная ошибка.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Кнопка удаления */}
      <button
        onClick={() => setShowConfirmModal(true)}
        className="absolute top-4 right-4 text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10"
        title="Удалить отзыв"
      >
        <FaTrash size={16} />
      </button>

      {/* Модальное окно подтверждения */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md relative text-white">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-red-400">
              Удалить отзыв?
            </h2>

            <p className="text-gray-300 mb-6 text-center">
              Вы действительно хотите удалить отзыв от <span className="font-semibold text-white">{reviewAuthorName}</span>?
              <br />
              <span className="text-sm text-red-400">Это действие нельзя отменить.</span>
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isDeleting}
                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Удаление...
                  </>
                ) : (
                  <>
                    <FaTrash size={14} />
                    Удалить
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
