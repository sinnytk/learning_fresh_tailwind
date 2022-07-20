// routes/github/[username].tsx

/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    return ctx.render(user);
  },
};

export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found!</h1>;
  }

  return (
    <main class={tw`text-white`}>
      <div class={tw`relative`}>
        <header class={tw`flex items-center p-6 bg-gray-800 w-auto`}>
          <img class={tw`w-auto h-8`} src="/github_logo.png"></img>
          <nav class={tw`flex items-center w-full justify-between`}>
            <div class={tw`px-6`}>
              <ul class={tw`flex gap-4`}>
                <li>
                  <a>Product</a>
                </li>
                <li>
                  <a>Team</a>
                </li>
                <li>
                  <a>Enterprise</a>
                </li>
                <li>
                  <a>Explore</a>
                </li>
                <li>
                  <a>Marketplace</a>
                </li>
                <li>
                  <a>Pricing</a>
                </li>
              </ul>
            </div>
            <div class={tw`flex items-center justify-end gap-5 text-right`}>
              <input
                class={tw
                  `bg-gray-900 placeholder-gray-300 p-2 text-white rounded`}
                type="text"
                placeholder="Search"
              />
              <ul class={tw`flex gap-4`}>
                <li>Sign In</li>
                <li>Sign Up</li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
      <div class={tw`p-4`}></div>
      <img src={data.avatar_url} alt={data.name} />
    </main>
  );
}
