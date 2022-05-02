import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CharacterContextProvider } from './components/CharacterContextManagement';
import CharacterDetail from './components/CharacterDetail';
import CharacterListing from './components/CharacterListing';
import Layout from './components/Layout';
import './styles/global.css';
import './styles/index.css'

// queryClient is a QueryClient instance that will be used by all components to use react query
const queryClient = new QueryClient()

function App() {

  return (
    // Provide the client to your App
    <CharacterContextProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Layout
          mainContent={<CharacterListing />}
          sliderContent={
            <CharacterDetail />
          }
        />
      </QueryClientProvider>
    </CharacterContextProvider>
  );
}

export default App;
