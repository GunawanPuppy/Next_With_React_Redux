import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../src/app/user/login/page";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Login Component", () => {
  it("should display user ID and token upon successful login", async () => {
    // Mock the response from axios
    const mockResponse = {
      data: {
        id: 1,
        token: "test-token",
      },
    };
    mockedAxios.post.mockResolvedValue(mockResponse);

    // Render the component
    render(<Login />);

    // Simulate user input for login
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Simulate clicking the login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for axios mock call to resolve and any side effects to complete
    await waitFor(() => {
      // Ensure that the post request was made with correct parameters
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://dummyjson.com/user/login",
        { username: "testuser", password: "password123" },
        { headers: { "Content-Type": "application/json" } },
      );
    });

    // You can verify further logic if necessary, such as checking if the UI or state changes accordingly.
  });
});
