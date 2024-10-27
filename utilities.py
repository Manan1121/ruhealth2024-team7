import pandas as pd
import numpy as np
import requests
import google.generativeai as genai
import PIL.Image, re
import os, json
from flask import Flask, request, jsonify
import pickle

# Set up the Gemini API key (ensure to set your API key as an environment variable)
os.environ['GEMINI_API_KEY'] = 'AIzaSyC6F-4sl3zSeamUSBJoVUbmTxdb2HGr8Qw'
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Function to predict the flag for the overall billing
def predict_overall_flag(new_data):
    # Convert new data to a prompt for the Gemini API
    prompt = (
        "You are an assistant that classifies patient billing data into three flags: "
        "Red (significantly overcharged), Yellow (slightly overcharged), and Green (correctly charged). "
        "The input data contains the charge per unit, units used, and total charged. "
        "Provide only the single flag classification (Red, Yellow, or Green) for the overall billing.\n"
        f"Input Data: {new_data}"
    )
    
    # Use the GenerativeModel to generate a response based on the prompt
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content([prompt])
    new_response = response.text.strip()
    
    return new_response

# Function to predict the flag for individual items
def predict_item_flags(new_data):
    # Convert new data to a prompt for the Gemini API
    prompt = (
        "You are an assistant that classifies each item in patient billing data into three flags: "
        "Red (significantly overcharged), Yellow (slightly overcharged), and Green (correctly charged). "
        "The input data contains the total charged. "
        "For each item, provide only the flag classification (Red, Yellow, or Green).\n"
        "Provide only the single flag classification (Red, Yellow, or Green) for each item.\n"
        f"Input Data: {new_data}"
    )
    
    # Use the GenerativeModel to generate a response based on the prompt
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content([prompt])
    new_response = response.text.strip()
    
    return new_response

# Function to analyze billing data and identify overcharges
def analyze_billing(new_data):
    # Convert new data to a prompt for the Gemini API
    prompt = (
        "You are an assistant that analyzes patient billing data. For each item, check if the patient is being overcharged. "
        "If overcharged, indicate how much extra cost and units are charged compared to expected. "
        "The input data contains the charge per unit, units used, and total charged. Provide the output in a table format with columns: "
        "Service Name, Expected Cost, Total Charged, Overcharged Amount, Overcharged Units.\n"
        "Give me the table output"
        f"Input Data: {new_data}"
    )
    
    # Use the GenerativeModel to generate a response based on the prompt
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content([prompt])
    result_text = response.text.strip()
    
    return result_text

# # Save the analyze_billing function as a pickle file
# with open('analyze_billing.pkl', 'wb') as f:
#     pickle.dump(analyze_billing, f)

# # Save the functions as pickle files
# with open('predict_overall_flag.pkl', 'wb') as f:
#     pickle.dump(predict_overall_flag, f)

# with open('predict_item_flags.pkl', 'wb') as f:
#     pickle.dump(predict_item_flags, f)