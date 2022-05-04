import React, { useRef } from "react";

function App() {
  const innerRef = useRef<HTMLDivElement>(null);
    return (
      <main
        className="backdrop-filter backdrop-blur-md fixed inset-0 flex items-center justify-center"
        onClick={(e) => {
          if (!innerRef.current?.contains(e.target as any)) {
            window.logseq.hideMainUI();
          }
        }}
      >
        <div ref={innerRef} className="text-size-2em">
          Welcome to [[Logseq]] Plugins!
        </div>
      </main>
    );
  return null;
}

export default App;
