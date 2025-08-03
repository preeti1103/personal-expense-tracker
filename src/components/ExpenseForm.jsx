import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Other'];

function ExpenseForm({ onAddExpense }) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount || isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        const newExpense = {
            id: uuidv4(),
            amount: parseFloat(amount),
            category,
            date,
            description
        };

        onAddExpense(newExpense);
        setAmount('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2>Add New Expense</h2>
            <div className="form-group">
                <label>Amount ($)</label>
                <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description (Optional)</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What was this expense for?"
                />
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
}

export default ExpenseForm;