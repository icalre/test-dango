import Image from 'next/image';
import React, {Component, useState} from "react";
export default class ProductComponent extends Component<{ product: any, size:string, handleSetProducts:any, index:number }> {

    render() {
        let {product, size, handleSetProducts, index} = this.props;
        const handleAddProduct = (product: any) => {

            if(product.selected)
            {
                product.quantity = 1;
                product.totalPrice = product.unitPrice;
            }

            product.selected =  !product.selected;
            handleSetProducts(product, index);
        }

        const handleQuantityProduct = (product: any, value:string) => {
            product.quantity = value;
            product.totalPrice = Number(value) * Number(product.unitPrice);
            handleSetProducts(product, index);
        }

        const handleTitleProduct = (product: any, value:string) => {
            product.title = value;
            handleSetProducts(product, index);
        }
        const handleEditProduct = (product: any) => {
            product.edit = !product.edit;
            handleSetProducts(product, index);
        }

        return (
            <div className="sm:p-1 md:p-3 lg:p-6 max-w-sm bg-white rounded-xl shadow-lg flex flex-col items-center m-5 justify-between">
                <div className="p-2">
                    <div className="shrink my-2">
                        <Image
                            src={product.image}
                            alt="Vercel Logo"
                            width="60"
                            height="60"
                            priority
                            className="h-16 mx-auto"
                        />
                    </div>
                    {!product.edit && <div className={`text-${size} font-bold text-black text-center cursor-pointer`} onClick={()=>handleEditProduct(product)}>{product.title}</div>}
                    {product.edit && <div className={`text-${size} font-bold text-black text-center`}>
                        <input className="shadow-sm border focus:outline-none w-12 text-center p-1 w-full" type="text" value={product.title} onChange={(event)=>handleTitleProduct(product, event.target.value)}/>
                        <button className="bg-indigo-500 p-2 rounded-md text-white m-1" onClick={()=>handleEditProduct(product)}>
                            Save
                        </button>
                    </div>}

                    <div className="flex flex-row justify-between py-6 text-sm">
                        <div className="font-bold text-black">$ {product.totalPrice.toFixed(2)}</div>
                        <div>
                            <input className="shadow-sm border focus:outline-none w-12 text-center" type="number" value={product.quantity} onChange={(event)=>handleQuantityProduct(product, event.target.value)}/>
                        </div>
                    </div>
                    <p className="text-slate-500 pt-2 pb-2">
                        {product.description}
                    </p>
                </div>
                <div className="flex flex-col">
                    <button className={!product.selected ? 'bg-indigo-500 p-2 rounded-md text-white m-1' : 'bg-red-500 p-2 rounded-md text-white m-1'} onClick={()=>handleAddProduct(product)}>
                        {!product.selected ? 'Add to cart' : 'Remove Product'}
                    </button>
                    <a href="#" className="p-2 m-2">
                        Learn More
                    </a>
                </div>
            </div>
        )
    }
}
