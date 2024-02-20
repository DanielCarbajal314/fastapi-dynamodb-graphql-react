import './App.css';
import { ApolloWrapper } from './Bootstrap/ApolloWrapper';
import { router } from './Pages';
import { RouterProvider } from 'react-router-dom';

function App() {
    return (
        <>
            <ApolloWrapper>
                <RouterProvider router={router} />
            </ApolloWrapper>
        </>
    );
}

export default App;
