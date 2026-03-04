interface DebateResponseProps {
    response: string;
}

export function DebateResponse({ response }: DebateResponseProps) {
    return (
        <div className="mt-8 p-6 bg-neutral-100 rounded-xl">
            <h2 className="text-body-18-medium text-neutral-700 mb-2">
                Resposta da IA
            </h2>
            <p className="text-body-16-medium text-neutral-600 whitespace-pre-wrap">
                {response}
            </p>
        </div>
    );
}