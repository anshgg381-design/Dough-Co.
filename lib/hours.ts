import { siteConfig, type HoursWindow } from '@/data/siteConfig';

export interface LiveOpenStatus {
  isOpen: boolean;
  label: string;
  todayGroup: 'weekday' | 'weekend';
  todayWindow: HoursWindow;
}

export interface KolkataTimeParts {
  weekday: string;
  hour: number;
  minute: number;
  dateStr: string;
}

const WEEKEND_DAYS = new Set(['Fri', 'Sat', 'Sun']);

export function getKolkataNowParts(now: Date = new Date()): KolkataTimeParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: siteConfig.hours.timeZone,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const lookup = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';

  const weekday = lookup('weekday');
  const rawHour = Number.parseInt(lookup('hour'), 10);
  const hour = rawHour === 24 ? 0 : rawHour;
  const minute = Number.parseInt(lookup('minute'), 10);
  const dateStr = `${lookup('year')}-${lookup('month')}-${lookup('day')}`;

  return { weekday, hour, minute, dateStr };
}

export function getScheduleWindowForWeekday(weekday: string): HoursWindow {
  const isWeekend = WEEKEND_DAYS.has(weekday);
  const id = isWeekend ? 'weekend' : 'weekday';
  return (
    siteConfig.hours.schedule.find((row) => row.id === id) ??
    siteConfig.hours.schedule[0]
  );
}

export function getLiveOpenStatus(now: Date = new Date()): LiveOpenStatus {
  const { weekday, hour, minute } = getKolkataNowParts(now);
  const todayWindow = getScheduleWindowForWeekday(weekday);
  const currentMinutes = hour * 60 + minute;
  const openMinutes = todayWindow.openHour * 60 + todayWindow.openMinute;
  const closeMinutes = todayWindow.closeHour * 60 + todayWindow.closeMinute;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  const label = isOpen
    ? `Open now · until ${todayWindow.closeDisplay}`
    : `Closed · opens at ${todayWindow.openDisplay}`;

  return {
    isOpen,
    label,
    todayGroup: todayWindow.id,
    todayWindow,
  };
}

export function formatMinutes12Hour(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

export function getWeekdayForIsoDate(dateStr: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return 'Mon';
  const year = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const day = Number.parseInt(match[3], 10);
  // Noon UTC guarantees the calendar date matches Asia/Kolkata
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return new Intl.DateTimeFormat('en-US', {
    timeZone: siteConfig.hours.timeZone,
    weekday: 'short',
  }).format(date);
}

/**
 * Generates 30-minute reservation time slots from siteConfig.hours.
 * The last slot is always at least 60 minutes before closing:
 * - Mon–Thu (closes 11:00 PM): last slot 10:00 PM
 * - Fri–Sun (closes 12:00 AM): last slot 11:00 PM
 */
export function generateReservationTimeSlots(dateStr: string): string[] {
  const weekday = getWeekdayForIsoDate(dateStr);
  const window = getScheduleWindowForWeekday(weekday);
  const startMinutes = window.openHour * 60 + window.openMinute;
  const lastSlotMinutes = window.closeHour * 60 + window.closeMinute - 60;

  const slots: string[] = [];
  for (let m = startMinutes; m <= lastSlotMinutes; m += 30) {
    slots.push(formatMinutes12Hour(m));
  }
  return slots;
}

export interface ReserveFormValues {
  name: string;
  date: string;
  time: string;
  guests: string;
}

export interface ReserveFormErrors {
  name?: string;
  date?: string;
  time?: string;
  guests?: string;
}

export function validateReserveForm(values: ReserveFormValues): ReserveFormErrors {
  const errors: ReserveFormErrors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Enter your name.';
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
    errors.date = 'Choose a date.';
  }

  const validSlots = values.date ? generateReservationTimeSlots(values.date) : [];
  if (!values.time || (validSlots.length > 0 && !validSlots.includes(values.time))) {
    errors.time = 'Select an available time.';
  }

  const guestCount = Number.parseInt(values.guests, 10);
  if (!Number.isFinite(guestCount) || guestCount < 1 || guestCount > 30) {
    errors.guests = 'Enter number of guests.';
  }

  return errors;
}

export function buildWhatsAppReserveUrl(values: ReserveFormValues): string {
  const message = [
    `Hi ${siteConfig.name}, I would like to reserve a table.`,
    `Name: ${values.name.trim()}`,
    `Date: ${values.date}`,
    `Time: ${values.time}`,
    `Guests: ${values.guests}`,
  ].join('\n');

  return `https://wa.me/${siteConfig.phone.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
