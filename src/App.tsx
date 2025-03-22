import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { Airdrop } from "./components/Airdrop";
import { Greetings } from "./components/Greetings";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import "./index.css";
import { Attribution } from "./components/Attribution";

function App() {
    return (
        <div className="bg-primary">
            <ConnectionProvider
                endpoint={`https://solana-devnet.g.alchemy.com/v2/${
                    import.meta.env.VITE_ALCHEMY_API_KEY
                }`}
            >
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <div className="flex flex-col items-center justify-center h-screen gap-4 max-w-2xl mx-auto">
                            <Greetings />
                            <div className="flex flex-row items-center justify-center gap-4">
                                <WalletMultiButton />
                                <WalletDisconnectButton />
                            </div>
                            <Airdrop />
                            <Attribution />
                        </div>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
}

export default App;
