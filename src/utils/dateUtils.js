export function utcTimestampToDate(timestamp) {
    const date = new Date(timestamp)

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
