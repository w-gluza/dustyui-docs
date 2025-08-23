import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Dusty UI Landing Page</h1>
      <Link href="/storybook">
        <button>View Components</button>
      </Link>
    </div>
  );
}
