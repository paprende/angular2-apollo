import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';
import { print } from 'graphql-tag/printer';

// quick way to add the subscribe and unsubscribe functions to the network interface
export function addGraphQLSubscriptions(networkInterface: any, wsClient: Client): any {
  return Object.assign(networkInterface, {
    subscribe(request: any, handler: any): number {
      return wsClient.subscribe({
        query: print(request.query),
        variables: request.variables,
      }, handler);
    },
    unsubscribe(id: number): void {
      wsClient.unsubscribe(id);
    }
  });
}

const wsClient = new Client('ws://localhost:8090');

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql',
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: r => r['id'],
});
