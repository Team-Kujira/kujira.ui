import { useLocalStorage } from "kujira-core";
import {
  AuthnClient,
  AuthnCredential,
  AuthnWebSigner,
} from "kujira.js";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { useNetwork } from "./network";

const STORE_KEY = "authn-web";
const RP_NAME = "Kujira Passkey";

interface Stored {
  name: string;
  credential: AuthnCredential;
}

export interface PasskeyContextI {
  signers: Record<string, AuthnWebSigner>;
  signer?: AuthnWebSigner;
  client?: AuthnClient;
  selectSigner: (key: string) => void;
  createSigner: (name: string) => Promise<void>;
}

const context = createContext<PasskeyContextI>({
  signers: {},
  selectSigner: () => {},
  createSigner: async () => {},
});

export const fetchSigners = (): Record<string, AuthnWebSigner> => {
  const stored: Record<string, Stored> = JSON.parse(
    localStorage.getItem(STORE_KEY) || "{}"
  );
  return Object.entries(stored).reduce(
    (a, [k, v]) => ({
      ...a,
      [k]: new AuthnWebSigner(v.credential, v.name),
    }),
    {}
  );
};

export const storeSigner = (signer: AuthnWebSigner) => {
  localStorage.setItem(
    STORE_KEY,
    JSON.stringify({
      ...fetchSigners(),
      [signer.credential.id]: {
        credential: signer.credential,
        name: signer.name,
      },
    })
  );
};

export const PasskeyContext: FC<PropsWithChildren> = ({
  children,
}) => {
  const [signers, setSigners] = useState(fetchSigners());
  const [selected, setSelected] = useLocalStorage(
    "authn-web-selected",
    ""
  );
  const [{ tmClient }] = useNetwork();

  const createSigner = (name: string) => {
    return AuthnWebSigner.create(
      {
        name: RP_NAME,
        // id:
        //   window.location.hostname === "localhost"
        //     ? "localhost"
        //     : "kujira.network",
      },
      name
    ).then((signer) => {
      storeSigner(signer);
      setSigners((prev) => ({ ...prev, [signer.id()]: signer }));
      setSelected(signer.id());
      return;
    });
  };

  const selectSigner = (id: string) => {
    setSelected(id);
    // if (!tmClient) throw new Error(`No Network`);
    // const stored = signers[id];
    // if (!stored) throw new Error(`No Passkey for ID ${id}`);
    // AuthnClient.createWithSigner(tmClient, stored, {
    //   gasPrice: GasPrice.fromString("0.034ukuji"),
    // });
  };
  return (
    <context.Provider
      value={{
        signers,
        createSigner,
        selectSigner,
        signer: selected ? signers[selected] : undefined,
      }}>
      {children}
    </context.Provider>
  );
};

export const usePasskeys = () => useContext(context);
