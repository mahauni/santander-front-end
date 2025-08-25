import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AnalysisPageRoute from './analysisPage.tsx';
import LoginPageRoute from './loginPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPageRoute />,
    },
    {
        path: '/analysis',
        element: <AnalysisPageRoute />,
    },
]);

const queryClient = new QueryClient()

function App() {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </div>
    )
}

export default App
