export const nextSearchTimestamp = (timestamp: string): number =>
  new Date(timestamp).getTime() + 30 * 60 * 1000
