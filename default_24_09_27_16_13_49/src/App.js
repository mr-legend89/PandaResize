import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PdfUploader from './components/PdfUploader';
import PdfMerger from './components/PdfMerger';
import PdfSplitter from './components/PdfSplitter';
import PdfCompressor from './components/PdfCompressor';
import PdfConverter from './components/PdfConverter';
import CustomHeader from './components/CustomHeader';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <CustomHeader />
        <Switch>
          <Route path="/" exact component={PdfUploader} />
          <Route path="/merge" component={PdfMerger} />
          <Route path="/split" component={PdfSplitter} />
          <Route path="/compress" component={PdfCompressor} />
          <Route path="/convert" component={PdfConverter} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
