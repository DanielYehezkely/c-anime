import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./CarouselPagination.css";
import theme from "../../../MUI/theme";

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

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

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
      {!isXs &&       
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
      }
    </Box>
  );
};

export default CarouselPagination;
