import React from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const clearTimer = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = (e: React.MouseEvent) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    timer.current = setTimeout(() => {
      setIsModalOpen(true);
    }, 600);
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    if (timer.current) clearTimeout(timer.current);
    clearTimer.current = setTimeout(() => {
      setIsModalOpen(false);
    }, 100);
  };
  return { handleMouseOut, handleMouseOver, isModalOpen };
};

export default useModal;
