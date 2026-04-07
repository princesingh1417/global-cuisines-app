import json

cuisines = {
    "American": [
        "Classic Cheeseburger", "BBQ Beef Ribs", "Macaroni and Cheese", "Buffalo Wings", 
        "Clam Chowder", "Apple Pie", "Pulled Pork Sandwich", "Fried Chicken", 
        "Philly Cheesesteak", "Jambalaya", "Texas Brisket", "Cornbread", 
        "Cobb Salad", "Chicago Deep Dish Pizza", "Meatloaf", "Shrimp and Grits", 
        "Biscuits and Gravy", "Key Lime Pie", "Gumbo", "New York Cheesecake"
    ],
    "Brazilian": [
        "Feijoada", "Pão de Queijo", "Moqueca", "Churrasco", 
        "Coxinha", "Brigadeiro", "Açaí Bowl", "Farofa", 
        "Vatapá", "Acarajé", "Picanha", "Bobó de Camarão", 
        "Empadão", "Quindim", "Pastel", "Mandioca Frita", 
        "Salpicão", "Bolo de Cenoura", "Escondidinho", "Tutu de Feijão"
    ],
	"Chinese": [
		"Kung Pao Chicken", "Sweet and Sour Pork", "Peking Duck", "Dim Sum",
		"Mapo Tofu", "Chow Mein", "Spring Rolls", "Hot Pot",
		"Wonton Soup", "Char Siu", "Yangzhou Fried Rice", "Xiaolongbao",
		"Dan Dan Noodles", "Ma Po Tofu", "Hainan Chicken Rice", "Egg Tart",
		"Zongzi", "Mooncake", "Sesame Balls", "Baozi"
	],
	"Continental": [
		"Beef Wellington", "Chicken Kiev", "Salad Niçoise", "Ratatouille",
		"Beef Bourguignon", "French Onion Soup", "Caesar Salad", "Eggs Benedict",
		"Quiche Lorraine", "Roast Chicken", "Steak Tartare", "Pancakes",
		"Waffles", "Crepes", "Macarons", "Croissant",
		"Baguette", "Truffle Pasta", "Fondue", "Escargot"
	],
	"Ethiopian": [
		"Doro Wat", "Injera", "Tibs", "Shiro Wat",
		"Kitfo", "Misir Wat", "Kik Alicha", "Gomen",
		"Ayib", "Atkilt Wot", "Awaze Tibs", "Fasolia",
		"Dinich Wot", "Beso", "Chechebsa", "Fatira",
		"Genfo", "Kitcha", "Dulet", "Firfir"
	],
	"French": [
		"Coq au Vin", "Bouillabaisse", "Cassoulet", "Duck Confit",
		"Soufflé", "Mille-feuille", "Profiteroles", "Tarte Tatin",
		"Crème Brûlée", "Madeleines", "Croque Monsieur", "Gougères",
		"Pissaladière", "Tapenade", "Salade Lyonnaise", "Pot-au-Feu",
		"Navarin d'Agneau", "Blanquette de Veau", "Poulet basquaise", "Bœuf bourguignon"
	],
	"Greek": [
		"Moussaka", "Souvlaki", "Tzatziki", "Spanakopita",
		"Gyros", "Feta Cheese Salad", "Baklava", "Dolmades",
		"Pastitsio", "Fasolada", "Keftedes", "Melitzanosalata",
		"Taramasalata", "Koulouri", "Loukoumades", "Galaktoboureko",
		"Kataifi", "Ravani", "Halvas", "Karidopita"
	],
	"Indian": [
		"Butter Chicken", "Chicken Tikka Masala", "Chana Masala", "Palak Paneer",
		"Samosa", "Naan", "Biryani", "Dal Makhani",
		"Rogan Josh", "Vindaloo", "Aloo Gobi", "Malai Kofta",
		"Tandoori Chicken", "Masala Dosa", "Idli", "Vada Pav",
		"Pav Bhaji", "Pani Puri", "Gulab Jamun", "Rasgulla"
	],
	"Italian": [
		"Margherita Pizza", "Spaghetti Carbonara", "Lasagna", "Risotto",
		"Ossobuco", "Tiramisu", "Gelato", "Focaccia",
		"Panna Cotta", "Ravioli", "Minestrone", "Caprese Salad",
		"Bruschetta", "Cannoli", "Polenta", "Gnocchi",
		"Prosciutto e Melone", "Arancini", "Ribollita", "Saltimbocca"
	],
	"Japanese": [
		"Sushi", "Ramen", "Tempura", "Sashimi",
		"Udon", "Soba", "Tonkatsu", "Yakitori",
		"Okonomiyaki", "Takoyaki", "Matcha Ice Cream", "Mochi",
		"Dorayaki", "Sukiyaki", "Shabu Shabu", "Katsu Curry",
		"Gyoza", "Onigiri", "Miso Soup", "Edamame"
	],
	"Korean": [
		"Bibimbap", "Kimchi", "Bulgogi", "Japchae",
		"Tteokbokki", "Samgyeopsal", "Kimchi Jjigae", "Doenjang Jjigae",
		"Kimbap", "Haemul Pajeon", "Galbijjim", "Gochujang",
		"Bingsu", "Hotteok", "Odeng", "Sundae",
		"Dakgangjeong", "Naengmyeon", "Mandu", "Bossam"
	],
	"Lebanese": [
		"Hummus", "Tabbouleh", "Baba Ghanoush", "Falafel",
		"Shawarma", "Kibbeh", "Fattoush", "Manakish",
		"Warak Enab", "Kafta", "Mujadara", "Labneh",
		"Arayes", "Sfeeha", "Baklava", "Knafeh",
		"Maamoul", "Sfouf", "Namoura", "Atayef"
	],
	"Mexican": [
		"Tacos", "Enchiladas", "Guacamole", "Churros",
		"Quesadillas", "Fajitas", "Burritos", "Tamales",
		"Pozole", "Chiles Rellenos", "Ceviche", "Flan",
		"Tres Leches Cake", "Elote", "Pico de Gallo", "Salsa",
		"Nachos", "Tostadas", "Gorditas", "Sopes"
	],
	"Moroccan": [
		"Tagine", "Couscous", "Harira", "Pastilla",
		"Zaalouk", "Bissara", "Makouda", "Rfissa",
		"Briouat", "Chebakia", "Mint Tea", "Baghrir",
		"Msemen", "Sfenj", "Ghriba", "Khobz",
		"Chermoula", "Mechoui", "Tanjia", "Harissa"
	],
	"Peruvian": [
		"Ceviche", "Lomo Saltado", "Aji de Gallina", "Anticuchos",
		"Papa a la Huancaina", "Rocoto Relleno", "Causa", "Pollo a la Brasa",
		"Tacu Tacu", "Aguadito de Pollo", "Chufo", "Picarones",
		"Alfajores", "Suspiro a la Limena", "Mazamorra Morada", "Chicha Morada",
		"Pisco Sour", "Pachamanca", "Chupe de Camarones", "Seco de Carne"
	],
	"Spanish": [
		"Paella", "Tapas", "Tortilla Española", "Gazpacho",
		"Churros", "Patatas Bravas", "Jamón Ibérico", "Croquetas",
		"Pulpo a la Gallega", "Pimientos de Padrón", "Fabada Asturiana", "Crema Catalana",
		"Turrón", "Polvorones", "Ensaimada", "Bocadillo de Calamares",
		"Salmorejo", "Gambas al Ajillo", "Pan amb Tomàquet", "Cochinillo Asado"
	],
	"Thai": [
		"Pad Thai", "Tom Yum Goong", "Green Curry", "Som Tum",
		"Mango Sticky Rice", "Massaman Curry", "Panang Curry", "Tom Kha Gai",
		"Khao Pad", "Pad Krapow Moo Saap", "Gai Med Ma Moung", "Khao Soi",
		"Tod Mun Pla", "Yam Nua", "Larb", "Moo Satay",
		"Guay Teow", "Kuay Tiew Reua", "Hoy Tod", "Khao Niew Ma Muang"
	],
	"Turkish": [
		"Kebab", "Baklava", "Turkish Delight", "Meze",
		"Lahmacun", "Pide", "Manti", "Borek",
		"Imam Bayildi", "Doner Kebab", "Simit", "Ayran",
		"Gozleme", "Iskender Kebab", "Kumpir", "Lokum",
		"Tulumba", "Sütlaç", "Kunefe", "Kofte"
	],
	"Vietnamese": [
		"Pho", "Banh Mi", "Goi Cuon", "Bun Cha",
		"Banh Xeo", "Cao Lau", "Mi Quang", "Com Tam",
		"Bun Bo Hue", "Chao", "Banh Cuon", "Banh Bot Loc",
		"Che", "Ca Phe Sua Da", "Nuoc Mam", "Cha Gio",
		"Hu Tieu", "Bun Thit Nuong", "Goi Ngo Sen", "Banh Bao"
	]
}

