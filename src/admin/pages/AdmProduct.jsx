import { useEffect, useState } from 'react';
import { getStickers } from '../../data/listSticker';

import AdmProductList from '../components/AdmProductList';
import AdmProductDetail from '../components/AdmProductDetail';

const AdmProduct = () => {
    const [view, setView] = useState('list'); // 'list' or 'detail'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getStickers().then(setProducts);
    }, []);

    const handleOpenDetail = (product) => {
        setSelectedProduct(product);
        setView('detail');
    };

    const handleBackButton = () => {
        setView('list');
    }

    return (
        <>
            {view === 'list' ? (
                /* --- PRODUCT LIST (TABLE) --- */
                <AdmProductList products={products} handleOpenDetail={handleOpenDetail} />
            ) : (
                /* --- PRODUCT DETAIL VIEW --- */
                <AdmProductDetail selectedProduct={selectedProduct} handleBackButton={handleBackButton} />
            )}
        </>
    );
};

export default AdmProduct;
