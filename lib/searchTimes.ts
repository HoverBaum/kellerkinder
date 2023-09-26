export const nextSearchTimestamp = (timestamp: string): number =>
  new Date(timestamp).getTime() + 31 * 60 * 1000
