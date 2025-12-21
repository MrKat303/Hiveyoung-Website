export const isValidEmail = (email: string): boolean => {
    // Validación más estricta para evitar dominios extraños
    // Permite .com, .cl, .org, .co, .net, .edu, .gov, .io, .me, etc.
    const re = /^[^\s@]+@[^\s@]+\.(com|cl|org|co|net|edu|gov|io|me|info|biz)$/i;
    return re.test(email);
};

export const isValidPhone = (phone: string): boolean => {
    // Allow numbers and +
    const re = /^\+?[\d\s-]{7,15}$/;
    return re.test(phone);
};
