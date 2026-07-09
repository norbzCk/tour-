import { createContext, useContext, useState } from "react";

/* eslint-disable react-refresh/only-export-components */
const AssistantContext = createContext(null);

function AssistantProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openAssistant = () => setOpen(true);
  const closeAssistant = () => setOpen(false);
  const toggleAssistant = () => setOpen((o) => !o);

  return (
    <AssistantContext.Provider
      value={{ open, openAssistant, closeAssistant, toggleAssistant }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

function useAssistant() {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error("useAssistant must be used within an AssistantProvider");
  }
  return context;
}

export { AssistantProvider, useAssistant };
