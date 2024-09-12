// components/LottieAnimation.js
import { useLottie } from "lottie-react";
import animationData from '../../../public/lottie/a3.json';

const options = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const LottieAnimation = () => {
  const { View } = useLottie(options);
  return <div className='w-[70vh] rounded-3xl overflow-hidden'>{View}</div>;
};

export default LottieAnimation;