'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import {
  buildWhatsAppReserveUrl,
  generateReservationTimeSlots,
  getKolkataNowParts,
  validateReserveForm,
  type ReserveFormErrors,
} from '@/lib/hours';
import {
  RevealBlock,
  ScriptOverlapHeading,
} from '@/components/MotionPrimitives';
import TicketButton from '@/components/TicketButton';

export default function ReserveSection() {
  const initialDate = useMemo(() => getKolkataNowParts(new Date()).dateStr, []);
  const [name, setName] = useState('');
  const [date, setDate] = useState(initialDate);
  const [guests, setGuests] = useState('2');

  const timeSlots = useMemo(() => generateReservationTimeSlots(date), [date]);
  const [selectedTime, setSelectedTime] = useState('');
  const activeTime = timeSlots.includes(selectedTime)
    ? selectedTime
    : (timeSlots.find((slot) => slot === '7:30 PM') ?? timeSlots[0] ?? '');

  const [errors, setErrors] = useState<ReserveFormErrors>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

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
      return;
    }

    const whatsappUrl = buildWhatsAppReserveUrl(values);
    setSubmittedUrl(whatsappUrl);
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
              script="Book your table"
              title="RESERVE A TABLE"
              align="left"
            />
            <RevealBlock delay={0.08} className="mt-5">
              <p className="text-[16px] leading-relaxed text-[#46423D] max-w-[38ch]">
                Send your request directly on WhatsApp, or call us to reserve a
                table at our Model Town dining room.
              </p>
            </RevealBlock>
          </div>

          <RevealBlock delay={0.08} className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="reserve-name"
                    className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0B0A09] mb-2"
                  >
                    Name
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
                    placeholder="Your name"
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
                    Guests
                  </label>
                  <input
                    id="reserve-guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={30}
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

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <TicketButton type="submit" variant="ink">
                  Reserve on WhatsApp
                </TicketButton>

                <a
                  href={siteConfig.phone.href}
                  className="inline-flex items-center justify-center gap-2 rounded-none border border-[#0B0A09] bg-[#FFFFFF] px-7 py-3.5 text-[14px] font-semibold tabular-nums tracking-[0.03em] text-[#0B0A09] transition-colors duration-200 hover:bg-[#0B0A09] hover:text-[#FFFFFF]"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Call {siteConfig.phone.display}</span>
                </a>
              </div>

              {submittedUrl && (
                <div
                  data-testid="whatsapp-reserve-ready"
                  className="border border-[#0B0A09] bg-[#FAF7F2] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <p className="text-[15px] font-medium text-[#0B0A09] tabular-nums">
                    Table for {guests} on {date} at {activeTime} under{' '}
                    {name.trim()}.
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
                </div>
              )}
            </form>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
