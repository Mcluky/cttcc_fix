/*
Calculations needed:

Pulses given:
    1. Period given -> return Prescaler & ARR | Done
    2. ARR and Period given  -> return Prescaler | Done
    3. Prescaler and Period given -> return ARR | Done
    4. ARR and Prescaler given  -> return Period | Done

Pulses not given:
    1. Period, Prescaler and RRR given -> return Pulses | Done


    
*/

const prescalerMax = 2 ** 16

export const getPrescalerAndARR = (pulsesInHz, periodInNs, arrMax = 2 ** 32) => {
    let solutions = []
    for (let prescaler = 0; prescaler < prescalerMax; prescaler++) {
        const arr = (periodInNs * pulsesInHz) / (10 ** 9 * prescaler)
        if (arr <= arrMax && arr % 1 == 0){ 
            solutions.push({prescaler, arr})
        }
    }
    return solutions
}

function getARR(pulsesInHz, periodInNs, prescaler) {
    /*
    let ticksInHz = pulsesInHz / prescaler
    let secondsPerTick = 1 / ticksInHz;
    let nsPerTick = 10**9 /ticksInHz;

    let arr = periodInNs / nsPerTick
    let directArr = periodInNs / ( 10**9 / (pulsesInHz / prescaler))
    let directerArr = (periodInNs * pulsesInHz) / ( 10**9 * prescaler)
    */

    return (periodInNs * pulsesInHz) / (10 ** 9 * prescaler)
}

function getPrescaler(pulsesInHz, periodInNs, arr) {
    /*
    let nsPerTick = periodInNs / arr
    let sPerTick = nsPerTick / 10**9
    let ticksInHz = 1 / sPerTick

    let prescaler = pulsesInHz / ticksInHz
    let better1 = pulsesInHz / (1 / ((periodInNs / arr) / 10**9))
    let better2 = pulsesInHz / (10**9 / (periodInNs / arr))
    let better3 = (pulsesInHz * periodInNs) / (arr * 10**9)
    */

    return (periodInNs * pulsesInHz) / (10 ** 9 * arr)
}

function getPeriodInSeconds(pulsesInHz, prescaler, arr) {
    /*
    let ticksInHz = pulsesInHz / prescaler
    let secondsPerTick = 1 / ticksInHz
    let period = secondsPerTick * arr
    let better = prescaler * arr / pulsesInHz
    */

    return prescaler * arr / pulsesInHz
}

function getPulsesInHz(periodInNs, arr, prescaler){
    /*
    let nsPerPulse = periodInNs / (arr * prescaler)
    let secondsPerPulse = nsPerPulse / 10 ** 9
    let pulsesInHz = 1 / secondsPerPulse

    let better1 = 1 / (periodInNs / (arr * prescaler * 10 ** 9))
    let better2 = (arr * prescaler * 10 ** 9) / periodInNs
    */

    return (arr * prescaler * 10 ** 9) / periodInNs
}

// Testing

let pulsesInHz = 10 ** 7
let periodInNs = 62 * 1000000
let arrMax = 2 ** 32

let solutions = getPrescalerAndARR(pulsesInHz, periodInNs, arrMax)
console.table(solutions)
