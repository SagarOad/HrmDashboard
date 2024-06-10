"use client"
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
  {
    id: 5,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
  {
    id: 6,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
  {
    id: 7,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
  {
    id: 8,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
  {
    id: 9,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
  {
    id: 10,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
  {
    id: 11,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    phone: "123-456-7891",
    joinDate: "2019-03-23",
    designation: "Project Manager",
  },
];

// Define types
type Employee = {
  id: number;
  name: string;
  email: string;
  employeeId: string;
  phone: string;
  joinDate: string;
  designation: string;
};

const EmployeeList: React.FC = () => {
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
        : [...prevSelected, id]
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
  const indexOfFirstEmployee: number =
    indexOfLastEmployee - employeesPerPage;
  const currentEmployees: Employee[] = employeesData
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-12xl">
        <Breadcrumb pageName="All Employees" />
        <div className=" flex justify-end items-center">
        <button className=" px-5 py-2 text-white bg-red">Add New</button>
        </div>
        <div className="my-4 flex justify-end items-center">
          {/* <h2 className="text-xl font-semibold">Employees List</h2> */}
          <input
            type="text"
            placeholder="Search employees"
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 w-[250px] border rounded"
          />
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-8 px-6 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedEmployees.length === employeesData.length
                  }
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
                <td className=" py-6 px-6">
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
                    className="text-red-500 hover:underline ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
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
              className={`px-3 py-1 border ${
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

export default EmployeeList;
