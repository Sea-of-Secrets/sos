export default function MainLoading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        color: "white",
        fontSize: "24px",
        zIndex: 999,
      }}
    >
      Loading...
    </div>
  );
}
