import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateTable() {
  console.log("Updating Mini Folding Table in SQLite database...");

  const data = {
    nameEn: "Mini Folding Table",
    nameAr: "ترابيزة الرحلات الصغيرة القابلة للطي",
    shortDescriptionEn:
      "The ultimate lifesaver for every outdoor adventure and barbecue. This compact and ultra-practical mini folding table is lightweight, effortless to fold, and takes virtually zero space in your car trunk or home storage.",
    shortDescriptionAr:
      "القطعة دي هي المنقذ في اي رحلة او خروجة شوي. ترابيزة صغيرة وعملية متصممة عشان تريحك وتنجزك، وزنها خفيف وبتتطبق بكل سهولة عشان ماتاخدش مكان خالص في عربيتك او في التخزين.",
    descriptionEn: `The ultimate lifesaver for every outdoor adventure and barbecue. This compact and ultra-practical mini folding table is lightweight, effortless to fold, and takes virtually zero space in your car trunk or home storage.

### Why You Need This Table (Key Features):

- **Dual-Purpose Versatility:** Use it as a handy side table to hold plates, cups, drinks, or grilling accessories—or use it as a sturdy, comfortable camp stool while cooking over the coals.
- **Strong & Stable X-Frame Architecture:** Engineered with high-strength metal tubing in an X-frame structure that distributes weight evenly for rock-solid stability with zero wobble.
- **Heavy-Duty Webbed Top:** The reinforced high-tension fabric strap surface is built for high weight resistance and long-lasting durability without sagging or fraying.
- **1-Second Instant Folding:** Incredibly quick and simple folding mechanism—just fold together flat in one swift motion with zero effort.
- **Non-Slip Protective Foot Pads:** Equipped with anti-skid floor caps that ensure a secure, steady grip on sand, grass, gravel, or smooth tiles.`,
    descriptionAr: `القطعة دي هي المنقذ في اي رحلة او خروجة شوي. ترابيزة صغيرة وعملية متصممة عشان تريحك وتنجزك، وزنها خفيف وبتتطبق بكل سهولة عشان ماتاخدش مكان خالص في عربيتك او في التخزين.

### ليه الترابيزة دي لازم تكون معاك؟ (المميزات بتاعتها):

- **بتاعة كله (استخدام مزدوج):** تقدر تستخدمها كترابيزة صغيرة تسند عليها اطباق او كوبايات او ادوات الشوي بتاعتك، وتنفع كمان كرسي مريح وعملي تقعد عليه وانت بتشوي.
- **هيكل قوي وثابت:** معمولة من مواسير معدن متينة بتصميم حرف اكس، التصميم ده بيوزع الحمل صح وبيديها ثبات عالي عشان ماتتهزش منك.
- **قماش متين يستحمل:** الجزء اللي فوق معمول من شرايط قماش قوية ومشدودة كويس عشان تستحمل الاستخدام المتكرر وتعيش معاك فترة طويلة من غير ما ترخي او تتقطع.
- **بتتلم وتتفرد في ثانية:** نظام الطي بتاعها سهل وبسيط خالص، بمجرد ما تضمها على بعض بتتقفل، ومش هتحتاج اي مجهود عشان تجهزها.
- **قواعد ضد الزحلقة:** الرجلين بتاعتها فيها قطع حماية من تحت عشان تثبت كويس على الارض وماتتزحلقش، سواء كنت على رمل او زرع او بلاط.`,
    pricePiasters: 30000,
    compareAtPricePiasters: 40000,
    materialEn: "Heavy-Duty Metal Tubular Frame + High-Tension Webbed Straps + Anti-Slip Caps",
    materialAr: "مواسير معدنية متينة مع شرايط قماش معززة عالية الشد وقواعد مانعة للانزلاق",
    foldedDimensions: "35 x 30 x 4 cm",
    openDimensions: "35 x 30 x 38 cm",
    weight: "1.2 kg",
    weightKg: 1.2,
    whatsIncludedEn: JSON.stringify([
      "Foldable Mini Camp Table / Stool with X-Frame Design",
      "Integrated Non-Slip Protective Base Caps",
    ]),
    whatsIncludedAr: JSON.stringify([
      "ترابيزة / كرسي رحلات صغيرة قابلة للطي بتصميم حرف X",
      "قواعد سفلية مدمجة مانعة للانزلاق",
    ]),
    specsEn: JSON.stringify({
      "Function": "Dual-Use (Campsite Side Table + Sturdy Seating Stool)",
      "Frame": "High-Strength Tubular Metal X-Frame Architecture",
      "Top Surface": "High-Tension Reinforced Webbed Straps (Sag-Resistant)",
      "Folding Speed": "Instant 1-second flat-fold mechanism",
      "Base Feet": "Anti-Skid Floor Protection Caps for Sand, Grass & Tile",
      "Origin": "Engineered & Manufactured in Cairo, Egypt",
    }),
    specsAr: JSON.stringify({
      "الاستخدام": "استخدام مزدوج (ترابيزة جانبية لحمل الأغراض + كرسي مقعد مريح)",
      "الهيكل": "مواسير معدنية متينة بتصميم حرف X عالي الثبات",
      "السطح": "شرايط قماش قوية ومشدودة عالية التحمل ومقاومة للارتخاء",
      "آلية الطي": "طي فوري سريع ومسطح بالكامل في ثانية واحدة",
      "القواعد": "قطع حماية سفلية مانعة للانزلاق على الرمل والزرع والبلاط",
      "بلد المنشأ": "تصنيع وهندسة في القاهرة، مصر",
    }),
  };

  const updated = await prisma.product.update({
    where: { slug: "foldable-side-table-stool" },
    data,
  });

  console.log("✔ Successfully updated table in database:", updated.nameAr, updated.pricePiasters);
}

updateTable()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
