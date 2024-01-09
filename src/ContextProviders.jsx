import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CookiesProvider } from './hooks/Cookies';
import { AccountsDataProvider } from './hooks/AccountsData';

const queryClient = new QueryClient();

function ContextProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AccountsDataProvider>
                <CookiesProvider>{children}</CookiesProvider>
            </AccountsDataProvider>
        </QueryClientProvider>
    );
}

export default ContextProviders;
