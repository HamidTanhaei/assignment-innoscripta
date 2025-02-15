interface AlertProps {
  type: 'info' | 'danger' | 'success' | 'warning' | 'dark';
  title?: string;
  message: string;
  className?: string;
}

export const Alert = ({ type, title, message, className = '' }: AlertProps) => {
  const baseClasses = 'p-4 mb-4 text-sm rounded-lg dark:bg-gray-800';
  
  const styles = {
    info: `${baseClasses} text-blue-800 bg-blue-50 dark:text-blue-400`,
    danger: `${baseClasses} text-red-800 bg-red-50 dark:text-red-400`,
    success: `${baseClasses} text-green-800 bg-green-50 dark:text-green-400`,
    warning: `${baseClasses} text-yellow-800 bg-yellow-50 dark:text-yellow-300`,
    dark: `${baseClasses} text-gray-800 bg-gray-50 dark:text-gray-300`,
  };

  return (
    <div className={`${styles[type]} ${className}`.trim()} role="alert">
      {title && <span className="font-medium">{title}</span>} {message}
    </div>
  );
};

