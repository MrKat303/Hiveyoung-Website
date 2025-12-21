export const isValidEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const isValidPhone = (phone: string): boolean => {
    // Allow numbers and +
    const re = /^\+?[\d\s-]{7,15}$/;
    return re.test(phone);
};
