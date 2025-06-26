export default function ConversationSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="bg-gray-800 p-4 rounded-lg animate-pulse">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {/* Заголовок беседы */}
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>

              {/* Содержание последнего сообщения */}
              <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>

              {/* Метаданные */}
              <div className="flex items-center gap-4">
                <div className="h-3 bg-gray-700 rounded w-20"></div>
                <div className="h-3 bg-gray-700 rounded w-24"></div>
                <div className="h-3 bg-gray-700 rounded w-16"></div>
              </div>
            </div>

            {/* Аватар */}
            <div className="w-8 h-8 bg-gray-700 rounded-full ml-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
