import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopbarProps {
  userName: string;
  email: string;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

export const Topbar = ({ userName, email, onLogoutClick, onProfileClick }: TopbarProps) => {
  const avatarInitials = userName
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase())
    .join('');

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <Input placeholder="Buscar..." className="max-w-sm" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer'>
            <AvatarFallback>{avatarInitials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <span className="block text-xs px-2 pb-1.5 text-gray-800">{email}</span>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onProfileClick}>Perfil</DropdownMenuItem>
          <DropdownMenuItem onClick={onLogoutClick}>Cerrar sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
