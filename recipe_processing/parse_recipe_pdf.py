import argparse
import json
import magic
import nltk
from nltk.tokenize import sent_tokenize
import pdfplumber
import re
import sys

def main():

    parser = argparse.ArgumentParser(description="Argument parser for script to submit recipe data into database.")

    parser.add_argument("filename", help="The name of the input file to get recipe information from.")
    parser.add_argument("--verbose", "-v", action="store_true", help="Enable verbose mode")

    args = parser.parse_args()

    filepath = args.filename

    # Open the file and get its contents line by line using pdfplumber.
    with pdfplumber.open(filepath) as pdf:
        # Iterate through each page in the PDF
        extracted_text = []
        current_instruction = ""
        instructions = []

        ingredients = []

        is_ingredient = False
        is_instruction = False
        instruction_number_pattern = r"^\d+\.$"

        for page_num in range(len(pdf.pages)):
            page = pdf.pages[page_num]

            # Extract text from the current page
            text = page.extract_text()

            # Split the text into lines
            lines = text.split('\n')
            for line in lines:
                extracted_text.append(line)
            sentences = []

            for line in extracted_text:
                sentences.extend(sent_tokenize(line))


                title = sentences[0]
            for sentence in sentences[1:]:
                trimmed_line = re.sub(r'[^a-zA-Z]', '', sentence)
                if trimmed_line.lower() == "ingredients":
                    is_ingredient = True
                    continue
                elif trimmed_line.lower() == "instructions":
                    is_ingredient = False
                    is_instruction = True
                    continue
                elif trimmed_line.isupper():
                    is_instruction = False
                    if len(current_instruction) != 0:
                        instructions.append(current_instruction)
                    continue
                if is_ingredient:
                    ingredients.append(sentence)
                elif is_instruction:
                    if re.match(instruction_number_pattern, sentence):
                        if len(current_instruction) != 0:
                            instructions.append(current_instruction)
                            current_instruction = ""
                        current_instruction = sentence + " "
                    else:
                        current_instruction = current_instruction + sentence + " "
            if is_instruction:
                instructions.append(current_instruction)
            print(title)
            print(instructions)
            print(ingredients)
    # json time
    output = {
        "recipe_name": title,
        "recipe_notes": None,
        "cuisine": None,
        "difficulty": None,
        "course": None,
        "food_groups": None,
        "flavors": None,
        "season": None,
        "instructions": instructions,
        "ingredients": ingredients
    }

    file_name = "out.json"

    with open(file_name, "w") as json_file:
        json.dump(output, json_file)








if __name__ == '__main__':
    main()
