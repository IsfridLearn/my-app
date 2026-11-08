"use client";

import { useEffect, useState } from "react";

/** Current time in Davao City. Empty on the server, filled in after mount. */
export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Manila",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  return <span>{time && `${time} local`}</span>;
}
