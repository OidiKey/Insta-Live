import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { generateFakeComment, generateFakeUsername } from "@/lib/fakeData";
import HeartAnimation from "./HeartAnimation";
import CommentItem from "./CommentItem";
import JoinNotification from "./JoinNotification";
import CameraControls from "./CameraControls";
import LiveHeader from "./LiveHeader";
import { AnimatePresence } from "framer-motion";

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
  const [cameraError, setCameraError] = useState<boolean>(false);

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      // Stop all video streams when component unmounts
      const videoElements = document.querySelectorAll("video");
      videoElements.forEach((video) => {
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      });
    };
  }, []);

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
            text: addKenyanFlag(generateFakeComment()),
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

  // Add Kenyan flag emoji to some comments
  const addKenyanFlag = (comment: string): string => {
    // 30% chance to add Kenyan flag if it doesn't already have one
    if (Math.random() > 0.7 && !comment.includes("🇰🇪")) {
      return `${comment} 🇰🇪`;
    }
    return comment;
  };

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

  const switchCamera = () => {
    const videoElement = document.querySelector("video");
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());

      // Switch camera if available
      const facingMode =
        tracks[0].getSettings().facingMode === "user" ? "environment" : "user";
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode }, audio: false })
        .then((newStream) => {
          videoElement.srcObject = newStream;
          setCameraError(false);
        })
        .catch((err) => {
          console.error("Error switching camera:", err);
          setCameraError(true);
        });
    }
  };

  const requestCameraPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((stream) => {
        const videoElement = document.querySelector("video");
        if (videoElement) {
          videoElement.srcObject = stream;
          setCameraError(false);
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        setCameraError(true);
      });
  };

  return (
    <div className="relative flex flex-col h-screen w-full max-w-md mx-auto bg-black text-white overflow-hidden">
      {/* Header */}
      <LiveHeader
        username={username}
        profilePicture={profilePicture}
        viewerCount={viewerCount}
        onExit={onExit}
      />

      {/* Live duration */}
      <div className="absolute top-14 left-4 bg-black/50 px-2 py-1 rounded text-xs">
        {formatElapsedTime(elapsedTime)}
      </div>

      {/* Camera feed area */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
        <video
          ref={(videoElement) => {
            // Initialize camera when component mounts
            if (videoElement && !videoElement.srcObject) {
              requestCameraPermission();
            }
          }}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="text-center p-4">
              <p className="mb-4">
                Camera access is required for the live experience
              </p>
              <Button
                onClick={requestCameraPermission}
                className="bg-red-500 hover:bg-red-600"
              >
                Enable Camera
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Join notifications */}
      <div className="absolute top-20 left-4 flex flex-col space-y-2">
        <AnimatePresence>
          {joinNotifications.map((notification) => (
            <JoinNotification
              key={notification.id}
              id={notification.id}
              username={notification.username}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Heart animations */}
      <div className="absolute bottom-20 right-0 w-24 h-64 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <HeartAnimation
            key={heart.id}
            id={heart.id}
            x={heart.x}
            color={heart.color}
            size={heart.size}
            duration={heart.duration}
          />
        ))}
      </div>

      {/* Comments section */}
      <div
        ref={commentsRef}
        className="absolute bottom-16 left-0 right-0 max-h-64 overflow-y-auto px-4 py-2 scrollbar-hide"
      >
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            username={comment.username}
            text={comment.text}
          />
        ))}
      </div>

      {/* Camera controls and comment input */}
      <CameraControls onSwitchCamera={switchCamera} />
    </div>
  );
}
