export default function Button({ children, onClick }) {
  return (
    <button
      className="mt-3 px-4 py-3 text-white font-semibold rounded-3xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)]
    cursor-pointer  flex flex-row  gap-1
    "
      onClick={onClick}
    >
      {children}
    </button>
  );
}
