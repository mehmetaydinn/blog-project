import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../molecules/Card';
import { formatDate } from '../../../utils/helpers';

const PostCard = ({ post, variant = 'default', onClick }) => {
  const { id, title, content, authorName, createdAt } = post;

  const cardContent = (
    <div className="post-card">
      <div className="post-card-content">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {content}
        </p>
      </div>
      <div className="post-card-footer">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{authorName}</span>
          <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        </div>
      </div>
    </div>
  );

  if (variant === 'compact') {
    return (
      <Card
        variant="hover"
        onClick={onClick}
        className="cursor-pointer h-full mb-6"
      >
        {cardContent}
      </Card>
    );
  }

  return (
    <Card
      variant="clickable"
      onClick={onClick}
      className="h-full mb-6"
    >
      <Link to={`/post/${id}`} className="block h-full">
        {cardContent}
      </Link>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact']),
  onClick: PropTypes.func,
};

export default PostCard; 