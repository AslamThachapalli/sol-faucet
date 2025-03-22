import { useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface BalanceProps {
    publicKey: string;
}

export function Balance({ publicKey }: BalanceProps) {
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const getBalance = async () => { 
        if (!publicKey) return;

        try {   
            setIsLoading(true);
            const balance = await connection.getBalance(new PublicKey(publicKey));
            setBalance(balance / 10 ** 9);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBalance();
    }, [publicKey]);

    return (
        <div className="flex items-center justify-center gap-1 w-full">
            <p className="text-lg text-foreground font-bold">Balance:</p>
            <p className="text-lg font-bold text-foreground">{ isLoading ? 'Loading...' : balance} SOL</p>
            <button onClick={getBalance} className="p-1.5 ml-2" disabled={isLoading}><RefreshCw className="w-4 h-4" /></button>
        </div>
    )
}