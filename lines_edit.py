import csv, re
rows = []

# data from https://www.kaggle.com/datasets/fabriziocominetti/the-office-lines

with open("office_data.csv", encoding="utf-8") as file:
    reader = csv.reader(file)

    fields = next(reader)

    for row in reader:
        # prevent ostensible monologuing 
        if len(row[2]) > 300:
            pass
        # prevent asides
        else:
            asides = re.findall(r'\[.*?\]', row[2])
            for i in asides:
                row[2] = row[2].replace(i, "")
            row[2] = row[2].strip()     
        rows.append(row)

with open("parsed_office.csv", "a", encoding="utf-8") as file:
    write = csv.writer(file)
    write.writerow(fields)
    write.writerows(rows)
