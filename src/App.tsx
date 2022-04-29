import React from 'react';
import Layout from './components/Layout';
import './styles/global.css';
import './styles/index.css'

function App() {
  return (
    <Layout
      mainContent={<span>Content</span>}
      footerContent={<span>Footer</span>}
      sliderContent={<span>Slider</span>}
    />
  );
}

export default App;
