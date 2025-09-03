import { NavLink, useLocation } from 'react-router-dom';
import { FiUsers, FiClipboard, FiSettings, FiMenu, FiHome } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { toggleSidebar } from '@/store/slices/uiSlice';
const navigationItems = [{
  name: 'Anasayfa',
  href: '/',
  icon: FiHome,
  description: 'Ana sayfa'
}, {
  name: 'Danışanlar',
  href: '/danisanlar',
  icon: FiUsers,
  description: 'Danışan yönetimi'
}, {
  name: 'Test Arşivi',
  href: '/testler',
  icon: FiClipboard,
  description: 'Mevcut testler'
}, {
  name: 'Ayarlar',
  href: '/ayarlar',
  icon: FiSettings,
  description: 'Sistem ayarları'
}];
export default function Sidebar() {
  const dispatch = useAppDispatch();
  const {
    sidebarCollapsed
  } = useAppSelector(state => state.ui);
  const location = useLocation();
  return <aside className={cn("h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col relative", sidebarCollapsed ? "w-16" : "w-64")}>
      {/* Collapse Toggle Button */}
      <div className="absolute -right-3 top-6 z-10">
        <Button variant="outline" size="icon" onClick={() => dispatch(toggleSidebar())} className="h-8 w-8 bg-background border shadow-sm hover:bg-secondary">
          <FiMenu className="h-4 w-4" />
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2 pt-8 mx-0 px-[10px]">
        {navigationItems.map(item => {
        const isActive = location.pathname === item.href;
        return <NavLink key={item.name} to={item.href} className={cn("flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative", isActive ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-medical" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}>
              <item.icon className={cn("flex-shrink-0 transition-all", sidebarCollapsed ? "h-5 w-5" : "h-5 w-5 mr-3")} />
              
              {!sidebarCollapsed && <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-xs opacity-75 truncate">{item.description}</p>
                </div>}
              
              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && <div className="absolute left-full ml-2 px-2 py-1 bg-popover border rounded-md text-sm 
                                opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity
                                whitespace-nowrap z-50 shadow-md">
                  {item.name}
                </div>}
            </NavLink>;
      })}
      </nav>

      {!sidebarCollapsed && <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <img 
                src="/logo.png" 
                alt="PsikoTest Logo" 
                className="w-10 h-10 object-cover rounded-lg"
              />
              <span className="font-medium">PsikoTest v1.0</span>
            </div>
            
            <div className="text-center space-y-1">
              <p className="font-medium">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Nadir MERMER
                </span>
              </p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-sidebar-foreground/40">
                <span>💝</span>
                <span>Aşk ile yapıldı</span>
                <span>💝</span>
              </div>
            </div>
          </div>
        </div>}
    </aside>;
}