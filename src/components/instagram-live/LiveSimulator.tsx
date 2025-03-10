import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, X, Heart, Send } from "lucide-react";
import { generateFakeComment, generateFakeUsername } from "@/lib/fakeData";

interface LiveSimulatorProps {
  username: string;
  profilePicture: string;
  onExit: () => void;
}

interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: number;
}

interface JoinNotification {
  id: number;
  username: string;
  timestamp: number;
}

interface HeartAnimation {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
}

export default function LiveSimulator({
  username,
  profilePicture,
  onExit,
}: LiveSimulatorProps) {
  const [viewerCount, setViewerCount] = useState<number>(50);
  const [comments, setComments] = useState<Comment[]>([]);
  const [joinNotifications, setJoinNotifications] = useState<
    JoinNotification[]
  >([]);
  const [hearts, setHearts] = useState<HeartAnimation[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const commentsRef = useRef<HTMLDivElement>(null);

  // Increment viewer count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const increment = Math.floor(Math.random() * 3) + 1;
        return prev + increment;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate comments
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (Math.random() > 0.3) {
          // 70% chance to add a comment
          const newComment = {
            id: Date.now(),
            username: generateFakeUsername(),
            text: generateFakeComment(),
            timestamp: Date.now(),
          };
          setComments((prev) => [...prev.slice(-19), newComment]);

          // Scroll to bottom when new comment appears
          setTimeout(() => {
            if (commentsRef.current) {
              commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
            }
          }, 100);
        }
      },
      Math.random() * 2000 + 1000,
    ); // Random interval between 1-3 seconds
    return () => clearInterval(interval);
  }, []);

  // Generate join notifications
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (Math.random() > 0.6) {
          // 40% chance to add a join notification
          const newJoin = {
            id: Date.now(),
            username: generateFakeUsername(),
            timestamp: Date.now(),
          };
          setJoinNotifications((prev) => [...prev, newJoin]);

          // Remove notification after 3 seconds
          setTimeout(() => {
            setJoinNotifications((prev) =>
              prev.filter((join) => join.id !== newJoin.id),
            );
          }, 3000);
        }
      },
      Math.random() * 3000 + 2000,
    ); // Random interval between 2-5 seconds
    return () => clearInterval(interval);
  }, []);

  // Generate heart animations
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (Math.random() > 0.5) {
          // 50% chance to add hearts
          const heartCount = Math.floor(Math.random() * 3) + 1;
          const newHearts = Array.from({ length: heartCount }, () => ({
            id: Date.now() + Math.random() * 1000,
            x: Math.random() * 80 + 10, // Position between 10-90%
            color: ["#ff3040", "#ff5c8a", "#ff7eb9"][
              Math.floor(Math.random() * 3)
            ],
            size: Math.random() * 10 + 20, // Size between 20-30px
            duration: Math.random() * 2 + 2, // Duration between 2-4 seconds
          }));
          setHearts((prev) => [...prev, ...newHearts]);

          // Remove hearts after animation completes
          setTimeout(() => {
            setHearts((prev) =>
              prev.filter((heart) => !newHearts.includes(heart)),
            );
          }, 4000);
        }
      },
      Math.random() * 1000 + 500,
    ); // Random interval between 0.5-1.5 seconds
    return () => clearInterval(interval);
  }, []);

  // Format elapsed time
  const formatElapsedTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Header */}
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

      {/* Live duration */}
      <div className="absolute top-14 left-4 bg-black/50 px-2 py-1 rounded text-xs">
        {formatElapsedTime(elapsedTime)}
      </div>

      {/* Main content area - this would be where the camera feed would be */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="text-center text-gray-400">
          <p className="text-sm">Camera preview would appear here</p>
          <p className="text-xs mt-2">This is a simulation only</p>
        </div>
      </div>

      {/* Join notifications */}
      <div className="absolute top-20 left-4 flex flex-col space-y-2">
        {joinNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full animate-fadeIn"
          >
            {notification.username} joined
          </div>
        ))}
      </div>

      {/* Heart animations */}
      <div className="absolute bottom-20 right-0 w-24 h-64 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 animate-floatUp"
            style={{
              left: `${heart.x}%`,
              color: heart.color,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            <Heart fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Comments section */}
      <div
        ref={commentsRef}
        className="absolute bottom-16 left-0 right-0 max-h-64 overflow-y-auto px-4 py-2 scrollbar-hide"
      >
        {comments.map((comment) => (
          <div key={comment.id} className="mb-2 animate-fadeIn">
            <span className="font-semibold">{comment.username}</span>
            <span className="ml-2">{comment.text}</span>
          </div>
        ))}
      </div>

      {/* Comment input */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Add a comment..."
            className="bg-transparent border-gray-700 text-white"
          />
          <Button variant="ghost" size="icon" className="text-white">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
