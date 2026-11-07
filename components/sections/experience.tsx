"use client";

import { useState } from "react";
import { Sprite } from "../pixel";
import { diamond } from "../sprites";
import { quests } from "@/lib/content";

type Filter = "all" | "active" | "cleared";

const ACTIVE = diamond("b");
const CLEARED = diamond("y");

export function Experience() {
  const [filter, setFilter] = useState<Filter>("all");
  const active = quests.filter((q) => q.status === "active").length;
  const cleared = quests.length - active;
  const shown = quests.filter((q) => filter === "all" || q.status === filter);

  const filters: Array<[Filter, string]> = [
    ["all", `All (${quests.length})`],
    ["active", `Active (${active})`],
    ["cleared", `Cleared (${cleared})`],
  ];

  return (
    <section
      id="experience"
      className="section wrap"
      aria-labelledby="experience-title"
    >
      <div className="section-head">
        <h2 id="experience-title">Experience</h2>
      </div>

      <div className="log">
        <div className="log-filters" role="group" aria-label="Filter quests">
          {filters.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className="filter"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <ol className="quests">
          {shown.map((q) => (
            <li key={q.title} className="quest">
              <span className="quest-node" aria-hidden="true">
                <Sprite
                  rows={q.status === "active" ? ACTIVE : CLEARED}
                  unit="4px"
                />
              </span>
              <div className="quest-body">
                <div className="quest-top">
                  <h3>{q.title}</h3>
                  <span className={`status status-${q.status}`}>
                    {q.status === "active" ? "Active" : "Cleared"}
                  </span>
                </div>
                <p className="quest-where">{q.where}</p>
                <p className="quest-text">{q.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
