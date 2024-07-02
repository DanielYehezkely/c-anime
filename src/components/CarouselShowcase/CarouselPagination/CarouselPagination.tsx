import React from "react";
import { Box } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./CarouselPagination.css";

interface CarouselPaginationProps {
  label: string;
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

const CarouselPagination: React.FC<CarouselPaginationProps> = ({
  label,
  pageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "7.5rem",
        width: "100%",
        paddingLeft: "1.5rem",
        zIndex: 6
      }}
    >
      <h1 className="carousel-label">{label}</h1>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={pageCount}
        marginPagesDisplayed={1}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        previousClassName={"prev"}
        nextClassName={"next"}
        disabledClassName={"disabled"}
        onPageChange={onPageChange}
        forcePage={currentPage}
      />
    </Box>
  );
};

export default CarouselPagination;
