import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface CryptographyAnimationProps {
    text: string;
    className?: string;
}

const CryptographyAnimation: React.FC<CryptographyAnimationProps> = ({ text, className }) => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const element = textRef.current;
        const animateText = () => {
            let iterations = 0;
            const originalText = element.dataset.value || "";

            const interval = setInterval(() => {
                element.innerText = originalText.split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    setTimeout(animateText, Math.max(20000, originalText.length * 30)); // Animation time
                }

                iterations += 1 / 3;
            }, 5);
        };

        animateText();
    }, [text]);

    return (
        <div className={clsx('', className)}>
            <div ref={textRef} data-value={text}>
                {text}
            </div>
        </div>
    );
};

export default CryptographyAnimation;
