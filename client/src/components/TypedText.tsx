import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const TypedText = ({ id, strings }: { id: string; strings: string[] }) => {
  const element = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [typedInstance, setTypedInstance] = useState<any>(null);  // Track Typed.js instance

  // Ensure Typed.js is initialized only once and does not conflict
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && element.current && !typedInstance) {
      const options = {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: "|",
        fadeOut: true,
        fadeOutClass: "typed-fade-out",
        fadeOutDelay: 500,
      };

      // Initialize the Typed.js instance only once
      const typed = new Typed(element.current, options);
      setTypedInstance(typed);

      // Cleanup the Typed.js instance when the component is unmounted or strings change
      return () => {
        if (typedInstance) {
          typedInstance.destroy();
        }
      };
    }
  }, [strings, isMounted, typedInstance]);

  if (!isMounted) {
    return null; // Don't render until the component is mounted on the client
  }

  return <span id={id} ref={element}></span>;
};

export default TypedText;
