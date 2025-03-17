import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, X } from "lucide-react";

interface LiveHeaderProps {
  username: string;
  profilePicture: string;
  viewerCount: number;
  onExit: () => void;
}

export default function LiveHeader({
  username,
  profilePicture,
  viewerCount,
  onExit,
}: LiveHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 z-10">
      <div className="flex items-center space-x-2">
        <Avatar className="w-8 h-8 border border-gray-500">
          <AvatarImage src={profilePicture} alt={username} />
          <AvatarFallback className="bg-gray-700">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{username}</span>
          <div className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-sm font-bold">
            LIVE
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm">{viewerCount}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onExit}
          className="text-white"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
