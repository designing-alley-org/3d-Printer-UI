    /**
     * Validates a password string.
     * Checks if the password is at least 6 characters long, contains at least one number,
     * and contains at least one special character. If the password does not meet any of
     * these requirements, sets an error message using the provided `setErr` function.
     * @param {string} password - The password string to be validated.
     * @param {React.Dispatch<React.SetStateAction<string>>} setErr - The function to set an error message.
     * @returns {boolean} Whether the password is valid or not.
     */
const validatePassword = (password: string, setErr: React.Dispatch<React.SetStateAction<string>>): boolean => {
        const minLength = 6;
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (password.length < minLength) {
            setErr(`Password must be at least ${minLength} characters long`);
            return false;
        }
        if (!hasNumber) {
            setErr('Password must contain at least one number');
            return false;
        }
        if (!hasSpecial) {
            setErr('Password must contain at least one special character');
            return false;
        }
        return true;
    };


/**
 * Formats a date string into a human-readable format.
 * Converts the input date string to a Date object and formats it using
 * the 'en-US' locale, displaying the year, month, day, hour, and minute.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} The formatted date string.
 */

    const formatDateTime = (dateString: string): string => {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(dateString));
      };

    /**
     * Formats an order status string into a human-readable format.
     * Replaces any underscores with spaces and capitalizes the first character of the string.
     * @param {string} status - The order status string to be formatted.
     * @returns {string} The formatted order status string.
     */
      const formatOrderStatus = (status: string): string => {
        return status
          .replace(/_/g, " ")
          .replace(/^./, (match) => match.toUpperCase());
      };
    






    export { validatePassword, formatDateTime, formatOrderStatus };