"use client";
export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/assets/game_rule_background.png)",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          backgroundImage: "url(/assets/game_rule_contents.png)",
          backgroundSize: "cover",
        }}
        className="flex flex-col"
      >
        <p>안녕</p>
      </div>
    </div>
  );
}
