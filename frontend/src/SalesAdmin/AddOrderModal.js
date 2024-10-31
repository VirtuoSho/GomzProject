import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AddItemModal.css';

const AddOrderModal = ({ isOpen, onClose, onAdd }) => {
    const [customerName, setCustomerName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [modeOfPayment, setModeOfPayment] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(''); // New state for quantity
    const [items, setItems] = useState([]); 
    const [selectedItemId, setSelectedItemId] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOrder = { 
            itemId: selectedItemId,
            customerName,
            date,
            location,
            modeOfPayment,
            paymentStatus,
            price,
            quantity // Include quantity in the order data
        };
        await onAdd(newOrder); 
        onClose(); 
    };

    return (
        <div id="addModal" className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Order</h2>
                <form onSubmit={handleSubmit}>
                    <select 
                        value={selectedItemId} 
                        onChange={(e) => setSelectedItemId(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Select Item</option>
                        {items.map(item => (
                            <option key={item.itemId} value={item.itemId}>
                                {item.itemName}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Mode of Payment"
                        value={modeOfPayment}
                        onChange={(e) => setModeOfPayment(e.target.value)}
                        required
                    />
                    <select 
                        value={paymentStatus} 
                        onChange={(e) => setPaymentStatus(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Select Payment Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Not Paid">Unpaid</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    <button type="submit">Add Order</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddOrderModal;
