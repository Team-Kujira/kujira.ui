import { MAINNET, NETWORK, POND, TESTNET } from "kujira.js";
import { Channel, Socket } from "phoenix";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const Context = createContext<{
  socket: null | Socket;
  channels: Record<string, Channel>;
  addChannel: (topic: string) => void;
}>({
  socket: null,
  channels: {},
  addChannel: () => {},
});

export const RealtimeContext: React.FC<
  PropsWithChildren<{ network: NETWORK }>
> = ({ children, network }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [channels, setChannels] = useState<Record<string, Channel>>(
    {}
  );

  const addChannel = (topic: string) =>
    setChannels((prev) => {
      if (prev[topic]) return prev;
      if (!socket) return prev;
      const c = socket.channel(topic);
      c.join();

      return { ...prev, [topic]: c };
    });

  useEffect(() => {
    const endpoint = {
      [POND]: "ws://127.0.0.1:4000",
      [TESTNET]: "wss://api-harpoon.kujira.app",
      [MAINNET]: "wss://api.kujira.app",
    }[network];

    if (socket?.endPointURL() === endpoint) return;
    socket?.disconnect();
    setChannels({});
    const s = new Socket(`${endpoint}/socket`, {});

    s.connect();
    setSocket(s);
    return () => s.disconnect();
  }, [network]);

  return (
    <Context.Provider value={{ socket, channels, addChannel }}>
      {children}
    </Context.Provider>
  );
};

export const useChannel = (topic: string): Channel | undefined => {
  const { socket, channels, addChannel } = useContext(Context);
  const channel = channels[topic];

  useEffect(() => {
    if (!socket) return;
    addChannel(topic);
  }, [socket]);

  return channel;
};
