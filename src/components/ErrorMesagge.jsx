import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
      <div className="flex justify-between items-center">
        <p>{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;