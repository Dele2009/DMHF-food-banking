import React, { useCallback, useMemo, useState } from "react";
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
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@heroui/react";
import { useSearchParams } from "react-router-dom";
import {
  BiSearch,
  BiPlus,
  BiDotsVertical,
  BiChevronDown,
} from "react-icons/bi";
import Input from "../../components/ui/Input";

const columns = [
  // { name: "ID", uid: "id", sortable: true },
  { name: "USERNAME", uid: "name", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DETAILS", uid: "age", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "ACTIONS", uid: "actions" },
];



const users = [
  {
    id: 1,
    name: "Tony Reichert",
    title: "Tony Reichert",
    body: "CEO",
    profile_pic: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    title: "Zoey Lang",
    body: "Tech Lead",
    profile_pic: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    title: "Jane Fisher",
    body: "Sr. Dev",
    profile_pic: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    title: "William Howard",
    body: "C.M.",
    profile_pic: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    title: "Kristen Copper",
    body: "S. Manager",
    profile_pic: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    title: "Brian Kim",
    body: "P. Manager",
    profile_pic: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
  },
  {
    id: 7,
    name: "Michael Hunt",
    title: "Michael Hunt",
    body: "Designer",
    profile_pic: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    title: "Samantha Brooks",
    body: "HR Manager",
    profile_pic: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    title: "Frank Harrison",
    body: "F. Manager",
    profile_pic: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    title: "Emma Adams",
    body: "Ops Manager",
    profile_pic: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    title: "Brandon Stevens",
    body: "Jr. Dev",
    profile_pic: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    title: "Megan Richards",
    body: "P. Manager",
    profile_pic: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    title: "Oliver Scott",
    body: "S. Manager",
    profile_pic: "https://i.pravatar.cc/150?img=12",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    title: "Grace Allen",
    body: "M. Specialist",
    profile_pic: "https://i.pravatar.cc/150?img=16",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    title: "Noah Carter",
    body: "IT Specialist",
    profile_pic: "https://i.pravatar.cc/150?img=15",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    title: "Ava Perez",
    body: "Manager",
    profile_pic: "https://i.pravatar.cc/150?img=20",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    title: "Liam Johnson",
    body: "Data Analyst",
    profile_pic: "https://i.pravatar.cc/150?img=33",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    title: "Sophia Taylor",
    body: "QA Analyst",
    profile_pic: "https://i.pravatar.cc/150?img=29",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    title: "Lucas Harris",
    body: "Administrator",
    profile_pic: "https://i.pravatar.cc/150?img=50",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    title: "Mia Robinson",
    body: "Coordinator",
    profile_pic: "https://i.pravatar.cc/150?img=45",
    email: "mia.robinson@example.com",
  },
];




type User = (typeof users)[0];

export default function PendingRequestsPage() {
//   const [visibleColumns, setVisibleColumns] = useState<Selection>(
//     new Set(INITIAL_VISIBLE_COLUMNS)
//   );
//   const headerColumns = useMemo(() => {
//     if (visibleColumns === "all") return columns;

//     return columns.filter((column) =>
//       Array.from(visibleColumns).includes(column.uid)
//     );
//   }, [visibleColumns]);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const filterValue = searchParams.get("search") || "";
  const statusFilter = new Set(searchParams.get("status")?.split(",") || []);
  const sortColumn = searchParams.get("sortColumn") || "age";
  const sortDirection = searchParams.get("sortDirection") || "ascending";
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 5;
  const page = Number(searchParams.get("page")) || 1;

  const hasSearchFilter = Boolean(filterValue);

  // Filtered items logic
  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  console.log(pages);

  // Paginated items
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // Sorting logic
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortColumn as keyof User] as number;
      const second = b[sortColumn as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDirection === "descending" ? -cmp : cmp;
    });
  }, [sortColumn, sortDirection, items]);

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
  const onNextPage = () => updateQueryParams({ page: String(page + 1) });
  const onPreviousPage = () => updateQueryParams({ page: String(page - 1) });
  const setPage = (page: number) => updateQueryParams({ page: String(page) });
  const onStatusChange = (keys: Selection) => {
    const status =
      keys instanceof Set && keys.has("all")
        ? "all"
        : Array.from(keys).join(",");
    updateQueryParams({ status });
  };
  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    updateQueryParams({ rowsPerPage: e.target.value, page: "1" });
  const onSearchChange = (value: string) =>
    updateQueryParams({ search: value, page: "1" });
  const onSortChange = ({ column, direction }: SortDescriptor) =>
    updateQueryParams({
      sortColumn: String(column),
      sortDirection: String(direction),
    });

  const onClear = () => updateQueryParams({ search: "", page: "1" });

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.profile_pic }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
     //  case "role":
     //    return (
     //      <div className="flex flex-col">
     //        <p className="text-bold text-small capitalize">{cellValue}</p>
     //        <p className="text-bold text-tiny capitalize text-default-400">
     //          {user.team}
     //        </p>
     //      </div>
     //    );
     //  case "status":
     //    return (
     //      <Chip
     //        className="capitalize"
     //        color={statusColorMap[user.status]}
     //        size="sm"
     //        variant="flat"
     //      >
     //        {cellValue}
     //      </Chip>
     //    );
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
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<BiSearch size={20} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          {/* <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <BiChevronDown size={20} className="text-small" />
                  }
                  variant="flat"
                  color="warning"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<BiPlus />}>
              Add New
            </Button>
          </div> */}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
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
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
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
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
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
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
        emptyContent={"No users found"}
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
