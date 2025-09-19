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
 * Formats a timestamp for chat messages in a relative, human-readable format
 * 
 * @param date The date to format (Date object, timestamp, or date string)
 * @returns A formatted string representing the relative time (e.g., "Just now", "5 mins ago", "Yesterday", etc.)
 */
export function formatChatTime(date: Date | number | string): string {
  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    
    // Just now (less than a minute ago)
    if (diffMinutes < 1) {
      return 'Just now';
    }
    
    // Minutes ago (less than an hour)
    if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? 'min' : 'mins'} ago`;
    }
    
    // Hours ago (less than 6 hours)
    if (diffHours < 6) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    // Check if it's today
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    if (dateObj >= today) {
      return 'Today';
    }
    
    // Check if it's yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateObj >= yesterday) {
      return 'Yesterday';
    }
    
    // For older messages, show the date and time
    return formatDate(dateObj, true);
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


export const returnResponse = (response: any) => {
  if (response?.data?.data) {
    return response.data.data;
  } else {
    return response?.data;
  }
};

export const returnError = (error: any) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  } else if (error?.message) {
    return error.message;
  } else {
    return 'An unexpected error occurred';
  }
};


/**
 * Extracts the S3 key from a URL by taking the last two segments
 * 
 * @param url The S3 URL to extract the key from
 * @returns The extracted S3 key
 */
export const returnS3Key = (url: string): string => {
  const parts = url.split("/");
  const key = parts.slice(-2).join("/");
  return key;
};





// --- Helper for formatting currency ---

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};




