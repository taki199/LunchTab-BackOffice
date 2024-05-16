import React, { useState, useEffect } from 'react';

const Message = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const getMessageClass = () => {
    switch (type) {
      case 'error':
        return 'text-gray-900 bg-red-400';
      case 'success':
        return 'text-gray-900 bg-green-400';
      default:
        return '';
    }
  };

  return (
    <>
      {isVisible && (
        <div className={`w-full rounded-lg mx-auto px-4 py-2 max-w-md ${getMessageClass()}`}>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Message;
