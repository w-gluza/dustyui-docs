import { Button, List, ListItem } from "dustyui";
import { SnareArtwork } from "./SnareArtwork";
import styles from "./Routine.module.css";

const ROUTINE = {
  name: "Quick Warm-up",
  level: 1,
  exercises: [
    { name: "Single Stroke Roll", minutes: 3, rounds: 2, bpm: 70 },
    { name: "Double Stroke Roll", minutes: 3, rounds: 2, bpm: 60 },
    { name: "Paradiddle", minutes: 4, rounds: 3, bpm: 80 },
  ],
};

const totalMinutes = ROUTINE.exercises.reduce(
  (sum, exercise) => sum + exercise.minutes,
  0,
);

export function Routine() {
  return (
    <section className={styles.routine} aria-labelledby="routine-title">
      <p className={styles.overline}>Current routine</p>
      <header className={styles.header}>
        <h2 id="routine-title" className={styles.title}>
          {ROUTINE.name}
        </h2>
        <span className={styles.meta}>
          {totalMinutes} min · Lvl {ROUTINE.level}
        </span>
      </header>
      <List
        variant="contained"
        className={styles.list}
        aria-label={`${ROUTINE.name} exercises`}
      >
        {ROUTINE.exercises.map((exercise, index) => (
          <ListItem
            key={exercise.name}
            leading={
              <span className={styles.step}>
                {String(index + 1).padStart(2, "0")}
              </span>
            }
            overline={`${String(exercise.minutes)} min · ${String(exercise.rounds)} rounds`}
            title={exercise.name}
            description={`${String(exercise.bpm)} BPM`}
            trailing={
              <span className={styles.thumbnail}>
                <SnareArtwork />
              </span>
            }
          />
        ))}
      </List>
      <div className={styles.actions}>
        <Button shape="pill" size="large">
          Start practice
        </Button>
        <Button variant="plain">Saved routines</Button>
      </div>
    </section>
  );
}
