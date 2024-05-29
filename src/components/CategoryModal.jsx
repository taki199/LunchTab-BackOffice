import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const Input = styled('input')({
  display: 'none',
});

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
});

export default function CategoryModal({ open, handleClose, handleSave }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSave = () => {
    const categoryData = {
      image,
      name,
      description,
    };
    handleSave(categoryData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Header>
          <Typography id="modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Header>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <label htmlFor="upload-image">
            <Input accept="image/*" id="upload-image" type="file" onChange={handleImageChange} />
            <Button variant="contained" component="span" sx={{ mb: 2 }}>
              Upload Image
            </Button>
          </label>
          {image && (
            <Box
              sx={{
                width: '100%',
                mb: 2,
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow: 1,
              }}
            >
              <img src={image} alt="category" style={{ width: '100%' }} />
            </Box>
          )}
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
