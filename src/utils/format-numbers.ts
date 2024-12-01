export const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  export function formatLargeNumber(number: number = 0) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + 'B';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + 'M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
  }

  export function createArray(number: number) {
    return Array.from({ length: number - 1 }, (_, index) => index + 1);
}

export function formatDuration(minutes: number) {
    // Get the whole number of hours
    const hours = Math.floor(minutes / 60);
    // Get the remaining minutes
    const remainingMinutes = Math.round(minutes % 60);

    // Build the user-friendly string
    let formattedDuration = '';
    
    if (hours > 0) {
        formattedDuration += `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    if (remainingMinutes > 0) {
        if (formattedDuration) {
            formattedDuration += ' and ';
        }
        formattedDuration += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }

    // If no hours or minutes, display 'less than a minute'
    if (formattedDuration === '') {
        formattedDuration =  '< minute';
    }

    return formattedDuration;
}


export const formatBytes = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  };