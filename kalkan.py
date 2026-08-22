import socket

# Koruyacağımız kapıyı (portu) 9999 olarak belirliyoruz
PORT = 9999
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    server.bind(('0.0.0.0', PORT))
    server.listen(1)
    print(f"\n[🛡️ SİBER KALKAN AKTİF] {PORT} nolu kapı koruma altında! Saldırı bekleniyor...\n")
    
    while True:
        # Dışarıdan gelen bağlantıyı (ateş topunu) havada yakalıyoruz
        baglanti, adres = server.accept()
        print(f"[⚠️ DÜŞMAN TESPİT EDİLDİ!] {adres[0]} IP adresi kapıyı zorladı!")
        
        # Kapıyı hemen yüzüne kapatıyoruz!
        baglanti.close() 
except KeyboardInterrupt:
    print("\n[🛡️] Siber kalkan deaktif edildi. Güvenli çıkış yapıldı.")

