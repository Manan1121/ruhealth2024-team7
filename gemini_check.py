# # import requests

# # url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC6F-4sl3zSeamUSBJoVUbmTxdb2HGr8Qw"
# # headers = {
# #     "Content-Type": "application/json"
# # }
# # data = {
# #     "contents": [
# #         {
# #             "parts": [
# #                 {"text": "Explain how AI works"}
# #             ]
# #         }
# #     ]
# # }

# # response = requests.post(url, headers=headers, json=data)
# # print(response.json())


# import google.generativeai as genai
# import PIL.Image, re
# import os, json 

# genai.configure(api_key="AIzaSyC6F-4sl3zSeamUSBJoVUbmTxdb2HGr8Qw")
# img = PIL.Image.open('image_1.jpeg')

# model = genai.GenerativeModel(model_name="gemini-1.5-flash")
# prompt = """Here is an image or a file in which can be in  a PDF, JPEG, PNG or other common image file type.\n Can you please read the text in the image and identify the items and the respective charges of the procedures or items ?\n
#  and present them in the format {
#     "disease": "...",
#     "billing_items": [ { "item": "...", "charge_per_unit": ..},
#     ]}.
#     Please make sure there are minimum errors in the identification"""
# response = model.generate_content([prompt, img])
# new_response = response.text.replace("json","")

# corrected_data_text = re.sub(r'(\d+)\.(\d+)\.(\d+)', r'\1\2.\3', new_response)
# print(corrected_data_text)


import google.generativeai as genai
import PIL.Image, re
import os, json 

genai.configure(api_key="AIzaSyC6F-4sl3zSeamUSBJoVUbmTxdb2HGr8Qw")
img = PIL.Image.open('/Users/pavanmadamsetty/Downloads/itemzied_bill.png')

model = genai.GenerativeModel(model_name="gemini-1.5-flash")
prompt = """Here is an image or a fill in which can be in  a PDF, JPEG, PNG or other common image file type.\n Can you please read the text in the image and identify the items and the respective charges of the procedures or items ? and present them in a dictionary form. Please make sure there are minimum errors in the identification"""
response = model.generate_content([prompt, img])

new_response = response.text
cleaned_json_text = new_response.replace("json", "").replace("", "").strip()

corrected_data_text = re.sub(r'(\d+).(\d+).(\d+)', r'\1\2.\3', cleaned_json_text)

try:
    data_dict = json.loads(corrected_data_text)
    billing_items = []

    for key, value in data_dict.items():
        # Create a new dictionary for each item with the desired structure
        item_dict = {
            "item": value["item"],
            "charge_per_unit": float(value["charge"]) if value["charge"] else 0.0  # Convert charge to float, handle None
        }
        billing_items.append(item_dict)
    print(billing_items)

except json.JSONDecodeError as e:
    print("Error parsing JSON:", e)
    print("Corrected data text:", corrected_data_text)