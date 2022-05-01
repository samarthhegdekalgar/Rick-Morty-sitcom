import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CharacterDetail from './components/CharacterDetail';
import CharacterListing from './components/CharacterListing';
import Layout from './components/Layout';
import './styles/global.css';
import './styles/index.css'

const queryClient = new QueryClient()
function App() {

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Layout
        mainContent={<CharacterListing />}
        sliderContent={
          <CharacterDetail />
        }
      />
    </QueryClientProvider>
  );
}

export default App;
