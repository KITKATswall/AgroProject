let myChart = null; // Графикті сақтауға арналған айнымалы

function calculateAll() {
    // 1. Енгізілген мәндерді алу
    const type = document.getElementById('animalType').value;
    const count = parseInt(document.getElementById('animalCount').value) || 0;
    const months = parseInt(document.getElementById('months').value) || 0;
    const meatPrice = parseInt(document.getElementById('meatPrice').value) || 0;

    // 2. Статистикалық деректер базасы (1 айға шаққанда)
    // exp = шығын (теңге), gain = салмақ қосу (кг)
    const animalStats = {
        horse: { exp: 15000, gain: 15 },
        cow: { exp: 18000, gain: 25 },
        sheep: { exp: 3000, gain: 4 }
    };

    const stats = animalStats[type];

    // 3. Негізгі формулалар
    const totalExpense = stats.exp * months * count;       // Жалпы шығын
    const totalWeight = stats.gain * months * count;       // Қосылған салмақ
    const revenue = totalWeight * meatPrice;               // Түскен табыс
    const netProfit = revenue - totalExpense;              // Таза пайда

    // 4. Нәтижені экранға шығару (әдемі форматпен)
    document.getElementById('totalExpense').innerText = totalExpense.toLocaleString();
    document.getElementById('totalWeight').innerText = totalWeight.toLocaleString();
    document.getElementById('netProfit').innerText = netProfit.toLocaleString();

    // Нәтиже блогын көрсету
    document.getElementById('result').style.display = 'block';

    // 5. Графикті салу
    drawChart(totalExpense, netProfit);
}

function drawChart(expense, profit) {
    const ctx = document.getElementById('economicsChart').getContext('2d');
    
    // Егер ескі график болса, оны өшіреміз (қабаттасып кетпеу үшін)
    if (myChart) {
        myChart.destroy();
    }

    // Жаңа график құру
    myChart = new Chart(ctx, {
        type: 'doughnut', // Дөңгелек диаграмма
        data: {
            labels: ['Шығын (Жем-шөп)', 'Таза пайда'],
            datasets: [{
                data: [expense, profit > 0 ? profit : 0], // Пайда минус болса, 0 деп көрсетеміз
                backgroundColor: [
                    '#ef4444', // Шығын - Қызыл
                    '#10b981'  // Пайда - Жасыл
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: 'white', font: { size: 12 } }
                }
            }
        }
    });
}

// Модальды терезені ашу/жабу функциялары
function toggleModal() {
    const modal = document.getElementById('infoModal');
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

// Терезеден тыс жерді басқанда жабылуы үшін
window.onclick = function(event) {
    const modal = document.getElementById('infoModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}