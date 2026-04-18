import React, { useEffect, useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const [show, setShow] = useState(open);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let openTimeout: NodeJS.Timeout;
    let closeTimeout: NodeJS.Timeout;

    if (open) {
      setShow(true);
      openTimeout = setTimeout(() => setAnimate(true), 20); // pequeño delay para activar animación
    } else if (show) {
      setAnimate(false);
      closeTimeout = setTimeout(() => setShow(false), 300); // coincide con la duración de salida
    }

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
    // eslint-disable-next-line
  }, [open]);

  if (!show) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300 ease-out
        ${animate ? "bg-black/60" : "bg-black/0 pointer-events-none"}
      `}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 relative
          transition-all duration-300 ease-out
          ${animate
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"}
        `}
        style={{ willChange: "opacity, transform" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl p-3 text-slate-800 hover:text-black hover:bg-gray-100 rounded-full focus:outline-none"
          aria-label="Cerrar"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;