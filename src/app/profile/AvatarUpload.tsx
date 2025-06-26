"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AvatarUploadProps {
  currentAvatar?: string | null;
}

export default function AvatarUpload({ currentAvatar }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith("image/")) {
      setMessage({ type: 'error', text: "Пожалуйста, выберите изображение" });
      return;
    }

    // Проверяем размер файла (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: "Размер файла должен быть меньше 5MB" });
      return;
    }

    // Создаем предпросмотр
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setMessage(null);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setMessage({ type: 'error', text: "Пожалуйста, выберите файл" });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: "Аватар успешно обновлен!" });
        // Очищаем предпросмотр
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        // Обновляем страницу, чтобы показать новый аватар
        router.refresh();
      } else {
        setMessage({ type: 'error', text: result.error || "Ошибка при загрузке" });
      }
    } catch (error) {
      setMessage({ type: 'error', text: "Произошла ошибка при загрузке" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setMessage(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={previewUrl || currentAvatar || "/default-avatar.png"}
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            Выбрать файл
          </button>
        </div>
      </div>

      {previewUrl && (
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {isUploading ? "Загрузка..." : "Загрузить"}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
          >
            Отмена
          </button>
        </div>
      )}

      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}

      <p className="text-xs text-gray-400">
        Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 5MB.
      </p>
    </div>
  );
}
