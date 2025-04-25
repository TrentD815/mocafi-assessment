export const isCardExpired = (expirationDate: string): boolean => {
    // expirationDate format: "MMYYYY"
    const month = parseInt(expirationDate.substring(0, 2)) - 1; // JS months are 0-based
    const year = parseInt(expirationDate.substring(2));

    const cardExpiration = new Date(year, month, 1);
    // Set to last day of expiration month
    cardExpiration.setMonth(cardExpiration.getMonth() + 1);
    cardExpiration.setDate(0);

    // Set time to end of day
    cardExpiration.setHours(23, 59, 59, 999);

    return new Date() > cardExpiration;
}
