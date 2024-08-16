import { useState } from "react";

export default function usePagination() {
  const [page, setPage] = useState(1);

  const goBackHandler = () => setPage((prev) => prev - 1);

  const goNextHandler = () => setPage((prev) => prev + 1);
  return {
    page,
    goBackHandler,
    goNextHandler,
  };
}
