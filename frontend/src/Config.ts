const {VITE_GRAPHQL_ENDPOINT} = import.meta.env;

export const enviromentalVariables: {
    GRAPHQL_ENDPOINT:string
} = {
    GRAPHQL_ENDPOINT: VITE_GRAPHQL_ENDPOINT
} 