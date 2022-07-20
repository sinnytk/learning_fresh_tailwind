// routes/countdown.tsx

/** @jsx h */
import { h } from "preact";
import Countdown from "../islands/Countdown.tsx";

export default function Page() {
  const date = new Date();
  date.setHours(date.getHours() + 1);

  return (
    <p>
      End of brahmaand in <Countdown target={date.toISOString()} />
    </p>
  );
}
