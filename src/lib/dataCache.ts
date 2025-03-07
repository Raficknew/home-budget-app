type CACHE_TAG = "users" | "houseHolds";

export function getGlobalTag(tag: CACHE_TAG) {
  return `global${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string) {
  return `id${id}-${tag}` as const;
}

export function getUserTag(tag: CACHE_TAG, userId: string) {
  return `user${userId}-${tag}` as const;
}
export function getHouseHoldTag(tag: CACHE_TAG, houseHoldId: string) {
  return `user:${houseHoldId}-${tag}` as const;
}
