'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { ArrowUpRight, Phone, Users } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/data/siteConfig';
import {
  buildWhatsAppGroupUrl,
  buildWhatsAppReserveUrl,
  generateReservationTimeSlots,
  getKolkataNowParts,
  GROUP_OCCASIONS,
  validateGroupBookingForm,
  validateReserveForm,
  type GroupBookingErrors,
  type GroupOccasion,
  type ReserveFormErrors,
} from '@/lib/hours';
import {
  EDITORIAL_EASE,
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';
import TicketButton from '@/components/TicketButton';

type BookingMode = 'table' | 'group';

export default function ReserveSection() {
  const initialDate = useMemo(() => getKolkataNowParts(new Date()).dateStr, []);
  const prefersReduced = useReducedMotion();

  const [mode, setMode] = useState<BookingMode>('table');
  const [name, setName] = useState('');
  const [date, setDate] = useState(initialDate);
  const [guests, setGuests] = useState('2');
  const [occasion, setOccasion] = useState<GroupOccasion>('Birthday');
  const [notes, setNotes] = useState('');

  const timeSlots = useMemo(() => generateReservationTimeSlots(date), [date]);
  const [selectedTime, setSelectedTime] = useState('');
  const activeTime = timeSlots.includes(selectedTime)
    ? selectedTime
    : (timeSlots.find((slot) => slot === '7:30 PM') ?? timeSlots[0] ?? '');

  const [errors, setErrors] = useState<ReserveFormErrors | GroupBookingErrors>(
    {}
  );
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);

  const switchMode = (nextMode: BookingMode) => {
    setMode(nextMode);
    setErrors({});
    setSubmittedUrl(null);
    setSubmittedSummary(null);
    if (nextMode === 'group') {
      const currentCount = Number.parseInt(guests, 10);
      if (!Number.isFinite(currentCount) || currentCount < 6) {
        setGuests('12');
      }
    } else {
      const currentCount = Number.parseInt(guests, 10);
      if (!Number.isFinite(currentCount) || currentCount > 30) {
        setGuests('4');
      } else if (currentCount === 12) {
        setGuests('2');
      }
    }
  };

  const handleDateChange = (nextDate: string) => {
    setDate(nextDate);
    setSubmittedUrl(null);
    const nextSlots = generateReservationTimeSlots(nextDate);
    if (selectedTime && !nextSlots.includes(selectedTime)) {
      setSelectedTime(nextSlots[nextSlots.length - 1] ?? '');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === 'table') {
      const values = {
        name,
        date,
        time: activeTime,
        guests,
      };
      const nextErrors = validateReserveForm(values);
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        setSubmittedUrl(null);
        setSubmittedSummary(null);
        return;
      }

      setSubmittedUrl(buildWhatsAppReserveUrl(values));
      setSubmittedSummary(
        `Table for ${guests} on ${date} at ${activeTime} under ${name.trim()}.`
      );
      return;
    }

    const groupValues = {
      name,
      date,
      time: activeTime,
      guests,
      occasion,
      notes,
    };
    const nextErrors = validateGroupBookingForm(groupValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmittedUrl(null);
      setSubmittedSummary(null);
      return;
    }

    setSubmittedUrl(buildWhatsAppGroupUrl(groupValues));
    setSubmittedSummary(
      `${occasion} inquiry for ${guests} guests on ${date} at ${activeTime} hosted by ${name.trim()}.`
    );
  };

  return (
    <section
      id="reserve"
      aria-labelledby="reserve-heading"
      className="border-t border-[#0B0A09] bg-[#FFFFFF] py-[80px] lg:py-[124px] scroll-mt-[84px]"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <ScriptOverlapHeading
              id="reserve-heading"
              script={mode === 'group' ? 'Celebrate together' : 'Book your table'}
              title={mode === 'group' ? 'GROUP & PARTY' : 'RESERVE A TABLE'}
              align="left"
            />
            <RevealBlock delay={0.06} className="mt-5 space-y-4">
              <p className="text-[16px] leading-relaxed text-[#46423D] max-w-[38ch]">
                {mode === 'group'
                  ? 'Planning a birthday table, family dinner or friends reunion in Model Town? Send your headcount and menu notes directly on WhatsApp.'
                  : 'Send your request directly on WhatsApp, or call us to reserve a table at our Model Town dining room.'}
              </p>

              {/* Sharp architectural mode switcher with sliding ink fill */}
              <div
                role="tablist"
                aria-label="Booking type"
                className="relative inline-grid grid-cols-2 border border-[#0B0A09] divide-x divide-[#0B0A09] bg-[#FAF7F2]"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'table'}
                  data-testid="booking-mode-table"
                  onClick={() => switchMode('table')}
                  className={`relative px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                    mode === 'table'
                      ? 'text-[#FFFFFF]'
                      : 'text-[#0B0A09] hover:bg-[#FFFFFF]'
                  }`}
                >
                  {mode === 'table' && (
                    <motion.span
                      layoutId="booking-mode-bg"
                      transition={{
                        duration: prefersReduced ? 0 : 0.24,
                        ease: EDITORIAL_EASE,
                      }}
                      className="absolute inset-0 bg-[#0B0A09]"
                    />
                  )}
                  <span className="relative z-10">Table booking</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'group'}
                  data-testid="booking-mode-group"
                  onClick={() => switchMode('group')}
                  className={`relative inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                    mode === 'group'
                      ? 'text-[#FFFFFF]'
                      : 'text-[#0B0A09] hover:bg-[#FFFFFF]'
                  }`}
                >
                  {mode === 'group' && (
                    <motion.span
                      layoutId="booking-mode-bg"
                      transition={{
                        duration: prefersReduced ? 0 : 0.24,
                        ease: EDITORIAL_EASE,
                      }}
                      className="absolute inset-0 bg-[#0B0A09]"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Group &amp; Party</span>
                  </span>
                </button>
              </div>
            </RevealBlock>
          </div>

          <RevealBlock delay={0.06} className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <AnimatePresence initial={false}>
                {mode === 'group' && (
                  <motion.div
                    key="group-occasions"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                  >
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0A09] mb-2.5">
                      Occasion
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {GROUP_OCCASIONS.map((item) => {
                        const active = occasion === item;
                        return (
                          <motion.button
                            key={item}
                            type="button"
                            aria-pressed={active}
                            whileTap={prefersReduced ? undefined : { scale: 0.96 }}
                            onClick={() => {
                              setOccasion(item);
                              setSubmittedUrl(null);
                            }}
                            className={`rounded-none border px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] transition-colors duration-150 ${
                              active
                                ? 'border-[#0B0A09] bg-[#F5C300] text-[#0B0A09]'
                                : 'border-[#0B0A09]/40 bg-[#FAF7F2] text-[#0B0A09] hover:border-[#0B0A09] hover:bg-[#FFFFFF]'
                            }`}
                          >
                            {item}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="reserve-name"
                    className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0A09] mb-2"
                  >
                    {mode === 'group' ? 'Host Name' : 'Name'}
                  </label>
                  <input
                    id="reserve-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setSubmittedUrl(null);
                    }}
                    placeholder={
                      mode === 'group' ? 'Organizer name' : 'Your name'
                    }
                    aria-invalid={Boolean(errors.name)}
                    className="w-full rounded-none border border-[#0B0A09] bg-[#FAF7F2] px-4 py-3.5 text-[15px] text-[#0B0A09] placeholder:text-[#6B655D] transition-colors focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#D99B00]"
                  />
                  {errors.name && (
                    <p
                      role="alert"
                      className="mt-1.5 text-[13px] font-medium text-[#B93124]"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="reserve-guests"
                    className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0A09] mb-2"
                  >
                    {mode === 'group' ? 'Party Size (6–60)' : 'Guests'}
                  </label>
                  <input
                    id="reserve-guests"
                    name="guests"
                    type="number"
                    min={mode === 'group' ? 6 : 1}
                    max={mode === 'group' ? 60 : 30}
                    required
                    value={guests}
                    onChange={(e) => {
                      setGuests(e.target.value);
                      setSubmittedUrl(null);
                    }}
                    aria-invalid={Boolean(errors.guests)}
                    className="w-full rounded-none border border-[#0B0A09] bg-[#FAF7F2] px-4 py-3.5 text-[15px] tabular-nums text-[#0B0A09] transition-colors focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#D99B00]"
                  />
                  {errors.guests && (
                    <p
                      role="alert"
                      className="mt-1.5 text-[13px] font-medium text-[#B93124]"
                    >
                      {errors.guests}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="reserve-date"
                    className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0A09] mb-2"
                  >
                    Date
                  </label>
                  <input
                    id="reserve-date"
                    name="date"
                    type="date"
                    min={initialDate}
                    required
                    value={date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    className="w-full rounded-none border border-[#0B0A09] bg-[#FAF7F2] px-4 py-3.5 text-[15px] tabular-nums text-[#0B0A09] transition-colors focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#D99B00]"
                  />
                  {errors.date && (
                    <p
                      role="alert"
                      className="mt-1.5 text-[13px] font-medium text-[#B93124]"
                    >
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="reserve-time"
                    className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0A09] mb-2"
                  >
                    Time
                  </label>
                  <select
                    id="reserve-time"
                    name="time"
                    value={activeTime}
                    onChange={(e) => {
                      setSelectedTime(e.target.value);
                      setSubmittedUrl(null);
                    }}
                    aria-invalid={Boolean(errors.time)}
                    className="w-full rounded-none border border-[#0B0A09] bg-[#FAF7F2] px-4 py-3.5 text-[15px] tabular-nums text-[#0B0A09] transition-colors focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#D99B00]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p
                      role="alert"
                      className="mt-1.5 text-[13px] font-medium text-[#B93124]"
                    >
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {mode === 'group' && (
                  <motion.div
                    key="group-notes"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                  >
                    <label
                      htmlFor="reserve-notes"
                      className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0A09] mb-2"
                    >
                      Menu &amp; Seating Notes (Optional)
                    </label>
                    <textarea
                      id="reserve-notes"
                      name="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => {
                        setNotes(e.target.value);
                        setSubmittedUrl(null);
                      }}
                      placeholder="e.g. Veg-only spread, pre-ordered Half & Half pizzas, cake table..."
                      className="w-full rounded-none border border-[#0B0A09] bg-[#FAF7F2] px-4 py-3 text-[15px] text-[#0B0A09] placeholder:text-[#6B655D] transition-colors focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#D99B00]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <TicketButton type="submit" variant="ink">
                  {mode === 'group'
                    ? 'Send party inquiry on WhatsApp'
                    : 'Reserve on WhatsApp'}
                </TicketButton>

                <a
                  href={siteConfig.phone.href}
                  className="inline-flex items-center justify-center gap-2 rounded-none border border-[#0B0A09] bg-[#FFFFFF] px-7 py-3.5 text-[14px] font-semibold tabular-nums tracking-[0.03em] text-[#0B0A09] transition-colors duration-200 hover:bg-[#0B0A09] hover:text-[#FFFFFF]"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Call {siteConfig.phone.display}</span>
                </a>
              </div>

              <AnimatePresence>
                {submittedUrl && submittedSummary && (
                  <motion.div
                    key="whatsapp-ready"
                    data-testid="whatsapp-reserve-ready"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.32, ease: EDITORIAL_EASE }}
                    className="border border-[#0B0A09] bg-[#FAF7F2] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <p className="text-[15px] font-medium text-[#0B0A09] tabular-nums">
                      {submittedSummary}
                    </p>
                    <a
                      href={submittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-[#0B0A09] underline underline-offset-4 hover:text-[#8C6200] shrink-0"
                    >
                      <span>Open WhatsApp message</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
