import React, { useState } from 'react';
import { Button, Typography, Paper, List, ListItem, ListItemText, Select, MenuItem, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from '../components/InvoiceDocument'; // Import InvoiceDocument component

const InvoiceComponent = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const products = useSelector((state) => state.dish.dishes); // Assuming your dish slice contains the products

  const calculateTotal = () => {
    let total = 0;
    selectedProducts.forEach((productName) => {
      const product = products.find((prod) => prod.name === productName);
      if (product) {
        total += product.price;
      }
    });
    return total;
  };

  const handleProductSelect = (event) => {
    setSelectedProducts(event.target.value);
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Invoice
      </Typography>
      <List>
        <ListItem>
          <TextField
            label="Buyer Name"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            fullWidth
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Buyer Address"
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
            fullWidth
          />
        </ListItem>
      </List>
      <Select
        multiple
        value={selectedProducts}
        onChange={handleProductSelect}
        variant="outlined"
        fullWidth
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select products</em>;
          }
          return selected.join(', ');
        }}
      >
        {products.map((product) => (
          <MenuItem key={product.id} value={product.name}>
            {product.name}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="h6" align="right" gutterBottom>
        Total: ${calculateTotal()}
      </Typography>
      <PDFDownloadLink
        document={<InvoiceDocument buyerName={buyerName} buyerAddress={buyerAddress} selectedProducts={selectedProducts} products={products} calculateTotal={calculateTotal} />}
        fileName="invoice.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download Invoice'
        }
      </PDFDownloadLink>
    </Paper>
  );
};

export default InvoiceComponent;
