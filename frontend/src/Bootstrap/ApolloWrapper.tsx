import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { enviromentalVariables } from '../Config';

const client = new ApolloClient({
    uri: enviromentalVariables.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
