import { createFileRoute } from "@tanstack/react-router";
import { SparkApp } from "@/components/daat/spark-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <SparkApp />
    </main>
  );
}
