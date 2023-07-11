"use client";
import ProductComponent from "@/components/product.component";
import React, {ChangeEvent, useEffect} from "react";
import productsList from "@/products.json";

export default function ProductsComponent() {
    const [products, setProducts] = React.useState([...productsList]);
    const [size, setSize] = React.useState('text-xl');
    const [sizeNumber, setSizeNumber] = React.useState(1);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [totalProducts, setTotalProducts] = React.useState(0);

    const handleSetSize = (value: string) => {
      setSizeNumber(Number(value));
    }

    const handleSetProducts = (product: any, index:number) => {
        products[index] = product;
        setProducts([...products]);
    }

    useEffect(()=>{
        let newTotalPrice = 0;
        let newTotalProducts = 0;
        products.map(product=>{
            if(product.selected)
            {
                newTotalPrice = Number(newTotalPrice) + Number(product.totalPrice);
                newTotalProducts = Number(newTotalProducts) + Number(product.quantity);
            }
        });
        setTotalProducts(newTotalProducts);
        setTotalPrice(newTotalPrice);
    },[products])

    useEffect(()=>{
        if(sizeNumber>1)
        {
            setSize('text-'+sizeNumber+'xl')
        }else{
            setSize('text-xl')
        }
    },[sizeNumber])

    return (
        <main className="flex flex-col min-h-screen sm:p-4 md:p-10 lg:p-24">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 lg:justify-between md:justify-between sm:justify-center mx-auto w-full sm:p-1 md:p-3 lg:p-6">
                <div className="p-2 font-bold text-black lg:text-left md:text-left sm:text-center">
                    <label htmlFor="size">Font Size</label>
                    <input type="range" id="size" name="size"
                           min="1" max="3" onChange={(event)=>handleSetSize(event.target.value)} defaultValue={sizeNumber}  step="1" />
                </div>
                <div className="p-2 flex flex-col font-bold text-black lg:text-right md:text-right sm:text-center">
                    <div>Total Products:{totalProducts.toFixed(2)}</div>
                    <div>Total Price:{totalPrice.toFixed(2)}</div>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 justify-between mx-auto">
                {products.map((product, index) => <ProductComponent key={index} product={product} size={size} handleSetProducts={handleSetProducts} index={index}/>)}
            </div>
        </main>
    )
}
