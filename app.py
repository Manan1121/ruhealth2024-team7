from flask import Flask, render_template, request, redirect, url_for 
# import psycopg2 
import io
from PIL import Image
# import requests, jsonify
from flask_cors import CORS
import uuid, os
from gemini_read import call_gemini
import pickle
import utilities as util
import pandas as pd
import numpy as np
import google.generativeai as genai
import PIL.Image, re
import os, json
import pickle
from flask import Flask, request, jsonify, send_file
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io
# app = Flask(__name__) 
app = Flask(__name__, template_folder='/Users/apurv_paliwal/Desktop/RUHack24/flask_app/templates')

CORS(app)

TEST_USER = {
    "email": "testuser@example.com",
    "password": "password123"
}

@app.route('/home', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Retrieve the data from the form submission
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        # Verify credentials
        if email == TEST_USER['email'] and password == TEST_USER['password']:
            return {"status": "success", "redirect_url": url_for('upload')}
        else:
            return {"status": "Error", "message": "Invalid credentials. Please try again."}
    
    # Render the login page on GET request
    return render_template('page.html')


@app.route('/upload', methods=['POST','GET'])
def upload():
    global final_response
    UPLOAD_FOLDER = "/Users/apurv_paliwal/Desktop/RUHack24/flask_app/images_uploaded"
    if request.method == 'POST':
        if 'file' not in request.files:
            return {"success": False, "message": "No file part in the request"}

        file = request.files['file']
        description = request.form['description'] 
        if file.filename == '':
            return {"success": False, "message": "No file selected"}

        try:

            image = Image.open(io.BytesIO(file.read()))
            width, height = image.size
            
            gemini_response = call_gemini(description, image)
            final_response = dict()
            final_response["model_response"] = gemini_response
            final_response["description"] = description
            
            width, height = image.size
            print(f"File successfully processed. Image size: {width}x{height}.\n Gemini response : {gemini_response}")
            return {"success": True, "redirect_url": url_for('predict') }
        
        except Exception as e:
            return {"success": False, "message": f"Failed to process file: {str(e)}"}

    return render_template('upload.html')



# file_path = "predict_overall_flag.pkl"  # Update with your actual path
# print("File exists:", os.path.exists(file_path))

# with open('predict_overall_flag.pkl', 'rb') as f:
#     predictoverallflag = pickle.load(f)

# with open('predict_item_flags.pkl', 'rb') as f:
#     predict_item_flags = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    # input_data = request.get_json()
    overall_flag = util.predict_overall_flag(final_response)
    item_flags = util.predict_item_flags(final_response)
    return render_template('final_result.html')

    # return jsonify({'overall_flag': overall_flag, 'item_flags': item_flags})

# Cost Comparsion Flask API:
# Load the predict functions from the pickle files
with open('predict_overall_flag.pkl', 'rb') as f:
    predict_overall_flag = pickle.load(f)

with open('predict_item_flags.pkl', 'rb') as f:
    predict_item_flags = pickle.load(f)

with open('analyze_billing.pkl', 'rb') as f:
    analyze_billing = pickle.load(f)

# Define an API endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    input_data = request.get_json()
    
    # Make predictions using the predict_flag functions
    overall_flag = predict_overall_flag(input_data)
    item_flags = predict_item_flags(input_data)
    
    # Return the predictions as a JSON response
    return jsonify({'overall_flag': overall_flag, 'item_flags': item_flags})

Define an API endpoint for billing analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    # Get the input data from the request
    input_data = request.get_json()
    
    # Analyze the billing using the analyze_billing function
    analysis_result = analyze_billing(input_data)
    
    # Return the analysis as a JSON response
    return jsonify({'analysis': analysis_result})

# # Define an API endpoint for generating PDF report
# @app.route('/generate_report', methods=['POST'])
# def generate_report():
#     # Get the input data from the request
#     input_data = request.get_json()
    
#     # Analyze the billing using the analyze_billing function
#     analysis_result = analyze_billing(input_data)
    
#     # Create a PDF in memory
#     pdf_buffer = io.BytesIO()
#     c = canvas.Canvas(pdf_buffer, pagesize=letter)
#     c.setFont("Helvetica", 12)
#     c.drawString(100, 750, "Patient Billing Analysis Report")
#     c.drawString(100, 730, "====================================")
#     y = 700
    
#     # Add analysis result to PDF
#     for line in analysis_result.split('\n'):
#         c.drawString(100, y, line)
#         y -= 20
#         if y < 50:  # Create a new page if content exceeds page length
#             c.showPage()
#             c.setFont("Helvetica", 12)
#             y = 750
    
#     c.save()
#     pdf_buffer.seek(0)
    
#     return send_file(pdf_buffer, as_attachment=True, download_name="billing_analysis_report.pdf", mimetype='application/pdf')

  
if __name__ == '__main__': 
    app.run(debug=True) 