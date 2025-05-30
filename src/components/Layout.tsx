
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-calm-50 dark:from-background dark:to-calm-900 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-3 py-4 sm:px-6 sm:py-8 md:py-12">
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-3 sm:mb-0">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-calm-400 to-healing-400 flex items-center justify-center">
                <span className="text-white font-bold text-base sm:text-lg">E</span>
              </div>
              <h1 className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-calm-600 to-healing-600 bg-clip-text text-transparent">
                EmotionWell
              </h1>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground text-center">
              Your partner in emotional wellbeing
            </div>
          </div>
        </header>
        <main className="w-full">{children}</main>
        <footer className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-muted-foreground px-4">
          <p>© {new Date().getFullYear()} EmotionWell. All rights reserved.</p>
          <p className="mt-1">Helping you process emotions for better wellbeing.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
