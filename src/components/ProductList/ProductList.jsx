import React, {useState} from 'react';
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые', img: 'https://static.detmir.st/media_pim/224/978/4978224/450/1.jpg?1669368018609'},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', img: 'https://fridaywear.ru/upload/iblock/b54/b54a2767617f37db8a9dcc77bf09a290.jpg'},
    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые',  img: 'https://static.detmir.st/media_pim/224/978/4978224/450/1.jpg?1669368018609'},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая', img: 'https://fridaywear.ru/upload/iblock/b54/b54a2767617f37db8a9dcc77bf09a290.jpg'},
    {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые', img: 'https://static.detmir.st/media_pim/224/978/4978224/450/1.jpg?1669368018609'},
    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая', img: 'https://fridaywear.ru/upload/iblock/b54/b54a2767617f37db8a9dcc77bf09a290.jpg'},
    {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые', img: 'https://static.detmir.st/media_pim/224/978/4978224/450/1.jpg?1669368018609'},
    {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', img: 'https://fridaywear.ru/upload/iblock/b54/b54a2767617f37db8a9dcc77bf09a290.jpg'},
]


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

export const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

    const {tg, queryId, onClose} = useTelegram();

    const onSendData = useCallback(() => {
        
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
            tg.onClose()
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};
 