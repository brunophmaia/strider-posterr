const MILISSECOND = 1;
const SECOND = 1000 * MILISSECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function getPostDateString(postDatetime: Date): string {
    const now = new Date();
    postDatetime = new Date(postDatetime);

    const getFullDate = (includesYear: boolean = false) => {
        const month = postDatetime.toLocaleString('default', { month: 'long' });
        return `${month.substring(0, 3)} ${postDatetime.getDate()}${includesYear ? (`, ${postDatetime.getFullYear()}`) : ""}`;
    };

    const diff = now.getTime() - new Date(postDatetime).getTime();

    if(now.getFullYear() != postDatetime.getFullYear()) {
        return getFullDate(true);
    }
    else if (diff < MINUTE) {
        return `${Math.round(diff / SECOND)}s`;
    }
    else if (diff < HOUR) {
        return `${Math.round(diff / MINUTE)}m`;
    }
    else if (diff < DAY) {
        return `${Math.round(diff / HOUR)}h`;
    }
    else {
        return getFullDate();
    }
}