const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow mt-4">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Blog. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 