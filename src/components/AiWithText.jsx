import React, { useState } from 'react';
import { CircularProgress, TextField, Box, Button, Typography } from '@mui/material';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyDXe-79fVCDAfv1gz4ceqH5ubENycwWanI');

    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `random meals related to ${search} category with images and prices`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text); // Log the response text
        const items = extractItemsFromText(text);
        setResponse(items);
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    const extractItemsFromText = (text) => {
        const items = [];
        const regex = /(\d+)\. (.*?)\n!\[(.*?)\]\((.*?)\)\n\*\*Price:\*\* \$([\d.]+)/g;
        let matches;
        while ((matches = regex.exec(text)) !== null) {
            const [, index, name, , imageUrl, price] = matches;
            items.push({
                index: index,
                name: name,
                imageUrl: imageUrl,
                price: price,
            });
        }
        return items;
    }

    return (
        <Box>
            <Box display="flex" mb={3}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder='Search Food with Category using Generative AI'
                    onChange={handleChangeSearch}
                    value={search}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClick}
                    sx={{ marginLeft: '20px' }}
                >
                    Search
                </Button>
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" my={3}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" variant="body1" paragraph>
                    {error}
                </Typography>
            ) : (
                <Box my={3}>
                    {aiResponse.map((item, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <img src={item.imageUrl} alt={item.name} />
                            <Typography variant="body1">Price: ${item.price}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default AiwithText;
