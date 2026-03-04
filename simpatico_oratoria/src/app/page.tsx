"use client";

import { useState } from "react";
import { DebateForm } from "@/components/DebateForm";

interface Message {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
}

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: {
        topic: string;
        context: string;
        difficulty: "easy" | "medium" | "hard";
        argument: string;
    }) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/debate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Erro ao processar o debate");
            }

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    text: result.response,
                    sender: "ai",
                    timestamp: new Date(),
                },
            ]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    text: "Desculpe, ocorreu um erro ao processar seu argumento. Por favor, tente novamente.",
                    sender: "ai",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="w-full max-w-[1232px] mx-auto px-6 py-16">
            {}
            <header className="flex flex-col items-center gap-1 mb-12">
                <h1 className="text-heading-40 text-neutral-700 flex items-center gap-2">
                     SIMPATICO
                <span className="bg-primary-blue text-neutral-000 rounded-lg px-3 py-1 text-heading-24">
                     IA
                </span>
                    </h1>
                    <p className="text-heading-24 text-neutral-500 tracking-wider">
                        ORATORIA
                    </p>
            </header>

            {}
            <DebateForm onSubmit={handleSubmit} isLoading={isLoading} />
            
            {}
        </main>
    );
}