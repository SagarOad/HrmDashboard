"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const departmentsList = [
  {
    id: 1,
    department: "Production",
    departmentHead: "John Doe",
    totalEmployees: "12",
  },
  {
    id: 2,
    department: "Marketing",
    departmentHead: "John Doe",
    totalEmployees: "26",
  },
  {
    id: 3,
    department: "Support",
    departmentHead: "John Doe",
    totalEmployees: "45",
  },
  {
    id: 4,
    department: "Accounts",
    departmentHead: "John Doe",
    totalEmployees: "8",
  },
];

const Departments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const employeesPerPage: number = 10;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const handleEdit = (id: number) => {
    // Handle edit functionality
  };

  const handleDelete = (id: number) => {
    // Handle delete functionality
  };

  const indexOfLastEmployee: number = currentPage * employeesPerPage;
  const indexOfFirstEmployee: number = indexOfLastEmployee - employeesPerPage;
  const currentEmployees: Employee[] = departmentsList
    .filter((employee) =>
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DefaultLayout>
      <div className="max-w-12xl mx-auto">
        <Breadcrumb pageName="Departments" />
        {/* <div className=" flex items-center justify-end">
          <button className=" bg-red px-5 py-2 text-white">Add New</button>
        </div> */}
        <div className="my-4 flex items-center justify-end">
          {/* <h2 className="text-xl font-semibold">Employees List</h2> */}
          <input
            type="text"
            placeholder="Search departments"
            value={searchTerm}
            onChange={handleSearch}
            className="w-[250px] rounded border p-2"
          />
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-black text-white">
            <tr>
              <th className=" text-left px-6 py-6">Department Name</th>
              <th className=" text-left">Department Head</th>
              <th className=" text-left">Total Employees</th>
              <th className=" text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className=" border-y-2 border-[#dcdcdc]">
                <td className="px-6 py-6">{employee.department}</td>
                <td>{employee.departmentHead}</td>
                <td>{employee.totalEmployees}</td>
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
            totalEmployees={departmentsList.length}
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

export default Departments;
