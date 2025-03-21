import { Newspaper } from "lucide-react";

const Header = () => {
    return (
      <header className="bg-white shadow-sm fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Newspaper className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Sam Innoscripta News</h1>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;