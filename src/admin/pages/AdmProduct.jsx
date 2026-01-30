import { useEffect, useState } from 'react';
import { getStickers } from '../../data/listSticker';

import AdmProductList from '../components/AdmProductList';
import AdmProductDetail from '../components/AdmProductDetail';
import { Outlet } from 'react-router-dom';

const AdmProduct = () => {
    const [view, setView] = useState('list'); // 'list' or 'detail' or 'create'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getStickers().then(setProducts);
    }, []);

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
