// routes/search.tsx

/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Arjun", "Berav", "Chandarmukhi", "Dhruv", "Eeshwar", "Falak"];

interface Data {
  results: string[];
  query: string;
}
export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const results = NAMES.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    return ctx.render({ results, query });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;
  return (
    <div>
      <form>
        <input type="text" name="q" value={query} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}
