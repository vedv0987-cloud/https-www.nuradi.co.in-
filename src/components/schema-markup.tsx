// Server component that emits one or more Schema.org JSON-LD blocks.
// Safe to render inside server components (including generateMetadata sibling content).

interface Props {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function SchemaMarkup({ data }: Props) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
