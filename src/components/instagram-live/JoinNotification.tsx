import { motion } from "framer-motion";

interface JoinNotificationProps {
  id: number;
  username: string;
}

export default function JoinNotification({
  id,
  username,
}: JoinNotificationProps) {
  return (
    <motion.div
      key={id}
      className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {username} joined
    </motion.div>
  );
}
