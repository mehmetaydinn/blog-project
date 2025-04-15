import PropTypes from 'prop-types';

const Card = ({
  children,
  title,
  variant = 'default',
  onClick,
  className = ''
}) => {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700';
  
  const variants = {
    default: '',
    hover: 'hover:shadow-lg transition-shadow duration-200 hover:border-gray-300 dark:hover:border-gray-600',
    clickable: 'hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600'
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
      onClick={onClick}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'hover', 'clickable']),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Card; 