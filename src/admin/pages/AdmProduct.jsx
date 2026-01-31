import { useState } from 'react';

import { Outlet } from 'react-router-dom';

const AdmProduct = () => {
    const [view, setView] = useState('list'); // 'list' or 'detail' or 'create'
    const [selectedProduct, setSelectedProduct] = useState(null);
    

    const handleOpenDetail = (product) => {
        setSelectedProduct(product);
        setView('detail');
    };

    const handleViewButton = (v) => {
        setView(v);
    }

    return (
        <Outlet />
        // <>
        //     {view === 'list' ? (
        //         /* --- PRODUCT LIST (TABLE) --- */
        //         <AdmProductList 
        //             products={products} 
        //             handleOpenDetail={handleOpenDetail} 
        //             handleViewButton={handleViewButton} 
        //         />
        //     ) : view === 'detail' ? (
        //         /* --- PRODUCT DETAIL VIEW --- */
        //         <AdmProductDetail 
        //             selectedProduct={selectedProduct} 
        //             handleViewButton={handleViewButton} 
        //         />
        //     ) : (
        //         <AdmProductCreate handleViewButton={handleViewButton} />
        //     )}
        // </>
    );
};

export default AdmProduct;
