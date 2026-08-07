export default function DocFooter({
  author,
  date,
}: {
  author?: string;
  date?: string;
}) {
  return (
    <footer>
      {date && <span>Cập nhật gần nhất: {date}</span>}
      {author && <span>Tác giả: {author}</span>}
    </footer>
  );
}
