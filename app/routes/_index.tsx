import type { MetaFunction } from "@remix-run/node";
import { unstable_defineLoader as defineLoader } from "@remix-run/node";

import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getPokemon } from "../api";
import { ResultsTable } from "../components/ResultsTable";
import { ResultsTableSkeleton } from "../components/ResultsTableSkeleton";

export const meta: MetaFunction = () => {
  return [
    { title: "Pokémix" },
    { name: "description", content: "A Pokémon remix app" },
  ];
};

export const loader = defineLoader(async () => {
  return {
    pokemon: getPokemon(),
  };
});

export default function Index() {
  const { pokemon } = useLoaderData<typeof loader>();
  return (
    <div className="p-8">
      <Suspense fallback={<ResultsTableSkeleton />}>
        <Await resolve={pokemon}>{<ResultsTable />}</Await>
      </Suspense>
    </div>
  );
}
