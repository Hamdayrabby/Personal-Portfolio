/**
 * Minimal emphasis renderer. Text wrapped in **double asterisks** is
 * rendered italic, which is the only inline formatting this site needs.
 */
export default function RichText({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <em key={i}>{part}</em> : part
  );
}
