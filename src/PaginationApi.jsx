import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const START_INDEX_OF_PAGINATION = 1;
const MAXIMUM_ELEMENTS_ON_RIGHT_SIDE = 8;
const MAXIMUM_ELEMENTS_ON_LEFT_SIDE = 5;

const paginationBarColor = {
  padding: "1px 12px",
  margin: "0 2px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const PaginationApi = ({
  elements,
  noOfelementsInAPage,
  elementToRender,
  size = "md",
  activeColor = "#b90000",
}) => {
  const [currentCountOfPagination, setCurrentCountOfPagination] = useState(
    START_INDEX_OF_PAGINATION
  );

  noOfelementsInAPage = useMemo(() => {
    return noOfelementsInAPage || 10;
  }, [elements, noOfelementsInAPage, elementToRender]);

  //Overall Length Of Pagination Bar

  const lengthOfThePaginationBar = useMemo(() => {
    return Math.ceil(Number(elements?.length) / Number(noOfelementsInAPage));
  }, [elements, noOfelementsInAPage, elementToRender]);

  const handleCurrentCountOfPaginationChange = (index, e) => {
    e.preventDefault();
    setCurrentCountOfPagination(index);
  };

  //Pagination To Previous Page

  const handlePaginationToPreviousPage = () => {
    setCurrentCountOfPagination((prevPaginationValue) =>
      currentCountOfPagination !== START_INDEX_OF_PAGINATION
        ? prevPaginationValue - START_INDEX_OF_PAGINATION
        : START_INDEX_OF_PAGINATION
    );
  };

  //Pagination To Next Page
  const handlePaginationToNextPage = () => {
    setCurrentCountOfPagination((prevPaginationValue) =>
      prevPaginationValue === lengthOfThePaginationBar
        ? lengthOfThePaginationBar
        : prevPaginationValue + 1
    );
  };

  // Pagination To First page

  const handlePaginationToFirstPage = () => {
    setCurrentCountOfPagination(START_INDEX_OF_PAGINATION);
  };

  // Pagination To Last page

  const handlePaginationToLastPage = () => {
    setCurrentCountOfPagination(lengthOfThePaginationBar);
  };

  return (
    <>
      {elementToRender
        .slice(
          noOfelementsInAPage * (currentCountOfPagination - 1),
          noOfelementsInAPage * currentCountOfPagination
        )
        .map((item) => {
          return item;
        })}

      {/* Pagination UI */}

      <div className="d-flex justify-content-center my-5">
        <Pagination size={size}>
          <Pagination.First
            onClick={handlePaginationToFirstPage}
            disabled={currentCountOfPagination === 1}
          />
          <Pagination.Prev
            onClick={handlePaginationToPreviousPage}
            disabled={currentCountOfPagination === 1}
          />
          {Array(lengthOfThePaginationBar)
            .fill(0)
            .map((_, index) => {
              return (
                <>
                  {index <=
                    currentCountOfPagination + MAXIMUM_ELEMENTS_ON_RIGHT_SIDE &&
                  index >=
                    currentCountOfPagination - MAXIMUM_ELEMENTS_ON_LEFT_SIDE ? (
                    <div
                      style={{
                        ...paginationBarColor,
                        border: `1px solid ${activeColor}`,
                        backgroundColor:
                          index + 1 === currentCountOfPagination && activeColor,
                        color:
                          index + 1 === currentCountOfPagination && "white",
                        borderRadius: "4px",
                      }}
                      onClick={(e) =>
                        handleCurrentCountOfPaginationChange(index + 1, e)
                      }
                      active={index + 1 === currentCountOfPagination}
                    >
                      <h6 className="text-center mt-1">{index + 1}</h6>
                    </div>
                  ) : (
                    <div style={{ color: activeColor }} className="mx-1">
                      .
                    </div>
                  )}
                </>
              );
            })}

          <Pagination.Next
            onClick={handlePaginationToNextPage}
            disabled={currentCountOfPagination === lengthOfThePaginationBar}
          />
          <Pagination.Last
            onClick={handlePaginationToLastPage}
            disabled={currentCountOfPagination === lengthOfThePaginationBar}
          />
        </Pagination>
      </div>
    </>
  );
};

export default PaginationApi;
