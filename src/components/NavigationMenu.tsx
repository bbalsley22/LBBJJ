import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AuthButton } from "./AuthButton";

export function MainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {!isHomePage && <div className="h-24" />}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-black">
        {!isHomePage && (
          <div 
            className="w-44 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => navigate('/')}
          >
            <img 
              src="/image.png" 
              alt="Lost Boys Brazilian Jiu Jitsu"
              className="w-full h-auto"
            />
          </div>
        )}
        <div className="relative ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-800 rounded-md transition-colors"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-lg">
              <div 
                className="px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => handleLinkClick('/')}
              >
                Home
              </div>
              <div 
                className="px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => handleLinkClick('/about')}
              >
                About Us
              </div>
              <div 
                className="px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => handleLinkClick('/manage-subscription')}
              >
                My Account
              </div>
              <div className="px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer transition-colors">
                <AuthButton className="w-full justify-start p-0 h-auto hover:bg-transparent bg-transparent text-sm font-normal text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}