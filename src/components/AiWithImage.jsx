import React, { useState } from 'react';
import { Button, CircularProgress, Container, Typography, useTheme, Box, TextField, Grid, Paper } from '@mui/material';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from '../helpers/imageHelper';

const AiwithImage = () => {
    const theme = useTheme();
    const genAI = new GoogleGenerativeAI('AIzaSyDXe-79fVCDAfv1gz4ceqH5ubENycwWanI');

    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const aiImageRun = async () => {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent(["What's in this photo?", imageInlineData]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    };

    const handleClick = () => {
        aiImageRun();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // getting base64 from file to render in DOM
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e));

        // generating content model for Gemini Google AI
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    };

    // Converts a File object to a GoogleGenerativeAI.Part object.
    const fileToGenerativePart = async (file) => {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    };

    return (
        <Container>
            <Box mt={3} mb={5}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    AI with Image
                </Typography>
                <Paper variant="outlined" sx={{ p: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="file"
                                onChange={(e) => handleImageChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                onClick={handleClick}
                                disabled={!imageInlineData}
                                sx={{ width: '100%' }}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Box display="flex" justifyContent="center">
                <img src={image} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            <Box mt={3} textAlign="center">
                {loading && !aiResponse && <CircularProgress />}
                {aiResponse && (
                    <Typography variant="body1" component="p" fontWeight="bold" fontSize='30px'>
                        {aiResponse}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default AiwithImage;
