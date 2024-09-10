"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "./Detail.module.css";
import  { User } from "../page"


export default function Detail({ params }: { params: { id: number } }) {
  const router = useRouter();

  // Fetch user details with React Query
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ["detail", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://dummyjson.com/users/${params.id}`,
      );
      return data;
    },
  });

  const handleBackClick = () => {
    router.push("/users");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Detail</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching user details</p>
      ) : (
        data && (
          <div className={styles.userDetail}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>
                {`${data.firstName} ${data.lastName}`}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Age:</span>
              <span className={styles.value}>{data.age}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Gender:</span>
              <span className={styles.value}>{data.gender}</span>
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={handleBackClick}
            >
              Back
            </button>
          </div>
        )
      )}
    </div>
  );
}
