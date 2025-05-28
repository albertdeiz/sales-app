import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Topbar = ({ userName }: { userName: string }) => {
  const avatarInitials = userName
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase())
    .join('');

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <Input placeholder="Buscar..." className="max-w-sm" />
      <Avatar>
        <AvatarFallback>{avatarInitials}</AvatarFallback>
      </Avatar>
    </header>
  );
};
