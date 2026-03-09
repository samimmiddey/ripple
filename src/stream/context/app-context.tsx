import { createContext, useState } from "react";
import type { Channel, LocalMessage } from 'stream-chat';

interface AppContextType {
  channel: null | Channel
  setChannel: (channel: null | Channel) => void
  thread: null | LocalMessage
  setThread: (thread: null | LocalMessage) => void
}

export const AppContext = createContext<AppContextType>({
  channel: null,
  setChannel: (channel) => { },
  thread: null,
  setThread: (thread) => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [channel, setChannel] = useState<null | Channel>(null);
  const [thread, setThread] = useState<null | LocalMessage>(null);

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};