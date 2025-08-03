import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { format, parseISO } from 'date-fns';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
);

function SummaryChart({ expenses = [] }) {
    if (!expenses || expenses.length === 0) {
        return (
            <div className="summary-chart">
                <h2>Spending Analysis</h2>
                <p>No data to display</p>
            </div>
        );
    }

    const weeklyTotals = [0, 0, 0, 0];
    const currentMonth = format(new Date(), 'yyyy-MM');

    expenses.forEach(expense => {
        if (format(parseISO(expense.date), 'yyyy-MM') === currentMonth) {
            const day = parseInt(format(parseISO(expense.date), 'd'), 10);
            const week = Math.floor((day - 1) / 7);
            if (week >= 0 && week <= 3) {
                weeklyTotals[week] += expense.amount;
            }
        }
    });

    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const barChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Weekly Spending ($)',
            data: weeklyTotals,
            backgroundColor: '#4bc0c0',
            borderColor: '#4bc0c0',
            borderWidth: 1
        }]
    };

    const pieChartData = {
        labels: Object.keys(categoryTotals),
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                '#9966FF', '#FF9F40', '#8AC24A'
            ]
        }]
    };

    return (
        <div className="summary-chart">
            <h2>Spending Analysis</h2>

            <div className="chart-container">
                {/* Bar Chart - Weekly Spending */}
                <div className="chart-section">
                    <h3>Weekly Spending This Month</h3>
                    <div className="chart-wrapper">
                        <Bar
                            data={barChartData}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Amount ($)'
                                        }
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Weeks of Month'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Pie Chart - Category Breakdown */}
                <div className="chart-section">
                    <h3>Spending by Category</h3>
                    <div className="chart-wrapper">
                        <Pie
                            data={pieChartData}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const label = context.label || '';
                                                const value = context.raw || 0;
                                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                const percentage = Math.round((value / total) * 100);
                                                return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SummaryChart;