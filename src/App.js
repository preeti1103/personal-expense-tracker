import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryChart from './components/SummaryChart';
import './App.css';

function App() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const savedExpenses = localStorage.getItem('expenses');
        if (savedExpenses) {
            try {
                const parsedExpenses = JSON.parse(savedExpenses);
                if (Array.isArray(parsedExpenses)) {
                    setExpenses(parsedExpenses);
                }
            } catch (error) {
                console.error('Failed to parse expenses from localStorage', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = (newExpense) => {
        setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    };

    const deleteExpense = (id) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    };

    const clearAllExpenses = () => {
        if (window.confirm('Are you sure you want to delete ALL expenses?')) {
            setExpenses([]);
        }
    };

    return (
        <div className="app">
            <h1>Expense Tracker</h1>
            <div className="container">
                <div className="left-panel">
                    <ExpenseForm onAddExpense={addExpense} />
                    <ExpenseList
                        expenses={expenses}
                        onDelete={deleteExpense}
                        onClearAll={clearAllExpenses}
                    />
                </div>
                <div className="right-panel">
                    <SummaryChart expenses={expenses} />
                </div>
            </div>
        </div>
    );
}

export default App;