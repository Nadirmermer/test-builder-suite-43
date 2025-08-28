
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useIsMobile } from '@/hooks/use-mobile';
import { initializeDarkMode, toggleSidebar } from '@/store/slices/uiSlice';
import { danisanlariYukle } from '@/store/slices/danisanSlice';
import { testleriYukle } from '@/store/slices/testSlice';
import { cn } from '@/lib/utils';

export default function Layout() {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);
  const isMobile = useIsMobile();
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Test çözüm sayfalarında sidebar ve header gizle
  const isTestInterface = location.pathname.includes('/test-interface');

  useEffect(() => {
    // Dark mode'u başlat
    dispatch(initializeDarkMode());
    
    // Verileri yükle
    dispatch(danisanlariYukle());
    dispatch(testleriYukle());
  }, [dispatch]);

  // Ana içerik alanına tıklandığında sidebar'ı küçült (eğer açıksa)
  const handleMainContentClick = () => {
    if (!isMobile && !sidebarCollapsed) {
      dispatch(toggleSidebar());
    }
  };

  // Test interface için farklı layout
  if (isTestInterface) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Desktop Sidebar - Sabit pozisyon */}
      {!isMobile && (
        <div className="fixed left-0 top-0 h-full z-40">
          <Sidebar />
        </div>
      )}
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen",
        !isMobile && (sidebarCollapsed ? "ml-16" : "ml-64")
      )}>
        {/* Overlay for sidebar close functionality */}
        {!isMobile && !sidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black/20 z-20" 
            onClick={handleMainContentClick}
            style={{ left: '16rem' }}
          />
        )}
        
        {/* Header - Sabit pozisyon */}
        <div className="fixed top-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border" style={{
          left: isMobile ? 0 : (sidebarCollapsed ? '4rem' : '16rem')
        }}>
          <Header />
        </div>
        
        <main 
          ref={mainContentRef}
          className={cn(
            "flex-1 transition-all duration-300 relative z-10",
            isMobile ? "p-4 pb-20 pt-20" : "p-6 pt-20",
            "overflow-auto"
          )}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        {isMobile && <MobileBottomNav />}
      </div>
    </div>
  );
}
