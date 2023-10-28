
import { motion } from "framer-motion";
var height = window.screen.height
const animationConfiguration = {
  initial: {
    opacity: 0,
    y: -100,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    
  },
  exit: {
    opacity: 0,
    y: height,
    blur: 1,
    filter: "blur(10px)",
  },
};
const Transition = ({ children }) => {
  return (
    <motion.div className="transition"
      key="modal"
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
export default Transition;
