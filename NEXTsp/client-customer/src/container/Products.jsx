import React from 'react';
import Header from '../components/Header';
import { Breadcrumb } from '../components';
import ImageSection from '../components/Products/ImageSection';

function Products(props) {
    const images = [
        'https://product.hstatic.net/200000722513/product/n-msi-geforce-rtx-3080-suprim-x-10g-3_7f9133eecca34daabde832df47700a6e_796e5d1e3de34980b782df714bd8010f_grande.png',
        'https://product.hstatic.net/200000722513/product/msi-geforce-rtx-3080-suprim-x-10g-666_2f2d2b82cebb46bfbbf41e68a09662d7_9b52bb35f18142c49fa3373b13ceb8dd_grande.png',
        'https://product.hstatic.net/200000722513/product/n-msi-geforce-rtx-3080-suprim-x-10g-1_229906506af3424a9272a544c702f6a4_34b4bd6f324e4d56876866aff59fa77a_grande.png',
        'https://product.hstatic.net/200000722513/product/n-msi-geforce-rtx-3080-suprim-x-10g-2_408631a7dbba409c87604632d7b47366_c4483fd6004b44d4903124aac491fdc6_grande.png'
    ];
    return (
        <div>
            <Header></Header>
            <div className="container mx-auto">
            <Breadcrumb></Breadcrumb>
            <ImageSection images={images}></ImageSection>
            </div>
        </div>
    );
}

export default Products;