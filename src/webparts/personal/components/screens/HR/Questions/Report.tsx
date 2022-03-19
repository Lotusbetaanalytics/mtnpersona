import * as React from "react";
import ReactPaginate from "react-paginate";
import styles from "./questions.module.scss";

const Report = ({ itemsPerPage, list, setList }) => {
  function Items({ currentItems }) {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ right: "7%", position: "relative" }}>SN</th>
            <th style={{ right: "6%", position: "relative" }}>Employee Name</th>
            <th style={{ right: "3%", position: "relative" }}>
              Employee Email
            </th>
            <th style={{ right: "2%", position: "relative" }}>
              Employee Alias
            </th>
            <th>Division</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item: any) => (
              <tr key={item.GUID}>
                <td>{item.Id}</td>
                <td style={{ padding: "30px" }}>{item.name}</td>
                <td style={{ padding: "30px" }}>{item.email}</td>
                <td>{item.alias}</td>
                <td>{item.division}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gridGap: "10px",
                    }}
                  >
                    <button className={styles.btn__questions__more}>
                      View More
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
      <div className={styles.select}>
        <select
          name=""
          id=""
          onChange={(e) => {
            setList(
              list.filter(({ division }) => {
                return division === e.target.value;
              })
            );
          }}
        >
          <option>Select Division</option>
          <option value="Company Secreteriat/ CEO’s Office(CEO,PA, COO, Business Manager)">
            Company Secreteriat/ CEO’s Office(CEO,PA, COO, Business Manager)
          </option>
          <option value="Corporate Services">Corporate Services</option>
          <option value="Customer Relations">Customer Relations</option>
          <option value="Digital Services">Digital Services</option>
          <option value="Enterprise Business">Enterprise Business</option>
          <option value="Finance">Finance</option>
          <option value="Human Resource">Human Resource</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Marketing">Marketing</option>
          <option value="Interna Audit and Fraud Forensics">
            Interna Audit and Fraud Forensics
          </option>
          <option value="Mobile Financial Services">
            Mobile Financial Services
          </option>
          <option value="Networks">Networks</option>
          <option value="Risk and Compliance">Risk and Compliance</option>
          <option value="Sales and Distribution">Sales and Distribution</option>
          <option value="Transformation Office">Transformation Office</option>
          <option value="Yello Digital Financial Service">
            Yello Digital Financial Service
          </option>
        </select>
        <span className={styles.focus}></span>
      </div>
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
    </div>
  );
};

export default Report;
