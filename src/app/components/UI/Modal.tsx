import { useEffect, useRef, useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, children, className }: ModalProps) {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setShow(true);
    } else if (show) {
      setVisible(false);
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 min-h-screen bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={`bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 m-4 w-full max-w-md relative text-white text-center shadow-2xl transform transition-all duration-200 ${visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} ${className || ''}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
