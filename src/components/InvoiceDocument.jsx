import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

// Create InvoiceDocument component
const InvoiceDocument = ({ buyerName, buyerAddress, selectedProducts, products, calculateTotal }) => {
  return (
    <Document>
      <Page>
        <View>
          <Text>Buyer Name: {buyerName}</Text>
          <Text>Buyer Address: {buyerAddress}</Text>
        </View>
        <View>
          <Text>Selected Products:</Text>
          {selectedProducts.map((productName) => {
            const product = products.find((prod) => prod.name === productName);
            return (
              <View key={productName}>
                <Text>{productName} - ${product.price}</Text>
              </View>
            );
          })}
        </View>
        <View>
          <Text>Total: ${calculateTotal()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
