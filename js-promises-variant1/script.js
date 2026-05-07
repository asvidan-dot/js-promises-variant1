
function simulateAsyncAction(actionName, delay, orderId, failChance = 0.2) {
    return new Promise((resolve, reject) => {
        console.log(`[ПОЧАТОК]: ${actionName} для замовлення #${orderId}...`);
        
        setTimeout(() => {
            if (Math.random() < failChance) {
                reject(new Error(`Помилка на етапі: ${actionName}`));
            } else {
                console.log(`[УСПІХ]: ${actionName} завершено.`);
                resolve(orderId);
            }
        }, delay);
    });
}

function checkAvailability(orderId) {
    return simulateAsyncAction("Перевірка наявності", 1000, orderId);
}

function reserveItems(orderId) {
    return simulateAsyncAction("Резервування товарів", 1000, orderId);
}
function processPayment(orderId) {
    const amount = (Math.random() * 500 + 100).toFixed(2);
    console.log(`Сума до сплати: ${amount} грн.`);
    return simulateAsyncAction("Обробка оплати", 1500, orderId);
}

function scheduleDelivery(orderId) {
    return simulateAsyncAction("Планування доставки", 1000, orderId);
}

function startOrder() {
    const orderId = Math.floor(Math.random() * 10000);
    const logElement = document.getElementById('log');
    logElement.innerHTML = `<p>🚀 Запуск замовлення #${orderId}</p>`;

    checkAvailability(orderId)
        .then(id => reserveItems(id))
        .then(id => processPayment(id))
        .then(id => scheduleDelivery(id))
        .then(id => {
            logElement.innerHTML += `<p style="color: green;">✅ Замовлення #${id} успішно виконано!</p>`;
        })
        .catch(error => {
            
            console.error(error.message);
            logElement.innerHTML += `<p style="color: red;">❌ ${error.message}. Спробуйте ще раз.</p>`;
        })
        .finally(() => {
            logElement.innerHTML += `<p>🏁 Процес завершено.</p>`;
        });
}