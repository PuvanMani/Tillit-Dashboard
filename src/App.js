import React, { useState } from "react";
import Layout from "./Component/layout/layout";
import { BrowserRouter } from "react-router-dom";
import { createContext } from "react";
export const attachContext = createContext();
function App() {
  const [attachOpen, setAttachOpen] = useState(false);
  return (
    <attachContext.Provider value={{ attachOpen, setAttachOpen }}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </attachContext.Provider>
  );
}

export default App;
