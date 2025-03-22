import { Coffee } from "lucide-react";

export function Attribution() {
    return (
        <div className="absolute bottom-4 w-full flex items-center justify-center">
            <p className="text-foreground font-semibold">Made with ❤️ and <Coffee className="inline-block w-4 h-4 mb-1 text-amber-950" /> by <a href="https://github.com/AslamThachapalli" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-300">Aslam Thachapalli</a></p>
        </div>
    )
}