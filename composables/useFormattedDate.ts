import { useDateFormat } from '@vueuse/core';

export function useFormattedDate(date: Date) {
  return useDateFormat(date, 'D MMM YYYY, H:mm:ss').value;
}
