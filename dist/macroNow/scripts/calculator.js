/*
  Macro Calculator |  4/1/2021
    ----------------------------
    Must take in user's height, weight and desired goal weight.
    Provide the user with the daily amount of calories necessary + 1hr of daily exercise.
    Provide the user with how many g of fat, protein, sodium, etc. required daily.
    Implement an recipie API to help guide users after receiving their calorie results.
    Option to save calorie results to page upon returning + be able to save the results in PDF format.
*/

/*  Calculations needed
    -------------------
    1.  Calculate BMR (Basal Metabolic Rate)
        ------------------------------------
    -   BMR (imperial) / Men = (4.536 × weight in pounds) + (15.88 × height in inches) - (5 × age) + 5
    -   BMR (imperial) / Women = (4.536 × weight in pounds) + (15.88 × height in inches) - (5 × age) - 161

    2.  Recieve daily activity level from the user -- Multiply numbers below to the calculated BMR
        ------------------------------------------------------------------------------------------
    -   Little to no exercise   |   0-0 times a week = *1.2
    -   Below average exercise  |   1-3 times a week = *1.375
    -   Moderate exercise       |   3-5 times a week = *1.55 
    -   Heavy exercise          |   6-7 times a week = *1.725

    3.  Create a Macro Split
        --------------------
    1)  40% Protein
        - Enough protein to fuel muscle recovery
    2)  30% Carbohydrates
        - Sufficent carbohydrates to fuel workouts
    3)  30% Fat
        - Recommend amount of fats to promote proper hormone production

    4.  Calculate how many g's of each macro necessary (X = Calories Calculated)
        ----------------------------------------------
    -   Protein: X * 0.4 = g of Protein
    -   Carbohydrates: X * 0.4 = g of Carbohydates
    -   Fat: X * 0.3 = g of Fat

    5.  Assess the user's goals with the given data
        -------------------------------------------
    -   Mild weight loss
    -   Consistent weight loss
    -   Maintain current weight
    -   Mild weight gain

    -   Consistent weight gain

    6.  Return the information back to the user, provide a PDF download, save results to browser
        ----------------------------------------------------------------------------------------
        ----------------------------------------------------------------------------------------
*/

let btn = document.getElementById("calculateBtn");

btn.addEventListener("click", function() {
    let weight = document.getElementById("weightInput").value;
    let height = document.getElementById("heightInput").value;
    let age = document.getElementById("ageInput").value;
    let gender = document.getElementById("gender").value;
    // let exercise = document.getElementById("exercise").value;
    // let goal = document.getElementById("goal").value;

    
    console.log(height);
    console.log(weight);
    console.log(age);
    console.log(gender);
    // console.log(activityLevel);

    /* These values need to be stored and allocated to the total calories calculated

    -   Little to no exercise   |   0-0 times a week = *1.2 (calories * 1.2)
    -   Below average exercise  |   1-3 times a week = *1.375 (calories * 1.375)
    -   Moderate exercise       |   3-5 times a week = *1.55 (calories * 1.55)
    -   Heavy exercise          |   6-7 times a week = *1.725 (calories * 1.725)
    
    */

    /* For the weight goals these values need to be stored and added after the activity level is multiplied by the caloric output

    -   Lose Weight |   subtract 250 off the caloric output
    -   Maintain Weight |  Add 150 to the caloric output
    -   Gain Weight |   Add 500 calories to the caloric output

    */

    // Adult male: 66 + (6.3 x body weight in lbs.) + (12.9 x height in inches) - (6.8 x age in years) = BMR |*BEING USED*|
    // BMR (imperial) / Men = (4.536 × weight in pounds) + (15.88 × height in inches) - (5 × age) + 5
    //  let maleBMR =  (4.536 * weight) + (15.66 * height) - (5 * age) + 5;
    //let maleBMR = (4.536 * weight + 15.66 * height - 5 * age + 5) * 1.55
    // Adult female: 655 + (4.3 x weight in lbs.) + (4.7 x height in inches) - (4.7 x age in years) = BMR |*BEING
    // BMR (imperial) / Women = (4.536 × weight in pounds) + (15.88 × height in inches) - (5 × age) - 161
    //let femaleBMR = (4.536 * weight) + (15.88 * height) - (5 * age) - 161 * 1.55;
    // let activity = document.getElementById("activityLevel").value;
    // let none = (maleBMR, femaleBMR * 1.2);

    let maleBMR = 66 + (6.3 * weight) + (12.9 * height) - (6.8 * age);
    let femaleBMR = 655 + (4.3 * weight) + (4.7 * height) - (4.7 * age);

    let calories = maleBMR * 1.725;
    // let calories = femaleBMR *1.55;

    let protein = (weight * 1.2);
    let fats = (weight * .3);
    let carbs = (calories / 2) / 4;

    document.getElementById("macroOutput").value = calories;
    document.getElementById("macroOutput").value = femaleBMR;
    
    document.getElementById("proteinOutput").value = protein;
    document.getElementById("carbsOutput").value = carbs;
    document.getElementById("fatsOutput").value = fats;

});


// Copies the calculated macro to the user's clipboard
function copy() {
    let copyText = document.getElementById("macroOutput");
    copyText.select();
    document.execCommand("copy");
  }
  
  document.getElementById("copy").addEventListener("click", copy);