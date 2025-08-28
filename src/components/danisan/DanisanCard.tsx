// Danışan kartı bileşeni

import { Danisan } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FiUser, FiCalendar, FiPhone, FiTrash2, FiBook } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/hooks/useRedux';
import { danisanSil } from '@/store/slices/danisanSlice';
import { toast } from 'sonner';

interface DanisanCardProps {
  danisan: Danisan;
  onClick: () => void;
  className?: string;
  onDelete?: (id: number) => void;
}

export default function DanisanCard({ danisan, onClick, className, onDelete }: DanisanCardProps) {
  const dispatch = useAppDispatch();
  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Geçersiz tarih';
    }
    
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm(`${danisan.adSoyad} adlı danışanı ve tüm test sonuçlarını silmek istediğinizden emin misiniz?`)) {
      try {
        await dispatch(danisanSil(danisan.id!)).unwrap();
        toast.success('Danışan başarıyla silindi');
        onDelete?.(danisan.id!);
      } catch (error) {
        toast.error('Danışan silinirken hata oluştu');
      }
    }
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-floating border-border/50 hover:border-primary/20 group",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-medical flex items-center justify-center text-white font-semibold shadow-medical">
            {getInitials(danisan.adSoyad)}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {danisan.adSoyad}
                </h3>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    <span>Kayıt: {formatDate(danisan.eklenmeTarihi)}</span>
                  </div>
                  
                  {danisan.telefon && (
                    <div className="flex items-center gap-1">
                      <FiPhone className="w-4 h-4" />
                      <span>{danisan.telefon}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Cinsiyet Badge */}
                {danisan.cinsiyet && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {danisan.cinsiyet}
                  </Badge>
                )}

                {/* Eğitim Durumu Badge */}
                {danisan.egitimDurumu && (
                  <Badge 
                    variant="outline" 
                    className="text-xs flex items-center gap-1"
                  >
                    <FiBook className="w-3 h-3" />
                    {danisan.egitimDurumu}
                  </Badge>
                )}
                
                {/* Silme Butonu */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 p-1 h-8 w-8"
                >
                  <FiTrash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Ek bilgiler */}
            {danisan.dogumTarihi && (
              <div className="mt-3 text-sm text-muted-foreground">
                <span>Doğum: {danisan.dogumTarihi}</span>
              </div>
            )}

            {danisan.notlar && (
              <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {danisan.notlar}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}