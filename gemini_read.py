import google.generativeai as genai
import PIL.Image, re
import os, json 
# from pprint import pprint

genai.configure(api_key="AIzaSyC6F-4sl3zSeamUSBJoVUbmTxdb2HGr8Qw")
# img = PIL.Image.open('/Users/apurv_paliwal/Desktop/RUHack24/flask_app/image_1.jpeg')

model = genai.GenerativeModel(model_name="gemini-1.5-flash")


def call_gemini(description,img):
    prompt = f"""Here is an image or a file in which can be in  a PDF, JPEG, PNG or other common image file type. 
    With the description: '{description}'\nCan you please read the text in the image and identify the items and the respective charges of the procedures or items ?\n
    and present them in a dictionary form. Please make sure there are minimum errors in the identification"""
    response = model.generate_content([prompt, img])
    new_response = response.text
    cleaned_json_text = new_response.replace("```json", "").replace("```", "").strip()
    corrected_data_text = re.sub(r'(\d+)\.(\d+)\.(\d+)', r'\1\2.\3', cleaned_json_text)

    try:
        data_dict = json.loads(corrected_data_text)
        billing_items = []

        for key, value in data_dict.items():
            print(key, value)
            item_dict = {
                "item": key,
                "charge_per_unit": float((value.replace(",",""))) if value else 0
            }
            billing_items.append(item_dict)
        return billing_items

    except Exception as e:
        return {"message", f"Error {e}"}
    # print("Corrected data text:", corrected_data_text)
# call_gemini("This is the bill for my visit to the hospital",img )