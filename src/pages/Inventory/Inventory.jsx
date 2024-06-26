

// export default Inventory;
import InventoryList from "../../components/InventoryList/InventoryList";
import searchIcon from "./../../../src/assets/Icons/search-24px.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import './inventory.scss';

const Inventory = () => {

  const [deleteInventory, setDeleteInventory] = useState(0); 
  const [inventories, setInventories] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState();
  const n = 8


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:8080/api/inventories/');
        setInventories(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setFilterData(
      inventories.filter((item, index) => {
        return (index >= page * n) & (index < (page + 1) * n);
      })
    );
  }, [deleteInventory, page]);

  useEffect(() => {
    setFilterData(
      inventories.filter((item, index) => {
        return (index >= page * n) & (index < (page + 1) * n);
      })
    );
  }
  , [page, inventories]);
  

  const sortData = (field) => {
    const sortedInventories = [...inventories].sort((a, b) => {
      if (sortAscending) {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setInventories(sortedInventories);
    setSortAscending(!sortAscending);
  };

  return (
    <>
    <main className="inventory">
      <div className="inventory__wrap">
        <div className="inventory__header">
          <div className="inventory__header-title-wrap">
            <h1 className="inventory__header-title">Inventory</h1>
          </div>

          <div className="inventory__header-search">
            <div className="inventory__input-wrap">
              <input
                className="inventory__input"
                type="text"
                placeholder="Search..."
              />
              <span
                className="inventory__search-icon"
                style={{ backgroundImage: `url(${searchIcon})` }}
              ></span>
            </div>

            <Link to="/addInventory" className="inventory__button-link">
              + Add New Item
            </Link>
          </div>
        </div>

        <div className="inventory__content">
          <div className="inventory__row">
            <div id="1" className="inventory__title">
              <span onClick={() => sortData("item_name")}>INVENTORY ITEM</span>
              <img src="/src/assets/Icons/sort-24px.svg" alt="sort arrow" className="inventory__sortArrow"></img>
            </div>
            <div id="2" className="inventory__title">
              <span onClick={() => sortData("category")}>CATEGORY</span>
              <img src="/src/assets/Icons/sort-24px.svg" alt="sort arrow" className="inventory__sortArrow"></img>
            </div>
            <div id="3" className="inventory__title">
              <span onClick={() => sortData("status")}>STATUS</span>
              <img src="/src/assets/Icons/sort-24px.svg" alt="sort arrow" className="inventory__sortArrow"></img>
            </div>
            <div id="4" className="inventory__title">
              <span onClick={() => sortData("quantity")}>QTY</span>
              <img src="/src/assets/Icons/sort-24px.svg" alt="sort arrow" className="inventory__sortArrow"></img>
            </div>
            <div id="5" className="inventory__title">
              <span onClick={() => sortData("warehouse_name")}>WAREHOUSE</span>
              <img src="/src/assets/Icons/sort-24px.svg" alt="sort arrow" className="inventory__sortArrow"></img>
            </div>
            <div id="6" className="inventory__title-last">
              ACTIONS
            </div>
          </div>
          
          {filterData && filterData.map((inventory) => (
            <InventoryList key={inventory.id} inventory={inventory} setDeleteInventory={setDeleteInventory}/>
          ))}
          <ReactPaginate
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active-pagingation"}
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(inventories.length / n)}
            breakLabel="..."
            previousLabel="< "
            nextLabel=" >"
            style={{display: "flex", justifyContent: "center"}} 
          />;
        </div>
      </div>
    </main>
      </>
  );
};


export default Inventory;
