# 🪙 Gold Price API (Thailand) - REST API ราคาทองคำ

ระบบ API สำหรับดึงราคาทองคำแบบเรียลไทม์จากเว็บไซต์ [ราคาทองคำ.com](https://xn--42cah7d0cxcvbbb9x.com/)  
สร้างด้วย Node.js + Express + Cheerio พร้อมใช้งานและสามารถ Deploy ได้ทันทีบน Render

---

## 🌐 ตัวอย่างการใช้งาน (Live Demo)

🔗 [https://ชื่อ-apiของคุณ.onrender.com/gold-price](https://ชื่อ-apiของคุณ.onrender.com/gold-price)

> เปลี่ยนลิงก์เป็นของคุณเองหลังจาก Deploy

---

## 📦 Endpoint ที่เปิดให้ใช้

**GET `/gold-price`**  
ใช้เพื่อดึงข้อมูลราคาทองคำล่าสุดแบบ JSON

### ✅ ข้อมูลที่ได้รับ

- ราคาทองคำแท่ง: ซื้อ - ขาย
- ราคาทองรูปพรรณ: ซื้อ - ขาย
- การเปลี่ยนแปลงของราคา: เทียบกับรอบก่อนหน้า และเมื่อวาน
- วันที่และเวลาล่าสุดที่อัปเดตราคา

### 🧪 ตัวอย่าง Response:

```json
{
  "status": "success",
  "response": {
    "date": "19 เมษายน 2567",
    "update_time": "เวลา 09:30 น.",
    "price": {
      "gold": {
        "buy": "33,100",
        "sell": "34,200"
      },
      "gold_bar": {
        "buy": "33,600",
        "sell": "34,100"
      },
      "change": {
        "compare_previous": "+50",
        "compare_yesterday": "-100"
      }
    }
  }
}
