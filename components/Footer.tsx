
import React from 'react';

interface FooterProps {
  onAboutClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAboutClick }) => {
  const handleLinkClick = (handler: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    handler();
  };

  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">SmartStay</h3>
            <ul>
              <li className="mb-2"><a href="#" onClick={handleLinkClick(onAboutClick)} className="hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Support</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Help Center</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Cancellation Options</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Partners</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">List Your Property</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Partner Login</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Affiliates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Legal</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms & Conditions</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SmartStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
