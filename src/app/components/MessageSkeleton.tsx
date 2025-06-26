export default function MessageSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-3 rounded-lg bg-gray-800/50 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
            <div className="h-3 bg-gray-700 rounded w-16 ml-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
