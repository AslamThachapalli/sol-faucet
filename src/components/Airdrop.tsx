import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { Balance } from "./Balance";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    const [formData, setFormData] = useState({
        publicKey: "",
        amount: 1,
    });
    const [showBalance, setShowBalance] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (wallet.publicKey) {
            setFormData((prev) => ({
                ...prev,
                publicKey: wallet.publicKey!.toBase58(),
            }));
            setShowBalance(true);
        }
    }, [wallet.publicKey]);

    const sentSolViaAirdrop = async () => {
        if (!formData.publicKey || !formData.amount) {
            alert("Public key and amount are required.");
            return;
        }

        const solAmount = formData.amount;
        if (isNaN(solAmount) || solAmount <= 0) {
            alert("Please enter a valid amount of SOL.");
            return;
        }

        let publicKey;
        try {
            publicKey = new PublicKey(formData.publicKey);
            if(!PublicKey.isOnCurve(publicKey.toBytes())) {
                alert("Invalid public key.");
                return;
            }
        } catch (error) {
            alert("Invalid public key.");
            return;
        }

        try {
            setIsLoading(true);
            await connection.requestAirdrop(
                publicKey,
                solAmount * 1000000000
            );

            alert("Airdrop sent successfully.");
            setShowBalance(true);
        } catch (error) {
            console.error(error);
            alert("Failed to send airdrop.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setShowBalance(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex flex-row gap-4 w-full">
                <input
                    name="publicKey"
                    type="text"
                    placeholder="Public Key"
                    value={formData.publicKey}
                    onChange={handleChange}
                    disabled={wallet.publicKey ? true : false}
                    className="flex-[0.9]"
                />
                <input
                    name="amount"
                    type="number"
                    placeholder="Amount (SOL)"
                    value={formData.amount}
                    onChange={handleChange}
                    className="flex-[0.1]"
                />
            </div>
            <button
                onClick={sentSolViaAirdrop}
                className="w-full"
                disabled={isLoading}
            >
                {isLoading ? 'Airdropping...' : 'Airdrop'}
            </button>
            {showBalance && <Balance publicKey={formData.publicKey} />}
        </div>
    );
}
