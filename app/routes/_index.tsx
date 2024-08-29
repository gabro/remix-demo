import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { unstable_defineLoader as defineLoader } from "@remix-run/node";

import { Await, Form, redirect, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getResultsForDate } from "../api";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = defineLoader(async ({ request }) => {
  const url = new URL(request.url);
  const date =
    url.searchParams.get("date") ?? new Date().toISOString().split("T")[0];
  if (!date) {
    throw redirect(`/?date=${new Date().toISOString().split("T")[0]}`);
  }
  return {
    date,
    results: getResultsForDate(date),
  };
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dateInput = formData.get("dateInput");
  throw redirect(`/?date=${dateInput}`);
}

export default function Index() {
  const { date, results } = useLoaderData<typeof loader>();
  return (
    <div className="p-8">
      <div className="flex gap-16">
        <div className="w-1/2">
          <Form className="mt-4" method="POST">
            <label
              htmlFor="dateInput"
              className="block text-sm font-medium text-gray-700"
            >
              Select a date:
            </label>
            <input
              type="date"
              id="dateInput"
              name="dateInput"
              defaultValue={date}
              onChange={(e) => e.target.form?.submit()}
              className="mt-1 block grow rounded-md border-2 border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
            />
          </Form>
        </div>
        <div className="w-1/2">
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
                  Results
                </th>
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <>
                    <tr className="animate-pulse">
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    </tr>
                  </>
                }
              >
                <Await resolve={results}>
                  {(results) =>
                    results.length > 0 ? (
                      results.map((result, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">
                            {result}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">
                          No results found for this date
                        </td>
                      </tr>
                    )
                  }
                </Await>
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
