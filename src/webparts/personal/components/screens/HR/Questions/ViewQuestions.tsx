import * as React from "react";
import ReactPaginate from "react-paginate";
import DeleteModal from "../HR Modals/DeleteModal";
import EditQuestionModal from "../HR Modals/EditQuestionModal";

import styles from "./questions.module.scss";

const ViewQuestions = ({ itemsPerPage, list, setList }) => {
  const [open, setOpen] = React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [data, setItem] = React.useState({});

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  function Items({ currentItems }) {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Questions</th>
            <th style={{ textAlign: "center" }}>Response Type</th>
            <th style={{ textAlign: "center" }}>Answers</th>
            <th style={{ textAlign: "center" }}>Section</th>
            <th style={{ textAlign: "center" }}>Required Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item: any, index) => (
              <tr key={item.ID}>
                <td style={{ padding: "30px" }}>{item.questions}</td>
                <td style={{ padding: "30px" }}>{item.type}</td>
                <td style={{ padding: "30px" }}>
                  {JSON.parse(item.options).map((option: []) => {
                    return (
                      <p
                        style={{
                          display: "flex",
                          gridGap: "10px",
                          alignItems: "center",
                          margin: "0.5rem 0rem",
                        }}
                      >
                        &bull;{option}
                      </p>
                    );
                  })}
                </td>
                <td>{item.section}</td>
                <td>{item.required}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gridGap: "10px",
                    }}
                  >
                    <button
                      className={styles.btn__questions__edit}
                      onClick={(e) => {
                        setEditOpen(true);
                        setItem(item);
                        setId(item.ID);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.btn__questions__delete}
                      onClick={(e) => {
                        setOpen(true);
                        setId(item.ID);
                        // deleteItem(item.ID);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, list]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  return (
    <div className={styles.paginate}>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <DeleteModal
        open={open}
        handleClose={handleClose}
        setList={setList}
        id={id}
      />
      <EditQuestionModal
        open={editopen}
        setList={setList}
        id={id}
        item={data}
        handleClose={handleEditClose}
      />
    </div>
  );
};

export default ViewQuestions;
