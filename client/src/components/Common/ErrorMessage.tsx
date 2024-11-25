import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-96">
      <p className="text-red-500 text-xl font-semibold">{message}</p>
    </div>
  );
};

export default ErrorMessage;