import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings } from "lucide-react";

interface MainMenuProps {
  username: string;
  profilePicture: string;
  onStartLive: () => void;
  onEditProfile: () => void;
}

export default function MainMenu({
  username,
  profilePicture,
  onStartLive,
  onEditProfile,
}: MainMenuProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center">
        Instagram Live Simulator
      </h1>

      <div className="flex flex-col items-center space-y-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profilePicture} alt={username} />
          <AvatarFallback className="bg-gray-200">
            <User className="w-12 h-12 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <span className="text-lg font-medium">@{username}</span>
      </div>

      <div className="w-full space-y-4">
        <Button
          onClick={onStartLive}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
        >
          Start Live Simulation
        </Button>

        <Button
          onClick={onEditProfile}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        This is a simulation of Instagram Live. No actual live streaming occurs.
      </p>
    </div>
  );
}
