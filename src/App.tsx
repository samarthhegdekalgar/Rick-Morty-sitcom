import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import './styles/global.css';
import './styles/index.css'

const queryClient = new QueryClient()
function App() {

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Layout
        mainContent={<span>Content</span>}
        footerContent={<span>Footer</span>}
        sliderContent={<span>Slider</span>}
      />
    </QueryClientProvider>
  );
}

export default App;
