
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      
      {/* Admin portal link - fixed button at the bottom right */}
      <div className="fixed bottom-4 right-4 z-10">
        <Link 
          to="/admin"
          className="bg-primary text-white px-4 py-2 rounded-md shadow-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
        >
          <span>Admin Portal</span>
        </Link>
      </div>
    </div>
  );
}
