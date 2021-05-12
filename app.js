//////////////////////////////////////////////////////////////
//////////////////////// VARIABLES ///////////////////////////
//////////////////////////////////////////////////////////////

const foodSearch = document.querySelector('.food-search');
const btnSearch = document.querySelector('.btn-search');
const btnReset = document.querySelector('.btn-reset');
const foodInput = document.querySelector('.food-input');
const foodCardsFlex = document.querySelector('.food-cards-flex');
const gramsInput = document.querySelector('.grams-input');

//////////////////////////////////////////////////////////////
////////////////// Modal window variables ////////////////////
//////////////////////////////////////////////////////////////

const modal = document.getElementById('myModal');
const modalText = document.querySelector('.modal-text');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close')[0];

//////////////////////////////////////////////////////////////

// Calc multiplier for grams input
const convertToGramsInput = function (weight) {
  return (100 / weight) * (gramsInput.value / 100);
};

//////////////////////////////////////////////////////////////
////////////////////// EVENT LISTENERS ///////////////////////
//////////////////////////////////////////////////////////////

// Search button
btnSearch.addEventListener('click', function () {
  const renderFood = function (data1, data2) {
    // Calculate nutrient value
    const calcNutrientValue = function (nutrient) {
      return `${
        !data2.totalNutrients[nutrient]
          ? '-'
          : nutrient === 'ENERC_KCAL'
          ? (
              data2.totalNutrients[nutrient].quantity *
              convertToGramsInput(data2.totalWeight)
            ).toFixed(0)
          : (
              data2.totalNutrients[nutrient].quantity *
              convertToGramsInput(data2.totalWeight)
            ).toFixed(1)
      }`;
    };

    // Check for image

    const imgCheck = function () {
      return `${
        !data1.parsed[0].food.image
          ? ''
          : `<img
      src='${data1.parsed[0].food.image}'
      alt=""
    />`
      }`;
    };

    // Define nutrient unit
    const nutrientUnit = function (nutrient) {
      return `${
        !data2.totalNutrients[nutrient]
          ? ''
          : data2.totalNutrients[nutrient].unit
      }`;
    };

    // Define daily unit
    const dailyUnit = function (nutrient) {
      return `${
        !data2.totalDaily[nutrient] ? '-' : data2.totalDaily[nutrient].unit
      }`;
    };

    // Calculate daily %
    const calcDailyPercent = function (nutrient) {
      return `${
        !data2.totalDaily[nutrient]
          ? ''
          : (
              data2.totalDaily[nutrient].quantity *
              convertToGramsInput(data2.totalWeight)
            ).toFixed(0)
      }`;
    };

    // HTML to be inserted into Food Cards flexbox (.foodCardsFlex)
    const html = `
      <div class="food-card">
      <article class='food-content'>  
        
        ${imgCheck()} 

        <div>
          <h2>${data1.parsed[0].food.label}</h2>
          <hr class="hr-big" />
          <h4>Nutrition facts</h4>

          <hr class="hr-big" />

          <div class="serving-size">
            <h5 class='serving-size-value'>Serving size(${
              gramsInput.value
            }g)</h5>
            
          </div>

          <hr class="hr-big" />
    
          <div class="amount-per-serving">
            <div class="flex">
              <h5>Amount per serving</h5>
            </div>
            
            <div class="flex-calories">
                <h5>Calories</h5>
            </div>
            <p class='kcal-value' label='ENERC_KCAL' value='${calcNutrientValue(
              'ENERC_KCAL'
            )}'>${calcNutrientValue('ENERC_KCAL')}${nutrientUnit(
      'ENERC_KCAL'
    )} </p>
            
          </div>

            <hr class="hr-big" />

            <div class="flex-daily">
              <h5>% Daily value*</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-protein micronutrient-row">
              <div class="flex">
                <h5>Protein</h5>
                <p class='protein-value' label='PROCNT' value='${calcNutrientValue(
                  'PROCNT'
                )}'>${calcNutrientValue('PROCNT')}${nutrientUnit('PROCNT')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'PROCNT'
              )}'>${calcDailyPercent('PROCNT')}${dailyUnit('PROCNT')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-carbs micronutrient-row">
              <div class="flex">
                <h5>Total Carbohydrate</h5>
                <p class='carbs-value' label='CHOCDF' value='${calcNutrientValue(
                  'CHOCDF'
                )}'>${calcNutrientValue('CHOCDF')}${nutrientUnit('CHOCDF')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'CHOCDF'
              )}'>${calcDailyPercent('CHOCDF')}${dailyUnit('CHOCDF')}</h5>
            </div>

            <hr class="hr-small-gray1" />

            <div class="flex-subnutrient micronutrient-row">
              <div class="flex">
                <h5>Dietary fiber</h5>
                <p class='fiber-value' label='FIBTG' value='${calcNutrientValue(
                  'FIBTG'
                )}'>${calcNutrientValue('FIBTG')}${nutrientUnit('FIBTG')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'FIBTG'
              )}'>${calcDailyPercent('FIBTG')}${dailyUnit('FIBTG')}</h5>
            </div>

            <hr class="hr-small-gray2" />

            <div class="flex-subnutrient micronutrient-row">
              <div class="flex">
                <h5>Total sugars</h5>
                <p class='total-sugars-value' label='SUGAR' value='${calcNutrientValue(
                  'SUGAR'
                )}'>${calcNutrientValue('SUGAR')}${nutrientUnit('SUGAR')}</p>
              </div>
              <h5 class='daily-percent' value=''>-</h5>
            </div>
            
            <hr class="hr-small-gray2" />

            <div class="flex-subnutrient micronutrient-row">
              <div class="flex">
                <h5>Added sugars</h5>
                <p class='added-sugars-value' label='SUGAR.added' value='${calcNutrientValue(
                  'SUGAR.added'
                )}'>${calcNutrientValue('SUGAR.added')}${nutrientUnit(
      'SUGAR.added'
    )}</p>
              </div>
              <h5 class='daily-percent' value=''>-</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-fat micronutrient-row">
              <div class="flex">
                <h5>Total Fat</h5>
                <p class='total-fat-value' label='FAT' value='${calcNutrientValue(
                  'FAT'
                )}'>${calcNutrientValue('FAT')}${nutrientUnit('FAT')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'FAT'
              )}'>${calcDailyPercent('FAT')}${dailyUnit('FAT')}</h5>
            </div>

            <hr class="hr-small-gray1" />

            <div class="flex-subnutrient micronutrient-row">
              <div class="flex">
                <h5>Saturated Fat</h5>
                <p class='saturated-fat-value' label='FASAT' value='${calcNutrientValue(
                  'FASAT'
                )}'>${calcNutrientValue('FASAT')}${nutrientUnit('FASAT')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'FASAT'
              )}'>${calcDailyPercent('FASAT')}${dailyUnit('FASAT')}</h5>
            </div>

            <hr class="hr-small-gray2" />

            <div class="flex-sat-fat micronutrient-row">
              <div class="flex">
                <h5>Monosaturated Fat</h5>
                <p class='monosat-fat-value' label='FAMS' value='${calcNutrientValue(
                  'FAMS'
                )}'>${calcNutrientValue('FAMS')}${nutrientUnit('FAMS')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'FAMS'
              )}'>${calcDailyPercent('FAMS')}${dailyUnit('FAMS')}</h5>
            </div>

            <hr class="hr-small-gray3" />

            <div class="flex-sat-fat micronutrient-row">
            <div class="flex">
              <h5>Polisaturated Fat</h5>
              <p class='polisat-fat-value' label='FAPU' value='${calcNutrientValue(
                'FAPU'
              )}'>${calcNutrientValue('FAPU')}${nutrientUnit('FAPU')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'FAPU'
              )}'>${calcDailyPercent('FAPU')}${dailyUnit('FAPU')}</h5>
          </div>
            <hr class="hr-small" />

            <div class="flex-cholesterol micronutrient-row">
              <div class="flex">
                <h5>Cholesterol</h5>
                <p class='cholesterol-value' label='CHOLE' value='${calcNutrientValue(
                  'CHOLE'
                )}'>${calcNutrientValue('CHOLE')}${nutrientUnit('CHOLE')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'CHOLE'
              )}'>${calcDailyPercent('CHOLE')}${dailyUnit('CHOLE')}</h5>
            </div>
            
            <hr class="hr-small" />

            <div class="flex-sodium micronutrient-row">
              <div class="flex">
                <h5>Sodium</h5>
                <p class='sodium-value' label='NA' value='${calcNutrientValue(
                  'NA'
                )}'>${calcNutrientValue('NA')}${nutrientUnit('NA')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'NA'
              )}'>${calcDailyPercent('NA')}${dailyUnit('NA')}</h5>
            </div>

            <hr class="hr-big" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Vitamin A</h5>
                <p class='vit-a-value' label='VITA_RAE' value='${calcNutrientValue(
                  'VITA_RAE'
                )}'>${calcNutrientValue('VITA_RAE')}${nutrientUnit(
      'VITA_RAE'
    )}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'VITA_RAE'
              )}'>${calcDailyPercent('VITA_RAE')}${dailyUnit('VITA_RAE')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Thiamin(B1)</h5>
                <p class='thiamin-b1-value' label='THIA' value='${calcNutrientValue(
                  'THIA'
                )}'>${calcNutrientValue('THIA')}${nutrientUnit('THIA')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'THIA'
              )}'>${calcDailyPercent('THIA')}${dailyUnit('THIA')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Riboflavin(B2)</h5>
                <p class='riboflavin-b2-value' label='RIBF' value='${calcNutrientValue(
                  'RIBF'
                )}'>${calcNutrientValue('RIBF')}${nutrientUnit('RIBF')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'RIBF'
              )}'>${calcDailyPercent('RIBF')}${dailyUnit('RIBF')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Niacin(B3)</h5>
                <p class='niacin-b3-value' label='NIA' value='${calcNutrientValue(
                  'NIA'
                )}'>${calcNutrientValue('NIA')}${nutrientUnit('NIA')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'NIA'
              )}'>${calcDailyPercent('NIA')}${dailyUnit('NIA')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Vitamin B6</h5>
                <p class='vitamin-b6-value' label='VITB6A' value='${calcNutrientValue(
                  'VITB6A'
                )}'>${calcNutrientValue('VITB6A')}${nutrientUnit('VITB6A')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'VITB6A'
              )}'>${calcDailyPercent('VITB6A')}${dailyUnit('VITB6A')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Vitamin B12</h5>
                <p class='vitamin-b12-value' label='VITB12' value='${calcNutrientValue(
                  'VITB12'
                )}'>${calcNutrientValue('VITB12')}${nutrientUnit('VITB12')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'VITB12'
              )}'>${calcDailyPercent('VITB12')}${dailyUnit('VITB12')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Vitamin C</h5>
                <p class='vitamin-c-value' label='VITC' value='${calcNutrientValue(
                  'VITC'
                )}'>${calcNutrientValue('VITC')}${nutrientUnit('VITC')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'VITC'
              )}'>${calcDailyPercent('VITC')}${dailyUnit('VITC')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Vitamin D</h5>
                <p class='vitamin-d-value' label='VITD' value='${calcNutrientValue(
                  'VITD'
                )}'>${calcNutrientValue('VITD')}${nutrientUnit('VITD')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'VITD'
              )}'>${calcDailyPercent('VITD')}${dailyUnit('VITD')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Calcium</h5>
                <p class='calcium-value' label='CA' value='${calcNutrientValue(
                  'CA'
                )}'>${calcNutrientValue('CA')}${nutrientUnit('CA')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'CA'
              )}'>${calcDailyPercent('CA')}${dailyUnit('CA')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Folate(Equivalent)</h5>
                <p class='folate-eq-value' label='FOLDFE' value='${calcNutrientValue(
                  'FOLDFE'
                )}'>${calcNutrientValue('FOLDFE')}${nutrientUnit('FOLDFE')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'FOLDFE'
              )}'>${calcDailyPercent('FOLDFE')}${dailyUnit('FOLDFE')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Folate(Food)</h5>
                <p class='folate-food-value' label='FOLDFD' value='${calcNutrientValue(
                  'FOLDFD'
                )}'>${calcNutrientValue('FOLDFD')}${nutrientUnit('FOLDFD')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'FOLDFD'
              )}'>${calcDailyPercent('FOLDFD')}${dailyUnit('FOLDFD')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Iron</h5>
                <p class='iron-value' label='FE' value='${calcNutrientValue(
                  'FE'
                )}'>${calcNutrientValue('FE')}${nutrientUnit('FE')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'FE'
              )}'>${calcDailyPercent('FE')}${dailyUnit('FE')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Magnesium</h5>
                <p class='magnesium-value' label='MG' value='${calcNutrientValue(
                  'MG'
                )}'>${calcNutrientValue('MG')}${nutrientUnit('MG')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'MG'
              )}'>${calcDailyPercent('MG')}${dailyUnit('MG')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Phosphorus</h5>
                <p class='phosphorus-value' label='P' value='${calcNutrientValue(
                  'P'
                )}'>${calcNutrientValue('P')}${nutrientUnit('P')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'P'
              )}'>${calcDailyPercent('P')}${dailyUnit('P')}</h5>
            </div>

            <hr class="hr-small" />

            <div class="flex-vitamins micronutrient-row">
              <div class="flex">
                <h5>Potassium</h5>
                <p class='potassium-value' label='K' value='${calcNutrientValue(
                  'K'
                )}'>${calcNutrientValue('K')}${nutrientUnit('K')}</p>
              </div>
              <h5 class='daily-percent' value='${calcDailyPercent(
                'K'
              )}'>${calcDailyPercent('K')}${dailyUnit('K')}</h5>
            </div>

            <hr class="hr-big" />

            <p class="daily-value-description">* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for a general nutrition advice.</p>

          </div>
        </article>
      </div>
    `;
    foodCardsFlex.insertAdjacentHTML('afterbegin', html);
    foodInput.value = '';
    gramsInput.value = '';
  };

  // Get the food data from 'Edamam' nutrition and food API's
  const getFoodData = function (food) {
    let data1;
    let data2;

    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?ingr=${food}&app_id=f3849ead&app_key=4c1d864af3360bc2419515b58d461303`
    )
      .then(response => response.json())
      .then(data => {
        if (data.parsed === undefined || !gramsInput.value)
          throw new Error('Empty input field!');
        if (gramsInput.value && data.parsed.length === 0)
          throw new Error('Wrong food input!');
        data1 = data;
        return fetch(
          `https://api.edamam.com/api/nutrition-data?app_id=de6c9b38&app_key=a29628da4aa333e21e9407e740c1bbe7&ingr=1${food}`
        );
      })
      .then(response => response.json())
      .then(data => {
        data2 = data;
        renderFood(data1, data2);
      })
      .catch(err => {
        modalText.textContent = err.message;
        modal.style.display = 'block';
      });
  };
  getFoodData(foodInput.value);
});

// Reset button
btnReset.addEventListener('click', function () {
  const foodCard = document.querySelectorAll('.food-card');
  foodInput.value = '';
  gramsInput.value = '';
  foodCard.forEach(card => card.remove());
});

//////////////////////////////////////////////////////////////
//////////////////  Modal window close ///////////////////////
//////////////////////////////////////////////////////////////

// When the user clicks on <span> (x), hide the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, hide the modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
