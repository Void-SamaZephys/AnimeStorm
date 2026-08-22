dogru_sifre = 1234
hak = 3

while hak > 0:
    girilen = int(input("sifreyi yaz aga: "))

    if girilen == dogru_sifre:
        print("aferin lan")
        break
    else:
        hak - 1
        print("yanlis sifre velet kalan hakkın",hak)
if hak == 0:
	print("hakkin gitti velet inanmion mu bak al hakkin sayiyisi koca bir sifir gorcen ",hak)
