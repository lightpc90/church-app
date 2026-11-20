export const groupedByZone = <T extends { zone: string }>(data: T[] | undefined | null) =>
  (data ?? []).reduce<Record<string, T[]>>((acc, item) => {
    (acc[item.zone] ??= []).push(item);
    return acc;
  }, {});
