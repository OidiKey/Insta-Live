import { motion } from "framer-motion";

interface CommentItemProps {
  id: number;
  username: string;
  text: string;
  isNew?: boolean;
}

export default function CommentItem({
  id,
  username,
  text,
  isNew = true,
}: CommentItemProps) {
  return (
    <motion.div
      key={id}
      className="mb-2"
      initial={isNew ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="font-semibold">{username}</span>
      <span className="ml-2">{text}</span>
    </motion.div>
  );
}
