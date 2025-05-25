import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const Topbar = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <Input placeholder="Buscar..." className="max-w-sm" />
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </header>
  )
}