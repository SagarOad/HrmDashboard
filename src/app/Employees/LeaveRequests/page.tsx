"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const employeesData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    employeeId: "EMP001",
    phone: "123-456-7890",
    joinDate: "2020-01-15",
    designation: "Software Engineer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
];

const LeaveRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const employeesPerPage: number = 10;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectEmployee = (id: number) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((employeeId) => employeeId !== id)
        : [...prevSelected, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === employeesData.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employeesData.map((employee) => employee.id));
    }
  };

  const handleEdit = (id: number) => {
    // Handle edit functionality
  };

  const handleDelete = (id: number) => {
    // Handle delete functionality
  };

  const indexOfLastEmployee: number = currentPage * employeesPerPage;
  const indexOfFirstEmployee: number = indexOfLastEmployee - employeesPerPage;
  const currentEmployees: Employee[] = employeesData
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DefaultLayout>
      <div className="max-w-12xl mx-auto">
        <Breadcrumb pageName="leave Requests" />
        {/* <div className=" flex items-center justify-end">
          <button className=" bg-red px-5 py-2 text-white">Add New</button>
        </div> */}
        <div className="my-4 flex items-center justify-end">
          {/* <h2 className="text-xl font-semibold">Employees List</h2> */}
          <input
            type="text"
            placeholder="Search employees"
            value={searchTerm}
            onChange={handleSearch}
            className="w-[250px] rounded border p-2"
          />
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-8 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedEmployees.length === employeesData.length}
                />
              </th>
              <th className=" text-left">Name</th>
              <th className=" text-left">Email</th>
              <th className=" text-left">Employee ID</th>
              <th className=" text-left">Phone</th>
              <th className=" text-left">Join Date</th>
              <th className=" text-left">Designation</th>
              <th className=" text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className=" border-y-2 border-[#dcdcdc]">
                <td className=" px-6 py-6">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleSelectEmployee(employee.id)}
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.phone}</td>
                <td>{employee.joinDate}</td>
                <td>{employee.designation}</td>
                <td>
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="text-red-500 ml-2 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <Pagination
            employeesPerPage={employeesPerPage}
            totalEmployees={employeesData.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

type PaginationProps = {
  employeesPerPage: number;
  totalEmployees: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  employeesPerPage,
  totalEmployees,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex list-none">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`border px-3 py-1 ${
                currentPage === number ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LeaveRequests;
