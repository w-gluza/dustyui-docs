import { useState } from "react";
import {
  BarChart,
  Popover,
  ProgressBar,
  RadioGroup,
  StackedProgress,
  StatList,
} from "dustyui";
import {
  CalendarIcon,
  ClockIcon,
  HistoryIcon,
  HourglassIcon,
  WaveformIcon,
} from "./icons";
import styles from "./Insights.module.css";

const WEEK = [
  { label: "M", value: 12, description: "Monday, 12 minutes" },
  { label: "T", value: 25, description: "Tuesday, 25 minutes" },
  { label: "W", value: 0, description: "Wednesday, no practice" },
  { label: "T", value: 18, description: "Thursday, 18 minutes" },
  { label: "F", value: 0, description: "Friday, no practice" },
  { label: "S", value: 0, description: "Saturday, no practice" },
  { label: "S", value: 0, description: "Sunday, no practice" },
];

const TODAY = 3;

const PERIODS = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "all", label: "All time" },
];

const TECHNIQUES = ["Rolls", "Diddles", "Flams", "Drags"];

const BALANCE: Record<string, readonly number[]> = {
  week: [54, 46, 0, 0],
  month: [38, 27, 21, 14],
  all: [31, 29, 24, 16],
};

const ACTIVITY = [
  { label: "Total practice time", value: "4h 12m", icon: <ClockIcon /> },
  { label: "Total sessions", value: 18, icon: <CalendarIcon /> },
  { label: "Last practised", value: "Today", icon: <HistoryIcon /> },
];

const ACHIEVEMENTS = [
  {
    title: "Getting into rhythm",
    description: "Complete 50 practice sessions",
    done: 18,
    goal: 50,
    icon: <WaveformIcon />,
  },
  {
    title: "Dedicated drummer",
    description: "Complete 30 hours of practice",
    done: 4,
    goal: 30,
    icon: <HourglassIcon />,
  },
];

export function Insights() {
  const [period, setPeriod] = useState("month");
  const periodLabel =
    PERIODS.find((option) => option.value === period)?.label ?? "";
  const balance = BALANCE[period] ?? [];

  return (
    <section className={styles.insights} aria-labelledby="insights-title">
      <h2 id="insights-title" className={styles.title}>
        Insights
      </h2>

      <section className={styles.section} aria-labelledby="insights-week">
        <header className={styles.header}>
          <h3 id="insights-week" className={styles.heading}>
            This week
          </h3>
          <span className={styles.aside}>55 min</span>
        </header>
        <BarChart label="Practice this week" bars={WEEK} current={TODAY} />
      </section>

      <section className={styles.section} aria-labelledby="insights-balance">
        <header className={styles.header}>
          <h3 id="insights-balance" className={styles.heading}>
            Technique balance
          </h3>
          <Popover
            trigger={periodLabel}
            triggerLabel={`Period, ${periodLabel}`}
            align="end"
            closeOnSelect
          >
            <RadioGroup
              legend="Period"
              legendHidden
              options={PERIODS}
              value={period}
              onValueChange={setPeriod}
            />
          </Popover>
        </header>
        <StackedProgress
          label="Technique balance"
          size="small"
          legend="grid"
          max={100}
          segments={TECHNIQUES.map((label, index) => ({
            label,
            value: balance[index] ?? 0,
          }))}
        />
      </section>

      <section className={styles.section} aria-labelledby="insights-activity">
        <h3 id="insights-activity" className={styles.heading}>
          Your activity
        </h3>
        <StatList stats={ACTIVITY} />
      </section>

      <section className={styles.section} aria-labelledby="insights-awards">
        <h3 id="insights-awards" className={styles.heading}>
          Achievements
        </h3>
        <ul className={styles.achievements}>
          {ACHIEVEMENTS.map((achievement) => (
            <li key={achievement.title} className={styles.achievement}>
              <span className={styles.tile} aria-hidden="true">
                {achievement.icon}
              </span>
              <div className={styles.body}>
                <p className={styles.name}>
                  {achievement.title}
                  <span className={styles.count} aria-hidden="true">
                    <strong>{achievement.done}</strong>/{achievement.goal}
                  </span>
                </p>
                <p className={styles.description}>{achievement.description}</p>
                <ProgressBar
                  label={achievement.title}
                  size="small"
                  value={achievement.done}
                  max={achievement.goal}
                  valueLabel={`${String(achievement.done)} of ${String(achievement.goal)}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
