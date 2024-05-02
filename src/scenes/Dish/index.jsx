    import React, { useState ,useEffect } from 'react';
    import { Modal, Form, Input } from 'antd';
    import { PlusOutlined } from '@ant-design/icons';
    import { useTheme } from '@mui/material/styles'; // Import useTheme hook from Material-UI
    import { Pagination } from "antd"; 
    import { useDispatch, useSelector } from 'react-redux'; 

    import { fetchDishes ,createNewDish} from '../../features/dishSlice';
    import {
    
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    } from 'antd'; 



    const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
    };

    const products = [
    {
        id: 1,
        name: 'Product 1',
        category: 'Category 1',
        price: '$10.99',
        status: 'In Stock',
        imageUrl: 'https://www.regal.fr/sites/art-de-vivre/files/r42_ratatouille-revisitee2_bw.jpg',
    }, {
        id: 2,
        name: 'Product 2',
        category: 'Category 2',
        price: '$19.99',
        status: 'Out of Stock',
        imageUrl: 'https://i.pinimg.com/originals/ea/da/37/eada37d396e5a3d61a9aa4c979256e18.jpg',
    },
    {
        id: 3,
        name: 'Product 3 ',
        category: 'Category 2',
        price: '$19.99',
        status: 'Out of Stock',
        imageUrl: 'https://th.bing.com/th/id/OIP.VDbkt5tZmBjo9_M-bjqQdwHaLH?pid=ImgDet&w=204&h=306&c=7&dpr=1.5',
    },
    ];

    const Table = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const theme = useTheme(); // Access the current theme 
    const dispatch = useDispatch(); // Initialiser useDispatch pour pouvoir dispatcher l'action

    // Utiliser useSelector pour extraire les produits de l'état global
    const products = useSelector((state) => state.dish.dishes); 
    const [form] = Form.useForm(); // Define the form variable using the useForm hook
    useEffect(() => {
        // Dispatch de l'action fetchDishes dès que le composant est monté
        dispatch(fetchDishes());
    }, [dispatch]); // Assurez-vous de passer dispatch comme dépendance pour éviter les avertissements ESLint

    console.log(products.data)
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = async () => {
        try {
        const values = await form.validateFields();
        // Dispatch action to create a new dish with form values
        dispatch(createNewDish(values));
        form.resetFields(); // Reset form fields after successful submission
        setIsModalVisible(false); // Hide modal
        } catch (error) {
        console.error('Validation failed:', error);
        }
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    


















    
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Adjust this value based on your button's height
        marginTop: '60px',
        background: theme.palette.mode === 'dark' ? theme.palette.secondary[500] : 'white', // Dynamically set color based on theme
    };

    return (
        <div className="container mx-auto" style={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.default }}>
        <div className="flex justify-between items-center my-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <button
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
            onClick={showModal}
            >
            Add Product
            </button>
        </div>
        <table className={`min-w-full border-collapse ${theme.palette.mode === 'dark' ? 'text-white' : 'text-black'}`}>
            <thead className={`${theme.palette.mode === 'dark' ? 'bg-[#333]' : 'bg-[#28AF61]'}`}>
            <tr>
                <th className="py-1 px-6 text-left font-semibold tracking-wider">ID</th>
                <th className="py-1 px-6 text-left font-semibold tracking-wider">Image</th>
                <th className="py-1 px-6 text-left font-semibold tracking-wider">Name</th>
                <th className="py-1 px-6 text-left font-semibold tracking-wider">Category</th>
                <th className="py-1 px-6 text-left font-semibold tracking-wider">Price</th>
                <th className="py-1 px-6 text-left font-semibold tracking-wider">Stock</th>
                <th className="py-1 px-6 text-left font-semibold tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody className={`${theme.palette.mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>
            {(products.data) && products.data.map(product => (
                <tr key={product.id}>
                <td className="border py-1 px-6">{product._id}</td>
                <td className="border py-1 px-6 flex justify-center">
                    {console.log(product.image)}
                    {product.image && product.image.url && (
        <img 
        src={product.image.url} 
        alt="Product Image" 
        style={{ width: '60px', height: '60px', borderRadius: '10px' }} 
        className="object-cover"
        />
    )}
                </td>
                <td className="border py-1 px-6">{product.name}</td>
                <td className="border py-1 px-6">{product.category.name}</td>
                <td className="border py-1 px-6">{product.price}</td>
                <td className="border py-1 px-6">
                    <span className="border border-green-500 text-green-500 py-1 px-3 rounded-full text-xs">{product.stock}</span>
                </td>
                <td className="iconEditDelete flex items-center justify-center border-t border-white py-1 px-6">
                    <div className="mr-2">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="green" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                    </div>
                    <div>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <div style={containerStyle }>
            <Pagination defaultCurrent={1} total={50} />
        </div>
        <Modal
            title="Add Product"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ style: { backgroundColor: 'green', borderColor: 'green' } }}
            cancelButtonProps={{ style: { backgroundColor: 'grey', borderColor: 'grey', color: 'white' } }}
        >
            <Form 
            form={form} 
            name="addProductForm"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the product name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please input the product category!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input the product price!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please input the dishe status!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="Description"
                rules={[{ required: true, message: 'Please input the dishe Description!' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
                label="Ingrédients"
                name="ingredients"
                rules={[{ required: true, message: 'Veuillez saisir les ingrédients du plat!' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </button>
                </Upload>
            </Form.Item>


            </Form>
        </Modal>
        </div>
    );
    };

    export default Table;
    // import React, { useState, useEffect } from 'react';
    // import { Modal, Button, Form, Input } from 'antd';
    // import { PlusOutlined } from '@ant-design/icons';
    // import { useTheme } from '@mui/material/styles'; // Import useTheme hook from Material-UI
    // import { Pagination } from "antd";
    // import { useDispatch, useSelector } from 'react-redux';
    // import { fetchProducts, deleteProduct } from './actions/productActions';

    // const theme = useTheme();

    // const Table = () => {
    //   const [isModalVisible, setIsModalVisible] = useState(false);
    //   const [editingProduct, setEditingProduct] = useState(null);
    //   const [deletingProductId, setDeletingProductId] = useState(null);
    //   const dispatch = useDispatch();
    //   const products = useSelector((state) => state.products);

    //   useEffect(() => {
    //     dispatch(fetchProducts());
    //   }, [dispatch]);

    //   const showModal = () => {
    //     setIsModalVisible(true);
    //   };

    //   const handleOk = () => {
    //     setIsModalVisible(false);
    //     setEditingProduct(null);
    //   };

    //   const handleCancel = () => {
    //     setIsModalVisible(false);
    //     setEditingProduct(null);
    //   };

    //   const handleEdit = (product) => {
    //     setEditingProduct(product);
    //     showModal();
    //   };

    //   const handleDelete = (productId) => {
    //     setDeletingProductId(productId);
    //     // Dispatch deleteProduct action
    //     dispatch(deleteProduct(productId));
    //   };

    //   return (
    //     <div className="container mx-auto" style={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.default }}>
    //       {/* Your table rendering logic */}
    //       <div>
    //         {products.map((product) => (
    //           <div key={product.id}>
    //             <span>{product.name}</span>
    //             <Button onClick={() => handleEdit(product)}>Edit</Button>
    //             <Button onClick={() => handleDelete(product.id)}>Delete</Button>
    //           </div>
    //         ))}
    //       </div>

    //       {/* Add Product Modal */} 
    //
    //       <Modal
    //         title={editingProduct ? "Edit Product" : "Add Product"}
    //         visible={isModalVisible}
    //         onOk={handleOk}
    //         onCancel={handleCancel}
    //       >
    //         {/* Your form for adding/editing products */}  
    {/* <FormT
    name="addProductForm"
    initialValues={{ remember: true }}
    // onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    >
    <Form.Item
    label="Name"
    name="name"
    rules={[{ required: true, message: 'Please input the product name!' }]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    label="Category"
    name="category"
    rules={[{ required: true, message: 'Please input the product category!' }]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    label="Price"
    name="price"
    rules={[{ required: true, message: 'Please input the product price!' }]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    label="Status"
    name="status"
    rules={[{ required: true, message: 'Please input the dishe status!' }]}
    >
    <Input />
    </Form.Item>

    <Form.Item
    label="Description"
    name="Description"
    rules={[{ required: true, message: 'Please input the dishe Description!' }]}
    >
    <Input.TextArea rows={4} />
    </Form.Item>
    <Form.Item
    label="Ingrédients"
    name="ingredients"
    rules={[{ required: true, message: 'Veuillez saisir les ingrédients du plat!' }]}
    >
    <Input.TextArea rows={4} />
    </Form.Item>

    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
    <Upload action="/upload.do" listType="picture-card">
        <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    </Upload>
    </Form.Item>


    </Form>


    */}

            
    //       </Modal>

    //       {/* Pagination */}
    //       <Pagination defaultCurrent={1} total={50} />
    //     </div>
    //   );
    // };

    // export default Table;