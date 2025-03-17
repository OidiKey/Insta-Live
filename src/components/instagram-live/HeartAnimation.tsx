import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartAnimationProps {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
}

export default function HeartAnimation({
  id,
  x,
  color,
  size,
  duration,
}: HeartAnimationProps) {
  return (
    <motion.div
      key={id}
      className="absolute bottom-0"
      initial={{ y: 0, opacity: 0.7, x: `${x}%` }}
      animate={{ y: -200, opacity: 0 }}
      transition={{
        duration: duration,
        ease: "easeOut",
        opacity: { duration: duration * 0.8 },
      }}
      style={{
        color: color,
        fontSize: `${size}px`,
      }}
    >
      <Heart fill="currentColor" />
    </motion.div>
  );
}
