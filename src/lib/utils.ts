export function getSessionId(): string {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem('shaadi_session_id');
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('shaadi_session_id', id);
    }
    return id;
}

export function formatPrice(price: number): string {
    return `₹${price.toLocaleString('en-IN')}`;
}
