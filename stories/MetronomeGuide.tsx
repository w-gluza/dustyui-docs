import styles from "./MetronomeGuide.module.css";

const STEPS = [
  {
    name: "Tempo",
    text: "Turn the dial, tap the ring or press plus and minus to set the speed in beats per minute (BPM). 60 is one click a second; 120 is two.",
  },
  {
    name: "Time signature",
    text: "How many beats are counted before the count starts again. 4/4 counts 1, 2, 3, 4 and fits most pop and rock; 3/4 counts 1, 2, 3 like a waltz.",
  },
  {
    name: "Subdivision",
    text: "Extra clicks between the beats, for practising faster notes against a steady count.",
  },
  {
    name: "Beats",
    text: "Each bar is one beat. Press a bar to change it: normal, accented (a louder click, usually on beat one) or skipped (silent).",
  },
  {
    name: "Play",
    text: "Start the click and play or clap along. Begin slowly and raise the tempo a little once it feels easy.",
  },
];

export function MetronomeGuide() {
  return (
    <aside className={styles.guide} aria-labelledby="metronome-guide-title">
      <h2 id="metronome-guide-title" className={styles.title}>
        What is a metronome?
      </h2>
      <p className={styles.lead}>
        A metronome clicks at a steady speed so musicians can practise keeping
        time. This one is built from dustyui components to show how they work
        together.
      </p>
      <dl className={styles.steps}>
        {STEPS.map((step) => (
          <div key={step.name}>
            <dt className={styles.name}>{step.name}</dt>
            <dd className={styles.text}>{step.text}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
