
import { motion } from "framer-motion";
var height = window.screen.height
const animationConfiguration = {
  initial: { opacity: 0, y:-height/2 },
  animate: { opacity: 1, y:0 },
  exit: { opacity: 0, y:height },
};
const Transition = ({ children }) => {
  return (
    <motion.div className="transition"
      key="modal"
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
export default Transition;
