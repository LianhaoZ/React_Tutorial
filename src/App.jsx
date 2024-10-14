import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, CourseForm } from "./Pages";
import { useProfile } from "./utilities/profile";

const queryClient = new QueryClient();

const App = () => {
  const [profile, profileLoading, profileError] = useProfile();
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (!profile) return <h1>No profile data</h1>;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage profile={profile} />} />
          <Route path="/course/:courseId/edit" element={<CourseForm />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default App;
