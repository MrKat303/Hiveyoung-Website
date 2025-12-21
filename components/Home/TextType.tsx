"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
    text: string;
    typingSpeed?: number;
    showCursor?: boolean;
    cursorCharacter?: string;
}

const TextType: React.FC<TextTypeProps> = ({
    text,
    typingSpeed = 100,
    showCursor = true,
    cursorCharacter = "|"
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const cursorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                if (text[index] === '<') {
                    const endTag = text.indexOf('>', index);
                    setDisplayedText(text.substring(0, endTag + 1));
                    setIndex(endTag + 1);
                } else {
                    setDisplayedText(text.substring(0, index + 1));
                    setIndex(index + 1);
                }
            }, typingSpeed);
            return () => clearTimeout(timeout);
        }
    }, [index, text, typingSpeed]);

    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: 0.6,
                repeat: -1,
                yoyo: true,
                ease: "steps(1)"
            });
        }
    }, [showCursor]);

    return (
        <span style={{ whiteSpace: 'pre-wrap', display: 'inline' }}>
            <span
                dangerouslySetInnerHTML={{ __html: displayedText }}
                style={{ display: 'inline' }}
            />
            {showCursor && (
                <span
                    ref={cursorRef}
                    style={{
                        display: 'inline-block',
                        marginLeft: '2px',
                        color: '#FFFFFF',
                        fontWeight: 'normal',
                        verticalAlign: 'middle',
                        lineHeight: '1'
                    }}
                >
                    {cursorCharacter}
                </span>
            )}
        </span>
    );
};

export default TextType;
