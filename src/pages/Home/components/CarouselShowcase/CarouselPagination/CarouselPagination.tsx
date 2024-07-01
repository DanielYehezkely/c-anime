import React from "react";
import { Box } from "@mui/material";
import "./CarouselPagination.css";
import ReactPaginate from "react-paginate";

interface CarouselPaginationProps {
  label: string;
  pageCount: number;
}

const CarouselPagination: React.FC<CarouselPaginationProps> = ({
  label,
  pageCount,
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
      }}
    >
      <h1 className="carousel-label">{label}</h1>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={pageCount}
        marginPagesDisplayed={0}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        previousClassName={"prev"}
        nextClassName={"next"}
        disabledClassName={"disabled"}
        
      />
    </Box>
  );
};

export default CarouselPagination;
