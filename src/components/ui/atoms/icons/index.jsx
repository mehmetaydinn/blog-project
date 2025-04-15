import PropTypes from 'prop-types';

// Temel Icon bileşeni
export const Icon = ({ children, size = 20, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      {...props}
    >
      {children}
    </svg>
  );
};

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

// Düzenleme İkonu
export const EditIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Icon>
);

EditIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Silme İkonu
export const TrashIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Icon>
);

TrashIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Üç Nokta Dikey İkonu
export const DotsVerticalIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </Icon>
);

DotsVerticalIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Güneş İkonu
export const SunIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </Icon>
);

SunIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Ay İkonu
export const MoonIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);

MoonIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Kullanıcı İkonu
export const UserIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

UserIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Aşağı Ok İkonu
export const ChevronDownIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

ChevronDownIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Menü (Hamburger) İkonu
export const MenuIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

MenuIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Kapatma (X) İkonu
export const XIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

XIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Artı İkonu
export const PlusIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

PlusIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Takvim İkonu
export const CalendarIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon>
);

CalendarIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Belge İkonu
export const DocumentIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </Icon>
);

DocumentIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

// Yorum/Konuşma Balonu İkonu
export const ChatIcon = ({ size, className, ...props }) => (
  <Icon size={size} className={className} {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);

ChatIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
}; 