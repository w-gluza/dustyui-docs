import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <Icon>
      <path d="M12 3c.6 4.2 2.8 6.4 9 9-6.2 2.6-8.4 4.8-9 9-.6-4.2-2.8-6.4-9-9 6.2-2.6 8.4-4.8 9-9Z" />
    </Icon>
  );
}

export function StarIcon() {
  return (
    <Icon>
      <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8Z" />
    </Icon>
  );
}

export function DotIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function ArchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path
        style={{ fill: "var(--dusty-illustration-primary)" }}
        d="M3.5 22V11.5a8.5 8.5 0 0 1 17 0V22h-5V11.5a3.5 3.5 0 0 0-7 0V22Z"
      />
      <circle
        style={{ fill: "var(--dusty-illustration-highlight)" }}
        cx="12"
        cy="10.5"
        r="3"
      />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 3.5v13l10.5-6.5z" />
    </svg>
  );
}

export function PauseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5 3.5h3.5v13H5zM11.5 3.5H15v13h-3.5z" />
    </svg>
  );
}

export function MinusIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 10h12" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 10h12M10 4v12" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 14 14 6M7.5 6H14v6.5" />
    </svg>
  );
}

function LineIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <LineIcon path="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zM10 6v4.25H6.5" />
  );
}

export function CalendarIcon() {
  return (
    <LineIcon path="M3.5 5h13v11.5h-13zM3.5 8.5h13M7 3v3M13 3v3M7 11.5h.01M10 11.5h.01M13 11.5h.01M7 14h.01M10 14h.01" />
  );
}

export function HistoryIcon() {
  return (
    <LineIcon path="M3.2 10a6.8 6.8 0 1 0 2-4.8L3 7.4M3 3.5v3.9h3.9M10 6.5V10l2.5 1.5" />
  );
}

export function WaveformIcon() {
  return <LineIcon path="M3 8.5v3M6.5 5.5v9M10 3v14M13.5 5.5v9M17 8.5v3" />;
}

export function HourglassIcon() {
  return (
    <LineIcon path="M5.5 3h9M5.5 17h9M6.5 3c0 4 3.5 4.5 3.5 7s-3.5 3-3.5 7M13.5 3c0 4-3.5 4.5-3.5 7s3.5 3 3.5 7" />
  );
}
