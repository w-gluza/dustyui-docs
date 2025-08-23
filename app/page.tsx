import Link from "next/link";
import { Button } from "dustyui";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Dusty UI Landing Page</h1>
      <Link href="/storybook">
        <Button>View Components Test</Button>
      </Link>
    </div>
  );
}
