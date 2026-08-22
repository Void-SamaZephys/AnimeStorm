print("--- Basit Hesap Makinesi ---")

sayi1 = float(input("Birinci sayıyı gir: "))
islem = input("İşlem seç (+, -, *, /): ")
sayi2 = float(input("İkinci sayıyı gir: "))

if islem == '+':
    print("Sonuç:", sayi1 + sayi2)
elif islem == '-':
    print("Sonuç:", sayi1 - sayi2)
elif islem == '*':
    print("Sonuç:", sayi1 * sayi2)
elif islem == '/':
    if sayi2 != 0:
        print("Sonuç:", sayi1 / sayi2)
    else:
        print("Hata: Sıfıra bölünemez!")
else:
    print("Geçersiz işlem!")

