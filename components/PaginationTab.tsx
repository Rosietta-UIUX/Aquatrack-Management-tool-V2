import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationTab = ({ currentPage, setCurrentPage, totalPages }: any) => {
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; // Adjust this to change the number of visible pages

    // Previous Button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          className={`lg:text-sm text-xs ${
            currentPage === 1 && "opacity-[0.5]"
          }`}
          href="#"
          onClick={handlePrevPage}
          isActive={currentPage === 1}
        />
      </PaginationItem>
    );

    // Page Numbers
    if (totalPages <= maxVisiblePages) {
      for (let page = 1; page <= totalPages; page++) {
        items.push(
          <PaginationItem key={page}>
            <PaginationLink
              className="lg:text-sm text-xs font-bold mx-0"
              href="#"
              isActive={currentPage === page}
              onClick={() => handlePageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="lg:text-sm text-xs font-bold mx-6"
            href="#"
            isActive={currentPage === 1}
            onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from the start
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      // Determine the range of page numbers to show around the current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let page = startPage; page <= endPage; page++) {
        items.push(
          <PaginationItem key={page}>
            <PaginationLink
              className="lg:text-sm text-xs font-bold mx-6"
              href="#"
              isActive={currentPage === page}
              onClick={() => handlePageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is far from the end
      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      // Show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="lg:text-sm text-xs font-bold mx-6"
            href="#"
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next Button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          className={`lg:text-sm text-xs ${
            currentPage === totalPages && "opacity-[0.5]"
          }`}
          href="#"
          onClick={handleNextPage}
          isActive={currentPage === totalPages}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <>
      <Pagination className="flex items-end justify-end">
        <PaginationContent>{renderPaginationItems()}</PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationTab;
