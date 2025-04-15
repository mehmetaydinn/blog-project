import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { XIcon } from '../atoms/icons';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  variant = 'default',
  className = '',
  showButtons = false,
  confirmText = 'Onayla',
  cancelText = 'İptal',
  onConfirm = () => {},
 
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalClasses = `
    fixed z-50 inset-0 overflow-y-auto
    ${className}
  `;

  const backdropClasses = `
    fixed inset-0 bg-black bg-opacity-50 transition-opacity
  `;

  const contentClasses = `
    bg-white dark:bg-gray-800 rounded-lg shadow-xl 
    transform transition-all 
    mx-auto my-8
    ${variant === 'fullscreen' ? 'w-full h-screen max-w-full' : 'w-full max-w-md sm:max-w-lg p-6'}
  `;

  return (
    <div className={modalClasses} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div className={backdropClasses} onClick={onClose} aria-hidden="true"></div>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div 
              ref={modalRef}
              className={contentClasses}
            >
              {/* Close button */}
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-transparent rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Kapat</span>
                  <XIcon size={24} aria-hidden="true" />
                </button>
              </div>

              {/* Title */}
              {title && (
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4" id="modal-title">
                  {title}
                </h3>
              )}

              {/* Content */}
              <div className="mt-2">
                {children}
              </div>

              {/* Buttons */}
              {showButtons && (
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm`}
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </button>
                  <button
                    type="button"
                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm`}
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'fullscreen']),
  className: PropTypes.string,
  showButtons: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmButtonVariant: PropTypes.string,
  confirmButtonSize: PropTypes.string,
  cancelButtonVariant: PropTypes.string,
  cancelButtonSize: PropTypes.string,
};

export default Modal; 