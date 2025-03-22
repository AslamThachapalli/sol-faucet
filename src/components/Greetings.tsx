export function Greetings() {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-4xl text-on-primary font-bold uppercase">Solana Faucet <span className="font-normal text-sm">Devnet</span></p>
            <p className="text-xl font-bold text-red-400">This tool does NOT give real SOL or Solana tokens.</p>
        </div>
    );
}
