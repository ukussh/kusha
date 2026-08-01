import { ArrowLeft, ArrowRight } from "lucide-react";

const buttonClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:bg-foreground/10 disabled:cursor-not-allowed disabled:opacity-40 md:h-10 md:w-10";

export default function Pager({
  page,
  pageCount,
  onChange,
  className = "",
}: {
  page: number;
  pageCount: number;
  onChange: (next: number) => void;
  className?: string;
}) {
  return (
    <div className={`mt-6 flex justify-end gap-2 md:mt-8 ${className}`}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 0}
        onClick={() => onChange(page - 1)}
        className={buttonClass}
      >
        <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
      </button>
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount - 1}
        onClick={() => onChange(page + 1)}
        className={buttonClass}
      >
        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
}
