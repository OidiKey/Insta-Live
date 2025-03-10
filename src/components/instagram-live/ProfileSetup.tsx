import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ProfileSetupProps {
  onComplete: (username: string, profilePicture: string) => void;
  initialUsername?: string;
  initialProfilePicture?: string;
}

export default function ProfileSetup({
  onComplete,
  initialUsername = "",
  initialProfilePicture = "",
}: ProfileSetupProps) {
  const [username, setUsername] = useState<string>(initialUsername);
  const [profilePicture, setProfilePicture] = useState<string>(
    initialProfilePicture,
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfilePicture(event.target.result as string);
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (username.trim()) {
      onComplete(username, profilePicture);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Set Up Your Profile</h2>

      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profilePicture} alt={username} />
            <AvatarFallback className="bg-gray-200">
              <User className="w-12 h-12 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div className="mt-2">
            <Label
              htmlFor="picture"
              className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {profilePicture ? "Change Picture" : "Upload Picture"}
            </Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </div>
        </div>

        <div className="w-full space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="@username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!username.trim() || isUploading}
        className="w-full"
      >
        {initialUsername ? "Save Changes" : "Continue"}
      </Button>
    </div>
  );
}
