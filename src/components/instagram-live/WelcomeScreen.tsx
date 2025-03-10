import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
          <Instagram className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-center">
          Instagram Live Simulator
        </h1>
      </div>

      <p className="text-center text-gray-600">
        Experience what it's like to go live on Instagram with our realistic
        simulator. Watch as viewers join, comments appear, and hearts float
        across your screen.
      </p>

      <Button
        onClick={onGetStarted}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        Get Started
      </Button>

      <p className="text-xs text-gray-500 text-center">
        This is a simulation only. No actual live streaming occurs.
      </p>
    </div>
  );
}
