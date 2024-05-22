document.addEventListener('DOMContentLoaded', function () {
    const values = [
        { year: 'FY 19-20', financials: { sale: 122953, profit: 25940, patax: 19684, eps: 204.2, dpshare: 342.6, capex: 1522 } },
        { year: 'FY 20-21', financials: { sale: 132902, profit: 28775, patax: 20824, eps: 216.0, dpshare: 200.0, capex: 4741 } },
        { year: 'FY 21-22', financials: { sale: 146649, profit: 32288, patax: 21184, eps: 219.7, dpshare: 200.0, capex: 7308 } },
        { year: 'FY 22-23', financials: { sale: 167895, profit: 33659, patax: 23905, eps: 247.9, dpshare: 220.0, capex: 5407 } },
        { year: 'FY 23-24', financials: { sale: 191141, profit: 37789, patax: 25708, eps: 263.5, dpshare: 240.0, capex: 6104 } }
    ];

    let yAxisKey = 'financials.sale';
    let activeTab = 'sale';
    let chart = null;

    function createChart() {
        const data = {
            datasets: [{
                label: 'Constant financial growth over the years',
                data: values,
                backgroundColor: values.map((_, index) => 
                    index === values.length - 1 ? 'rgba(92, 196, 188, 1)' : 'rgba(202, 232, 229, 1)'
                ),
                borderColor: values.map((_, index) => 
                    index === values.length - 1 ? 'rgba(92, 196, 188, 1)' : 'rgba(202, 232, 229, 1)'
                ),
                borderWidth: 1,
                borderRadius: {
                    topLeft: 25,
                },
                parsing: {
                    xAxisKey: 'year',
                    yAxisKey: yAxisKey,
                },
            }],
        };

        const config = {
            type: 'bar',
            data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        formatter: (value, context) => {
                            return value.financials[yAxisKey.split('.')[1]];
                        },
                    },
                },
                barThickness: 72,
                maxBarThickness: 72,
            },
            plugins: [ChartDataLabels],
        };

        if (chart) {
            chart.destroy();
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        chart = new Chart(ctx, config);
    }

    createChart();

    window.updateChart = (value) => {
        yAxisKey = `financials.${value}`;
        activeTab = value;
        document.querySelectorAll('.chartMenu button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(value).classList.add('active');
        createChart();
    };

    window.downloadImage = (format) => {
        const link = document.createElement('a');
        link.download = `chart.${format}`;
        link.href = document.getElementById('myChart').toDataURL(`image/${format}`, 1.0);
        link.click();
    };
});
