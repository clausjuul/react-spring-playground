export const enterDefaultTimeline = (node, tl, duration, canScroll) => {

  return tl
    .set(
      node,
      { position: "fixed", width: "100vw", height: "100vh", top: 0, left: 0 },
      0
    )

    .set(
      node.firstChild,
      {
        width: "100vw",
        maxWidth: "800px",
        left: "50vw",
        top: canScroll ? "10vh" : "50vh",
        y: canScroll ? "0" : "-50%",
        x: "-50%"
      },
      0
    )

    .fromTo(
      node.firstChild,
      duration,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0 },
      0
    )

    .set(node, { overflow: "hidden auto" }, duration)

    .set(node.firstChild, { overflow: "unset" }, duration);
}
export const exitDefaultTimeline = (node, tl, duration) =>
  tl
    .set(node, { overflow: "hidden" }, 0)

    .fromTo(
      node.firstChild,
      duration,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 50 },
      0
    );
