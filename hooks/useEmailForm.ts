import { useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

interface UseEmailFormOptions {
    validate?: () => boolean;
}

export const useEmailForm = (templateId: string, options: UseEmailFormOptions = {}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const sendEmail = async (e: FormEvent) => {
        e.preventDefault();

        if (options.validate && !options.validate()) {
            return;
        }

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateIdFinal = templateId; // already passed as arg
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !publicKey || !formRef.current) {
            if (!serviceId || !publicKey) {
                console.error('EmailJS is not configured.');
            }
            setStatus('error');
            return;
        }

        setIsSending(true);
        setStatus('idle');

        try {
            await emailjs.sendForm(
                serviceId,
                templateIdFinal,
                formRef.current,
                publicKey
            );

            setStatus('success');
            formRef.current.reset();
        } catch (error) {
            console.error('Email error:', error);
            setStatus('error');
        } finally {
            setIsSending(false);
        }
    };

    return { formRef, isSending, status, sendEmail };
};
