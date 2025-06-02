from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import xgboost as xgb
import pandas as pd
import os

app = FastAPI()

# Get CORS origins from environment variables, with fallback to default values
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000"
)

# Configure CORS with more specific settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,  # Cache preflight requests for 1 hour
)

# Add a root endpoint to check if the API is working
@app.get("/")
async def root():
    return {"message": "Water Footprint API is running"}

# Load the trained model
try:
    model = xgb.Booster()
    model_path = os.path.join(os.path.dirname(__file__), 'waterfootprint_xgboost_model.json')
    model.load_model(model_path)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise

class InputData(BaseModel):
    faucetDuration: int
    faucetPressure: str
    dishwasher: bool
    dishwasherTimes: int
    toiletFlushes: int
    toiletType: str
    showerTimes: int
    showerDuration: int
    hasGarden: bool
    gardenType: str
    gardenWaterTimes: int
    clothesWashTimes: int
    washingMachineType: str
    moppingTimes: int
    moppingMethod: str
    vehicleType: str
    vehicleWashTimes: int
    hasRO: bool
    houseSize: int
    householdMembers: int


def calculate_recommendations(input_data):
    recommendations = {
        'faucet': [],
        'dishwasher': [],
        'toilet': [],
        'shower': [],
        'garden': [],
        'clothes_wash': [],
        'mopping': [],
        'ro': []
    }
    
    average_usage = {
        'faucetDuration': 2,
        'dishwasherTimes': 2,
        'toiletFlushes': 2,
        'showerTimes': 1,
        'showerDuration': 6,
        'gardenWaterTimes': 2,
        'clothesWashTimes': 2,
        'moppingTimes': 2,
        'vehicleWashTimes': 1,
        'houseSize': 1220
    }

    if input_data.faucetDuration > average_usage['faucetDuration']:
        recommendations['faucet'].append("Turn off the tap while brushing teeth, shaving, or scrubbing hands. Impact: Saves up to 30L per person per day!")
        recommendations['faucet'].append("Use a motion sensor faucet. Impact: Saves up to 50% water by automatically turning off when not in use.")
        recommendations['faucet'].append("Install a low-flow faucet aerator. Impact: Reduces water flow without sacrificing pressure.")

    if input_data.dishwasherTimes > average_usage['dishwasherTimes']:
        recommendations['dishwasher'].append("Turn off the tap while scrubbing dishes. Impact: Saves 30-40L per wash.")
        recommendations['dishwasher'].append("Use the eco-mode setting. Impact: Saves water and energy during the wash cycle.")
        recommendations['dishwasher'].append("Soak pots and pans instead of rinsing. Impact: Saves up to 20L per wash.")

    if input_data.toiletFlushes > average_usage['toiletFlushes']:
        recommendations['toilet'].append("Install a dual-flush toilet. Impact: Saves 30-50% water per flush.")
        recommendations['toilet'].append("Use a toilet tank bank. Impact: Saves water by displacing water in the tank.")
        recommendations['toilet'].append("Consider a composting toilet. Impact: Reduces water usage significantly.")

    if input_data.showerTimes > average_usage['showerTimes'] or input_data.showerDuration > average_usage['showerDuration']:
        recommendations['shower'].append("Reduce shower time from 10 minutes to 5 minutes. Impact: Saves 50% water per shower.")
        recommendations['shower'].append("Use a shower timer. Impact: Encourages shorter showers, saving up to 10L per shower.")
        recommendations['shower'].append("Install a low-flow showerhead. Impact: Reduces water usage without sacrificing pressure.")

    if input_data.gardenWaterTimes > average_usage['gardenWaterTimes']:
        recommendations['garden'].append("Water between 5-8 AM or after 6 PM. Impact: Doubles water efficiency, saving 30-50% water.")
        recommendations['garden'].append("Use a drip irrigation system. Impact: Delivers water directly to the roots, saving water.")
        recommendations['garden'].append("Collect rainwater for irrigation. Impact: Reduces reliance on tap water.")

    if input_data.clothesWashTimes > average_usage['clothesWashTimes']:
        recommendations['clothes_wash'].append("Switch to a front-load washing machine. Impact: Saves 50% water per load.")
        recommendations['clothes_wash'].append("Use a front-loading washing machine. Impact: Saves water and energy per load.")
        recommendations['clothes_wash'].append("Wash full loads only. Impact: Maximizes water efficiency.")

    if input_data.moppingTimes > average_usage['moppingTimes']:
        recommendations['mopping'].append("Use one bucket for clean water and one for dirty water. Impact: Saves 5-15L per session.")
        recommendations['mopping'].append("Use a microfiber mop. Impact: Requires less water for effective cleaning.")
        recommendations['mopping'].append("Reuse mop water for outdoor cleaning. Impact: Saves water by repurposing.")

    if input_data.houseSize > average_usage['houseSize']:
        recommendations['ro'].append("Place a bucket or storage tank under the RO waste outlet. Impact: Saves 20-50L per day.")
        recommendations['ro'].append("Use a water storage tank for RO waste. Impact: Saves 20-50L per day.")
        recommendations['ro'].append("Install a water-efficient RO system. Impact: Reduces waste water significantly.")

    return recommendations

@app.post("/predict")
def predict(input_data: InputData):
    # Create a dictionary with the expected feature names, excluding 'roWaterUsage'
    data_dict = { 

        'Average faucet durations (minutes)': input_data.faucetDuration,
        'Faucet pressure (low/high)': input_data.faucetPressure,
        'Uses dishwasher (yes/no)': input_data.dishwasher,
        'Times dishwasher used daily': input_data.dishwasherTimes,
        'Times toilet flushed daily': input_data.toiletFlushes,
        'Toilet type (low flow/dual flush)': input_data.toiletType,
        'Times showered daily': input_data.showerTimes,
        'Average shower duration (minutes)': input_data.showerDuration,
        'Has garden (yes/no)': input_data.hasGarden,
        'Garden type': input_data.gardenType,
        'Times garden watered weekly': input_data.gardenWaterTimes,
        'Times clothes washed weekly': input_data.clothesWashTimes,
        'Washing machine type': input_data.washingMachineType,
        'Times mopped weekly': input_data.moppingTimes,
        'Mopping method': input_data.moppingMethod,
        'Vehicle type': input_data.vehicleType,
        'Times vehicle washed weekly': input_data.vehicleWashTimes,
        'Has RO (yes/no)': input_data.hasRO,
        'House size (square feet)': input_data.houseSize,
        'Household members': input_data.householdMembers,
    }
    
    data_df = pd.DataFrame([data_dict])

    # Convert categorical columns to category type
    categorical_columns = [
        'Faucet pressure (low/high)', 
        'Toilet type (low flow/dual flush)', 
        'Garden type', 
        'Washing machine type', 
        'Mopping method', 
        'Vehicle type', 
        'Has RO (yes/no)'
    ]
    
    for col in categorical_columns:
        data_df[col] = data_df[col].astype('category')

    # Create DMatrix with enable_categorical set to True
    dmatrix = xgb.DMatrix(data_df, enable_categorical=True)
    
    prediction = model.predict(dmatrix)

    # Calculate recommendations
    recommendations = calculate_recommendations(input_data)

    # Return prediction and recommendations
    return {
        "water_footprint": prediction[0].item(),
        "recommendations": recommendations
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