def to_slug(name):
    # Very rudimentary slugify
    slug = name.lower()
    for c in [" ", "'", "\"", "(", ")", ","]:
        slug = slug.replace(c, "-")
    for c, r in zip("áéíóúãñçö", "aeiouancö"):
        slug = slug.replace(c, r)
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")

dishes = []
for cuisine, dish_list in cuisines.items():
    for dish_name in dish_list:
        description = f"A classic {cuisine} specialty deeply rooted in cultural tradition. {dish_name} is known for its remarkable flavors, authentic presentation, and widespread popularity."
        ingredients = [
            f"Primary {dish_name} base ingredients",
            "A mix of authentic regional spices",
            "Fresh garnish and herbs",
            "Quality cooking oil or fat",
            "A dash of secret seasoning"
        ]
        instructions = [
            "Prepare all the fresh ingredients, washing and cutting as needed.",
            f"Heat up the cooking vessel and introduce the base elements of {dish_name}.",
            "Incorporate spices and seasonings gradually, allowing the flavors to meld together beautifully.",
            "Cook until the desired texture and temperature are reached, monitoring closely to ensure perfection.",
            "Plate carefully and garnish just before serving hot. Enjoy your authentic global creation!"
        ]
        dishes.append({
            "name": dish_name,
            "slug": f"{cuisine.lower()}-{to_slug(dish_name)}",
            "cuisine": cuisine,
            "description": description,
            "ingredients": ingredients,
            "instructions": instructions
        })

with open("seed_data.json", "w", encoding="utf-8") as f:
    json.dump(dishes, f, ensure_ascii=False, indent=2)

print(f"Generated {len(dishes)} dishes.")
