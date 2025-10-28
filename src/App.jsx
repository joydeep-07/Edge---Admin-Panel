import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Messages from "./Pages/Messages";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true, 
      smoothTouch: true,
      direction: "vertical",
      gestureDirection: "vertical",
    });


    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Messages />
    </div>
  );
};

export default App;
