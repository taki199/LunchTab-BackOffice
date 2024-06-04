// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Typography,
//   IconButton,
//   Grid,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import CloseIcon from '@mui/icons-material/Close';
// import { updateCategory } from '../features/categorySlice';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   borderRadius: 4,
//   boxShadow: 24,
//   p: 4,
// };

// const Input = styled('input')({
//   display: 'none',
// });

// const Header = styled(Box)({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   mb: 2,
// });

// export default function UpdateCategoryModal({  open, handleClose, category, categoryId  }) {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     image: null,
//   });

//   useEffect(() => {
//     if (category) {
//       setFormData({
//         name: category.name || '',
//         description: category.description || '',
//         image: category.image ? category.image.url : null, // Check if category.image is defined before accessing its properties
//       });
//     } else {
//       setFormData({
//         name: '',
//         description: '',
//         image: null,
//       });
//     }
//   }, [category]);
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (event) => {
//     const imageFile = event.target.files[0];
//     console.log('Selected image file:', imageFile);
//     setFormData((prevState) => ({
//       ...prevState,
//       image: imageFile,
//     }));
//   };

//   const handleRemoveImage = () => {
//     setFormData((prevState) => ({
//       ...prevState,
//       image: null,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('description', formData.description);
//     if (formData.image && typeof formData.image !== 'string') {
//       formDataToSend.append('image', formData.image);
//     }
  
//     console.log('FormData to send:', formDataToSend); // Add this line to check the FormData object before sending
    
//     try {
//       if (categoryId) {
//         const trimmedCategoryId = categoryId.trim(); // Trim the category ID
//         await dispatch(updateCategory({ id: trimmedCategoryId, data: formDataToSend })).unwrap();
//       }
  
//       // Clear the form after successful submission
//       setFormData({
//         name: '',
//         description: '',
//         image: null,
//       });
//       handleClose();
//     } catch (error) {
//       console.error('Error updating category:', error);
//     }
//   };
  
  
  
  
  
  
  
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//     >
//       <Box sx={style}>
//         <Header>
//           <Typography id="modal-title" variant="h6" component="h2">
//             Update Category
//           </Typography>
//           <IconButton aria-label="close" onClick={handleClose}>
//             <CloseIcon />
//           </IconButton>
//         </Header>
//         <Box
//           component="form"
//           sx={{
//             '& .MuiTextField-root': { m: 1, width: '100%' },
//           }}
//           noValidate
//           autoComplete="off"
//           onSubmit={handleSubmit}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 name="name"
//                 label="Name"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="description"
//                 label="Description"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <input
//                 accept="image/*"
//                 id="image-input"
//                 type="file"
//                 style={{ display: 'none' }}
//                 onChange={handleImageChange}
//               />
//               <label htmlFor="image-input">
//                 <Button variant="contained" component="span">
//                   Upload Image
//                 </Button>
//               </label>
//               {formData.image && (
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   {typeof formData.image === 'string' ? (
//                     <img
//                       src={formData.image}
//                       alt="Current"
//                       style={{ width: '50%', height: 'auto', marginRight: '1rem' }}
//                     />
//                   ) : (
//                     <img
//                       src={URL.createObjectURL(formData.image)}
//                       alt="Selected"
//                       style={{ width: '50%', height: 'auto', marginRight: '1rem' }}
//                     />
//                   )}
//                   <Button variant="outlined" onClick={handleRemoveImage}>
//                     Remove Image
//                   </Button>
//                 </Box>
//               )}
//             </Grid>
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Update Category
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }
