"use client";

import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  return (
    <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-medium mb-4 text-white">Выход из аккаунта</h3>
      <p className="text-gray-400 text-sm mb-4">
        Нажмите кнопку ниже, чтобы выйти из своего аккаунта
      </p>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="w-full flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
      >
        <FaSignOutAlt size={16} />
        Выйти из аккаунта
      </button>
    </div>
  );
}
