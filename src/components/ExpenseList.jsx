import PropTypes from 'prop-types';

function ExpenseList({ expenses = [], onDelete = () => { }, onClearAll = () => { } }) {
    if (!expenses || expenses.length === 0) {
        return (
            <div className="expense-list">
                <h2>Your Expenses</h2>
                <p>No expenses added yet.</p>
            </div>
        );
    }

    return (
        <div className="expense-list">
            <div className="expense-list-header">
                <h2>Your Expenses</h2>
                <button
                    onClick={onClearAll}
                    className="clear-all-btn"
                >
                    Clear All
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description || '-'}</td>
                            <td>${expense.amount.toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => onDelete(expense.id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ExpenseList.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            description: PropTypes.string,
            amount: PropTypes.number.isRequired,
        })
    ),
    onDelete: PropTypes.func,
    onClearAll: PropTypes.func,
};

export default ExpenseList;