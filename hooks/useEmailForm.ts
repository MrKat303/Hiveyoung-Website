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

        if (!formRef.current) return;

        setIsSending(true);
        setStatus('idle');

        try {
            await emailjs.sendForm(
                'service_7ir6qmg',
                templateId,
                formRef.current,
                'qft3lkIskRJjHOela'
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
