function BlurCircle({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
}) {
  return (
    <div
      className="absolute -z-50 h-58 aspect-square rounded-full bg-[var(--color-primary)]/40 d- blur-3xl"
      style={{ top: top, left: left, right: right, bottom: bottom }}
    ></div>
  );
}

export default BlurCircle;
