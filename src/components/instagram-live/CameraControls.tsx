import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

interface CameraControlsProps {
  onSwitchCamera: () => void;
}

export default function CameraControls({
  onSwitchCamera,
}: CameraControlsProps) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSendComment = () => {
    // In a real app, this would send the comment
    // For the simulator, we just clear the input
    setComment("");
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 border-t border-gray-800">
      <div className="flex justify-center mb-3 space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/10 text-white hover:bg-white/20"
          onClick={onSwitchCamera}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-camera"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Add a comment..."
          className="bg-transparent border-gray-700 text-white"
          value={comment}
          onChange={handleCommentChange}
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handleSendComment}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
