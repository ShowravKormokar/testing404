// Question 01 - Solution
function describeValue(value) {
    const valueType = typeof (value);

    // Check truthy or falsy value by short-hand technique
    const truthinessCheck = value ? "truthy" : "falsy";

    return (`${valueType} | ${truthinessCheck}`);
}

// Question 02 - Solution
function getDayType(day) {
    const dayL = day.toLowerCase();

    switch (dayL) {
        // For Weekend
        case ("friday"):
        case ("saturday"):
            return ("Weekend");

        // For Working Day
        case ("sunday"):
        case ("monday"):
        case ("tuesday"):
        case ("wednesday"):
        case ("thursday"):
            return ("Working Day");

        // For wrong input
        default:
            return ("Invalid Day");
    }
}

// Question 03 - Solution
function validateUsername(userName) {
    // Rule 1 : Length check
    if (userName.length < 4) {
        return ("Too Short");
    }

    // Rule 2 : Space check
    if (userName.includes(" ")) {
        return ("No Space Allowed");
    }

    // Rule 3 : Admin check (case insensitive)
    if (userName.toLowerCase().includes("admin")) {
        return ("Reserved Word");
    }

    // If passed all rules
    return ("Available");
}

// Question 04 - Solution
function getCngFare(distance, isNight = false, waitingMinutes = 0) {

    // Validation
    if (typeof distance !== "number" || distance <= 0) {
        return ("Distance must be positive number.");
    }

    if (typeof waitingMinutes !== "number" || waitingMinutes < 0) {
        return ("Waiting minutes must be non-negative number.");
    }

    if (typeof isNight !== "boolean") {
        return ("isNight must be boolean value (true/false).");
    }

    // For first 2 km
    let fare = 50;

    // Charge for extra km
    if (distance > 2) {
        fare += ((distance - 2) * 15);
    }

    // Waiting charge
    if (waitingMinutes != 0) {
        fare += (waitingMinutes * 2);
    }

    // For 20% night surcharge
    if (isNight) {
        fare += (fare * 0.2);
    }

    return fare;
}

// Question 05 - Solution
const getChaseVerdict = (target, scored, ballsLeft) => {
    // Validation
    if (typeof target !== "number" || target <= 0) {
        return ("Target must be positive number.");
    }

    if (typeof scored !== "number" || scored < 0) {
        return ("Scored runs must be non-negative number.");
    }

    if (typeof ballsLeft !== "number" || ballsLeft < 0) {
        return ("Balls left must be non-negative number.");
    }

    // Calc runs needed
    const runsNeeded = target - scored;

    // Won
    if (runsNeeded <= 0) {
        return ("Won");
    }

    //Loss
    if (ballsLeft <= 0) {
        return ("Loss");
    }

    // Required run rate
    const requiredRate = (runsNeeded / ballsLeft) * 6;

    let verdict;
    if (requiredRate <= 6) {
        verdict = "Comfortable";
    } else if (requiredRate <= 12) {
        verdict = "Tough";
    } else {
        verdict = "Almost Impossible";
    }

    return (`Need ${runsNeeded} runs in ${ballsLeft} balls | ${verdict}`);
}