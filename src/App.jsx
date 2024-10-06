import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, CourseForm } from "./Pages";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/course/:courseId/edit" element={<CourseForm />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default App;
