import { useEffect, useState } from 'react';

export function useKeyPress(targetKey: string): boolean {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        function handleEvent(event: KeyboardEvent) {
            if (event.key === targetKey) {
                setKeyPressed(true);
            }
        }

        window.addEventListener('keydown', handleEvent);
        return () => {
            window.removeEventListener('keydown', handleEvent);
        };
    }, [targetKey]);

    return keyPressed;
}