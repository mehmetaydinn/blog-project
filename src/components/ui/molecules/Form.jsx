import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';

const formVariants = cva('', {
  variants: {
    variant: {
      default: 'space-y-4',
      inline: 'flex items-center space-x-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Form = ({
  onSubmit,
  children,
  variant,
  className,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      className={formVariants({ variant, className })}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'inline']),
  className: PropTypes.string,
};

export default Form; 