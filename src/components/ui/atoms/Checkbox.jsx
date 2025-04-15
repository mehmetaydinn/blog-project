import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';

const checkboxVariants = cva(
  'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700',
  {
    variants: {
      variant: {
        default: '',
        toggle: 'rounded-full',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const Checkbox = ({
  checked,
  disabled,
  label,
  variant,
  size,
  onChange,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className={checkboxVariants({ variant, size, className })}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
        {label && (
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">
            {label}
          </span>
        )}
      </label>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'toggle']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onChange: PropTypes.func,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox; 