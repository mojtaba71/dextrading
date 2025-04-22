// components/CountdownTimer.js
import { useState, useEffect } from "react";
import "./CarouselTimer.css";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(10); // Countdown time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  // Calculate percentage of the progress
  const progress = ((10 - timeLeft) / 10) * 100;

  // Start/Stop button toggle
  const toggleTimer = () => setIsRunning((prev) => !prev);

  // Reset the timer
  const resetTimer = () => {
    setTimeLeft(10);
    setIsRunning(false);
  };

  return (
    <div className="square-timer-container">
      
    </div>
  );
}
