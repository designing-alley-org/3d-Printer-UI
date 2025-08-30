/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed
 * since the last time the debounced function was invoked.
 * 
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the original function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    return function(this: any, ...args: Parameters<T>): void {
        const context = this;
        
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            func.apply(context, args);
            timeoutId = null;
        }, wait);
    };
}


/**
 * Converts a date into a human-readable format
 * 
 * @param date The date to format (Date object, timestamp, or date string)
 * @param includeTime Whether to include the time in the formatted output
 * @returns A formatted date string
 */
export function formatDate(date: Date | number | string, includeTime: boolean = false): string {
    try {
        const dateObj = new Date(date);
        
        if (isNaN(dateObj.getTime())) {
            return 'Invalid date';
        }
        
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        
        if (includeTime) {
            options.hour = '2-digit';
            options.minute = '2-digit';
        }
        
        return dateObj.toLocaleDateString('en-US', options);
    } catch (error) {
        return 'Invalid date';
    }
}

/**
 * Converts text by replacing underscores with spaces and capitalizing the first letter
 * 
 * @param text The text to convert (with underscores)
 * @returns Formatted text with spaces instead of underscores and first letter capitalized
 */
export function formatText(text: string): string {
    if (!text) return '';
    
    // Replace underscores with spaces
    const withSpaces = text.replace(/_/g, ' ');
    
    // Capitalize the first letter
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}