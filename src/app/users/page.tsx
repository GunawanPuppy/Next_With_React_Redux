"use client"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { RootState } from "../../redux/store";
import {
  setSortField,
  setSortOrder,
  setSearchTerm,
} from "../../redux/Slicer/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface User {
  id: number;
  age: number;
  firstName: string;
  lastName: string;
  password: string;
  gender: string;
}

export default function AllUsers() {
  const dispatch = useDispatch();
  const sortField = useSelector((state: RootState) => state.user.sortField);
  const sortOrder = useSelector((state: RootState) => state.user.sortOrder);
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm);
  const router = useRouter();

  const { register, handleSubmit } = useForm<{ searchTerm: string }>({
    defaultValues: { searchTerm },
  });

  // React Query Fetch Users
  const { data: users = [], refetch } = useQuery<User[], Error>({
    queryKey: ["users", searchTerm, sortField, sortOrder],
    queryFn: async () => {
      let url = "https://dummyjson.com/users";

      if (searchTerm) {
        url += `/search?q=${searchTerm}`;
      }

      if (sortField) {
        // Add sorting parameters only if sortField is specified
        url += `${
          searchTerm ? "&" : "?"
        }sortBy=${sortField}&order=${sortOrder}`;
      }

      const { data } = await axios.get(url);
      return data.users;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: { searchTerm: string }) => {
      dispatch(setSearchTerm(data.searchTerm));
      return Promise.resolve();
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const handleSort = (field: string) => {
    dispatch(setSortField(field));
  };

  const handleOrderChange = (order: "asc" | "desc") => {
    dispatch(setSortOrder(order));
  };

  const handleUserDetail = (id: number) => {
    router.push(`/users/${id}`);
  };

  return (
    <div>
      <h2>User List</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search by name"
          {...register("searchTerm")}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <label>Sort by: </label>
        <button onClick={() => handleSort("firstName")}>Name</button>
        <button onClick={() => handleSort("age")}>Age</button>
        <button onClick={() => handleSort("password")}>Password</button>
      </div>

      <div>
        <label>Order: </label>
        <button onClick={() => handleOrderChange("asc")}>Ascending</button>
        <button onClick={() => handleOrderChange("desc")}>Descending</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Age</th>
            <th>Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>
                <button onClick={() => handleUserDetail(user.id)}>View Detail</button>
              </td>
              <td>{user.age}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
