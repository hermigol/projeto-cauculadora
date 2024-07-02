function isValidInput(value) {
    return !isNaN(value) && value >= 0;
}

function calculateHourlyRate() {
    const monthlyCosts = parseFloat(document.getElementById('monthlyCosts').value);
    const desiredSalary = parseFloat(document.getElementById('desiredSalary').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
    const daysPerWeek = parseFloat(document.getElementById('daysPerWeek').value);
    const vacationWeeks = parseFloat(document.getElementById('vacationWeeks').value);

    if (!isValidInput(monthlyCosts) || !isValidInput(desiredSalary) || 
        !isValidInput(hoursPerDay) || !isValidInput(daysPerWeek) || 
        !isValidInput(vacationWeeks) || daysPerWeek > 7 || vacationWeeks > 52) {
        alert("Por favor, insira valores válidos para todos os campos.");
        return null;
    }

    const weeksWorkedPerYear = 52 - vacationWeeks;
    const totalWorkHoursPerYear = hoursPerDay * daysPerWeek * weeksWorkedPerYear;
    const totalAnnualCosts = (monthlyCosts + desiredSalary) * 12;
    const hourlyRate = totalAnnualCosts / totalWorkHoursPerYear;

    document.getElementById('hourlyRateResult').textContent = hourlyRate.toFixed(2);
    return hourlyRate;
}

function calculateProjectCost() {
    const projectHoursPerDay = parseFloat(document.getElementById('projectHoursPerDay').value);
    const duration = parseFloat(document.getElementById('projectDuration').value);
    const hourlyRate = calculateHourlyRate();

    if (hourlyRate === null) {
        return;
    }

    let totalDays = document.getElementById('timeOption').value === 'months' ? duration * 30 : duration;
    const projectCost = projectHoursPerDay * totalDays * hourlyRate;
    
    document.getElementById('projectCostResult').textContent = projectCost.toFixed(2);
}

function updateDurationSlider() {
    const timeOption = document.getElementById('timeOption').value;
    const durationSlider = document.getElementById('projectDuration');
    const durationLabel = document.getElementById('durationLabel');

    if (timeOption === 'days') {
        durationSlider.min = 1;
        durationSlider.max = 30;
        durationSlider.value = 5;
        durationLabel.textContent = 'Duração do Projeto em Dias:';
    } else {
        durationSlider.min = 1;
        durationSlider.max = 12;
        durationSlider.value = 6;
        durationLabel.textContent = 'Duração do Projeto em Meses:';
    }
    displayValue('projectDurationValue', durationSlider.value + (timeOption === 'months' ? ' meses' : ' dias'));
}

function displayValue(elementId, value) {
    document.getElementById(elementId).textContent = value;
}

document.getElementById('hoursPerDay').addEventListener('input', function() {
    displayValue('hoursPerDayValue', this.value + ' horas');
});
document.getElementById('daysPerWeek').addEventListener('input', function() {
    displayValue('daysPerWeekValue', this.value + ' dias');
});
document.getElementById('vacationWeeks').addEventListener('input', function() {
    displayValue('vacationWeeksValue', this.value + ' semanas');
});
document.getElementById('projectHoursPerDay').addEventListener('input', function() {
    displayValue('projectHoursPerDayValue', this.value + ' horas');
});
document.getElementById('projectDuration').addEventListener('input', function() {
    let durationType = document.getElementById('timeOption').value === 'months' ? ' meses' : ' dias';
    displayValue('projectDurationValue', this.value + durationType);
});

window.onload = function() {
    updateDurationSlider();
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.button-toggle');
    const icon = toggleButton.querySelector('i');

    toggleButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
});
