import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  TableBodyProps,
  Spinner,
} from "@heroui/react";
import { Link, useSearchParams } from "react-router-dom";
import {
  BiSearch,
  BiPlus,
  BiDotsVertical,
  BiChevronDown,
  BiRefresh,
} from "react-icons/bi";
import Input from "../../components/ui/Input";
import { axios } from "../../config/axios";

const columns = [
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DETAILS", uid: "details", sortable: true },
  { name: "REQUEST-DATE", uid: "request_date", sortable: true },
  { name: "PICKUP-DATE", uid: "pickup_date" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Approved", uid: "approved" },
  { name: "Pending", uid: "pending" },
  { name: "Rejected", uid: "rejected" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
};

// const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

type Requests = {
  id: number;
  title: string;
  details: string;
  request_date: string;
  pickup_date: string;
  status: "approved" | "pending" | "rejected" | string;
};

export default function ViewRequestsPage() {
  const [requests, setRequests] = useState<Requests[]>([]);
  const [pages, setPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [loadingState, setLoadingState] =
    useState<TableBodyProps<Requests>["loadingState"]>("idle");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const filterValue = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";
  const sortColumn = searchParams.get("sortColumn") || "age";
  const sortDirection = searchParams.get("sortDirection") || "ascending";
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 5;
  const page = Number(searchParams.get("page")) || 1;

  // const hasSearchFilter = Boolean(filterValue);

  const fetchData = async () => {
    setLoadingState("loading");
    try {
      const {
        data: { data },
      } = await axios.get("//", {
        params: {
          status: statusFilter || "all",
          search: filterValue,
          page,
          rowsPerPage,
        },
      });
      console.log(data);
      setPages(data.totalPages);
      setRequests(data.requests);
      setLoadingState("idle");
    } catch (error) {
      console.error(error);
      setLoadingState("error");
    }
  };
  useEffect(() => {
    fetchData();
  }, [statusFilter, filterValue, page, rowsPerPage]);

  // Sorting logic
  const sortedItems = useMemo(() => {
    return [...requests].sort((a, b) => {
      const first = a[sortColumn as keyof Requests] as number;
      const second = b[sortColumn as keyof Requests] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDirection === "descending" ? -cmp : cmp;
    });
  }, [sortColumn, sortDirection, requests]);
  console.log("sort", sortedItems);

  // Update URL query params
  const updateQueryParams = (params: Record<string, string>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      return newParams;
    });
  };

  // Handlers
  const setPage = (page: number) => updateQueryParams({ page: String(page) });
  const onStatusChange = (status: Selection) =>
    updateQueryParams({ status: Array.from(status).join(""), page: "1" });
  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    updateQueryParams({ rowsPerPage: e.target.value, page: "1" });
  const onSearchChange = () =>
    updateQueryParams({ search: searchValue, page: "1" });
  const onSortChange = ({ column, direction }: SortDescriptor) =>
    updateQueryParams({
      sortColumn: String(column),
      sortDirection: String(direction),
    });

  // const onClear = () => updateQueryParams({ search: "", page: "1" });

  const renderCell = useCallback((req: Requests, columnKey: React.Key) => {
    const cellValue = req[columnKey as keyof Requests];

    switch (columnKey) {
      // case "role":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-small capitalize">{cellValue}</p>
      //       <p className="text-bold text-tiny capitalize text-default-400">
      //         {req.team}
      //       </p>
      //     </div>
      //   );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[req.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <BiDotsVertical size={20} className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view" color="warning">View</DropdownItem>
                <DropdownItem key="delete" color="danger">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <Input
            className="w-full sm:max-w-[50%]"
            placeholder="Search by title..."
            endContent={
              <Button onPress={onSearchChange} color="warning" isIconOnly>
                <BiSearch size={20} className="text-white" />
              </Button>
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="flex justify-center items-center   gap-3">
            <Button
              onPress={() => {
                updateQueryParams({ search: "", status: "" });
                fetchData();
              }}
              radius="full"
              variant="flat"
              color="warning"
              isIconOnly
            >
              <BiRefresh size={25} />
            </Button>
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={
                    <BiChevronDown size={20} className="text-small" />
                  }
                  variant="flat"
                  color="warning"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={onStatusChange}
              >
                <>
                  <DropdownItem key="all">All</DropdownItem>
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {status.name}
                    </DropdownItem>
                  ))}
                </>
              </DropdownMenu>
            </Dropdown>

            <Button
              as={Link}
              to="/member/requests/new"
              color="primary"
              startContent={<BiPlus />}
            >
              New Request
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {requests?.length || 0} requests
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              value={rowsPerPage}
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    // visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    requests?.length,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
        {pages > 1 && (
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            // variant="bordered"
            classNames={{
              wrapper: "bg-transparent",
              item: "bg-[#18181B] text-white",
              prev: "bg-[#18181B] text-white",
              next: "bg-[#18181B] text-white",
              cursor: "bg-yellow-500 text-black",
            }}
            initialPage={page}
            total={pages}
            onChange={setPage}
          />
        )}
        {/* <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            color="warning"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            color="warning"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div> */}
      </div>
    );
  }, [selectedKeys, page, pages]);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      //  isStriped
      classNames={{
        wrapper: "max-h-[415px] bg-[#18181B]",
        tbody: "dashboard-table-body !divide-y divide-white/20",
        thead: "dashboard-table-header",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={{
        column: sortColumn,
        direction: sortDirection as SortDescriptor["direction"],
      }}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={onSortChange}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        className="divide-y-2 divide-white/20"
        emptyContent={
          <div className="flex flex-col items-center justify-center py-10">
            <BiSearch size={50} className="text-default-400" />
            <p className="text-default-400 mt-4">No requests found</p>
          </div>
        }
        loadingContent={<Spinner color="warning" />}
        loadingState={loadingState}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
