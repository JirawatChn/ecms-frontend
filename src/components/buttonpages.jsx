import { Button } from "react-bootstrap";

export const ButtonPage = ({
  length,
  itemsPerPage,
  curPage,
  numPages,
  setCurPage,
}) => {
  const buttons = [];
  const numButtons = Math.ceil(length / itemsPerPage); // Calculate the total number of pages

  // Previous Button (only shown if current page is not the first page)
  if (curPage > 1) {
    const customKey = "prevButton";
    buttons.push(
      <Button className="mx-1" key={customKey} onClick={() => setCurPage(curPage - 1)}>
        Prev
      </Button>
    );
  }

  // Page Number Buttons
  for (let i = 1; i <= numButtons; i++) {
    buttons.push(
      <Button
        key={i}
        className="mx-1"
        variant={curPage === i ? "primary" : "outline-primary"} // Use the variant to conditionally style the button
        onClick={() => setCurPage(i)}
      >
        {i}
      </Button>
    );
  }

  // Next Button (only shown if current page is not the last page)
  if (curPage < numPages) {
    const customKey = `nextButton-${curPage}`; // Dynamically generate the key based on the current page
    buttons.push(
      <Button
        key={customKey}
        className="mx-1"
        variant="primary" // Use the variant for primary styling
        onClick={() => setCurPage(curPage + 1)}
      >
        Next
      </Button>
    );
  }

  return buttons;
};
