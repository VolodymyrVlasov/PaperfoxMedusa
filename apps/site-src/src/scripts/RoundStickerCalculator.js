import { RoundStickerCalculator } from "../calculators/impl/RoundStickerCalculator.js";
import { customRange } from "../scripts/app.js";
import { getPrice } from "../api/ApiPrices.js";

const calculator = document.getElementById("calculator");
const summary = document.getElementById("summary");
const cuttingTypeSelect = document.getElementById("cut");
const { changeRangeUI: renderDiameterUI, inputNode: diameterInput } = customRange("input_diameter", 32, 40);
const { changeRangeUI: renderAmountUI, inputNode: amountInput } = customRange("input_amount", 32, 60);
const { loading: printLoading, result: printPrice, error: printError } = await getPrice({ type: "PRICE_SELF_ADHESIVE" });
const { loading: cutLoading, result: cutPrice, error: cutError } = await getPrice({ type: "PRICE_PLOTTER_CUT" });

let isSizeChanged = false;
let isCuttingTypeChanged = false;
let isShowDetails = false;

const product = {
    productType: "ROUND_STICKER",
    diameter: 50,
    targetAmount: 3,
    material: "RAFLATAC",
    cutType: "KISS_CUT_A3",
    finishTime: "1 травня 18:00"
};

if (!printLoading && !cutLoading) {
    cutError && alert(`Не вдалось оновити прайс, будуть використані ймовірно застарілі дані. Код помилки: ${cutError}`);
    printError && alert(`Не вдалось оновити прайс, будуть використані ймовірно застарілі дані. Код помилки: ${printError}`);
    const roundStickerCalculator = new RoundStickerCalculator({ product, printPrice })

    roundStickerCalculator.appendInputElements({ diameterInput, amountInput })

    const conditions = () => {
        if (isSizeChanged || isCuttingTypeChanged) {
            amountInput.min = product.amountAtSheet;
            amountInput.value = product.amountAtSheet;
            amountInput.step = product.amountAtSheet;
            amountInput.max = product.amountAtSheet * 50;
            product.targetStickerAmount = product.amountAtSheet;
            product.sheetsAtPrintingRun = 1;
            isSizeChanged = false;
            isCuttingTypeChanged = false;
        }
        if (product.diameter < 50 && cuttingTypeSelect.children.length == 3) {
            cuttingTypeSelect.children[2].disabled = true;
        } else if (product.diameter >= 50) {
            cuttingTypeSelect.children[2].disabled = false;
        }
        if (product.cutType === "KISS_CUT_A4") {
            diameterInput.min = 5;
            diameterInput.max = 200;
        }
        if (product.cutType === "DIE_CUT") {
            diameterInput.max = 250;
            diameterInput.min = 50;
        }
        if (product.cutType === "KISS_CUT_A3" && diameterInput.max !== 300) {
            diameterInput.max = 300;
            diameterInput.min = 5;
        }
        if (product.material === "TRANSPARENT_WHITE") {
            cuttingTypeSelect.children[0].disabled = true;
            cuttingTypeSelect.children[1].selected = true;
            diameterInput.max = 200;
            diameterInput.min = 5;
        } else {
            cuttingTypeSelect.children[0].disabled = false;
        }
    }

    const applyChanges = (event) => {
        const target = event.target;
        switch (target.id) {
            case "input_range_diameter":
                product.diameter = Number(target.value);
                isSizeChanged = true;
                break;
            case "input_range_amount":
                product.targetStickerAmount = Number(target.value);
                break;
            case "material":
                product.material = target.value;
                break;
            case "cut":
                product.cutType = target.value;
                isCuttingTypeChanged = true;
                break;
            case "detailed_price_btn":
                isShowDetails = !isShowDetails;
                break;
        }
        roundStickerCalculator.renderCalculatorForm({ UIComponents: [renderDiameterUI, renderAmountUI], isShowDetails, conditions });
        roundStickerCalculator.calculate(product);

    }

    calculator.addEventListener("change", (event) => applyChanges(event));
    calculator.addEventListener("click", (event) => applyChanges(event));

    roundStickerCalculator.calculate(product);
    roundStickerCalculator.renderCalculatorForm({ UIComponents: [renderDiameterUI, renderAmountUI], isShowDetails, conditions });
}



