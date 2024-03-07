"use client";

import css from "./graph.module.css";
import Board from "./Board";
// import PirateNode from "./PirateNode";

export default function Page() {
  return (
    <main className={css.scene}>
      <Board />
    </main>
  );
}
