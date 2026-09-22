"use client";

import type { DatingCalendar } from "@/data/types";
import { cn } from "@/lib/cn";
import { useStudent } from "@/lib/student-store";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function firstWeekday(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay();
}

function MonthGrid({
  year,
  month,
  invoiceDay,
  paidDay,
  large,
}: {
  year: number;
  month: number;
  invoiceDay?: number;
  paidDay?: number;
  large?: boolean;
}) {
  const dim = daysInMonth(year, month);
  const start = firstWeekday(year, month);
  const cells: (number | null)[] = [...Array(start).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const lo = invoiceDay && paidDay ? Math.min(invoiceDay, paidDay) : undefined;
  const hi = invoiceDay && paidDay ? Math.max(invoiceDay, paidDay) : undefined;

  return (
    <div>
      <p
        className={cn(
          "rounded-t-lg bg-primary text-center font-semibold tracking-[0.14em] text-primary-fg uppercase",
          large ? "px-2 py-2 text-xs sm:text-sm" : "px-1 py-1 text-[9px] sm:text-[10px]",
        )}
      >
        {MONTHS[month - 1]}
      </p>
      <div className="grid grid-cols-7 border-x border-b border-border bg-surface">
        {DOW.map((d, i) => (
          <span
            key={`${d}-${i}`}
            className={cn(
              "text-center font-semibold text-muted",
              large ? "py-1.5 text-[10px] sm:text-xs" : "py-0.5 text-[8px]",
            )}
          >
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          const isInvoice = day != null && day === invoiceDay;
          const isPaid = day != null && day === paidDay;
          const inWindow =
            day != null && lo != null && hi != null && day > lo && day < hi;
          return (
            <span
              key={`${month}-${i}`}
              className={cn(
                "flex items-center justify-center tabular-nums",
                large ? "h-9 text-sm sm:h-10 sm:text-base" : "h-5 text-[10px] sm:h-6 sm:text-[11px]",
                day == null && "bg-surface-2/40",
                inWindow && "bg-accent/15 text-accent",
                isInvoice && "bg-primary font-semibold text-primary-fg",
                isPaid && !isInvoice && "bg-ok font-semibold text-white",
              )}
            >
              {day ?? ""}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function DatingCalendarView(demo: DatingCalendar) {
  const showArabic = useStudent((s) => s.showArabic);
  const daysPassed =
    demo.invoiceDay != null && demo.paidDay != null ? demo.paidDay - demo.invoiceDay : undefined;
  const inside =
    daysPassed != null && demo.discountDays != null ? daysPassed <= demo.discountDays : undefined;

  return (
    <article className="overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-border)]">
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <p className="kicker text-accent">Lecture calendar</p>
        <h3 className="mt-1 font-serif text-xl text-primary sm:text-2xl">{demo.title}</h3>
        {demo.terms ? (
          <p className="math mt-1 text-sm text-muted sm:text-base">{demo.terms}</p>
        ) : null}

        {demo.showYear ? (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {MONTHS.map((_, i) => (
              <MonthGrid
                key={MONTHS[i]}
                year={demo.year}
                month={i + 1}
                invoiceDay={demo.month === i + 1 ? demo.invoiceDay : undefined}
                paidDay={demo.month === i + 1 ? demo.paidDay : undefined}
              />
            ))}
          </div>
        ) : null}

        {demo.month ? (
          <div className={cn(demo.showYear ? "mt-5" : "mt-4")}>
            <MonthGrid
              year={demo.year}
              month={demo.month}
              invoiceDay={demo.invoiceDay}
              paidDay={demo.paidDay}
              large
            />
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-primary-fg">
                Invoice
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-accent">
                Days counted
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ok px-2.5 py-1 text-white">
                Paid
              </span>
            </div>
          </div>
        ) : null}

        {daysPassed != null && demo.invoiceDay != null && demo.paidDay != null ? (
          <div className="mt-4 rounded-2xl bg-surface-2/80 px-4 py-3">
            <p className="math text-lg leading-snug text-fg sm:text-xl">
              days = {demo.paidDay} − {demo.invoiceDay} = {daysPassed}
            </p>
            {demo.discountDays != null ? (
              <p className="math mt-1 text-base text-muted">
                window = {demo.discountDays} days
              </p>
            ) : null}
            {inside != null ? (
              <p
                className={cn(
                  "math mt-2 rounded-xl px-3 py-2 text-base sm:text-lg",
                  inside ? "bg-ok-soft text-ok" : "bg-bad-soft text-bad",
                )}
              >
                {inside
                  ? `${daysPassed} ≤ ${demo.discountDays} — cash discount applies`
                  : `${daysPassed} > ${demo.discountDays} — missed the window, pay the full net`}
              </p>
            ) : null}
          </div>
        ) : null}

        {demo.caption ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{demo.caption}</p>
        ) : null}
        {showArabic && demo.ar ? (
          <p className="ar mt-2 text-sm leading-relaxed text-muted" dir="rtl" lang="ar">
            {demo.ar}
          </p>
        ) : null}
      </div>
    </article>
  );
}
