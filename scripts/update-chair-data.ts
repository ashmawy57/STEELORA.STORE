import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateChair() {
  console.log("Updating Folding Camping Chair in SQLite database...");

  const data = {
    nameEn: "Folding Camping Chair",
    nameAr: "كرسي رحلات قابل للطي",
    shortDescriptionEn:
      "Make relaxing by the grill or at the beach even more enjoyable. Comfortable, lightweight, and effortlessly foldable, this chair is designed to accompany you on any road trip, beach day, or balcony hangout without taking up space.",
    shortDescriptionAr:
      "عشان القعدة تحلى قدام الشواية او على البحر، الكرسي ده هو الحل. مريح، خفيف، وبيطبق معاك بسهولة عشان تاخده في اي رحلة او مصيف او حتى تحطه في البلكونة من غير ما ياخد مكان.",
    descriptionEn: `Make relaxing by the grill or at the beach even more enjoyable. Comfortable, lightweight, and effortlessly foldable, this chair is designed to accompany you on any road trip, beach day, or balcony hangout without taking up space.

### Why Choose This Chair? (Key Features):

- **Ergonomic Back Support:** Designed for long-lasting sitting comfort with a supportive backrest that lets you kick back and relax while grilling or enjoying the outdoors.
- **Lightweight & Portable:** Built with a durable metal frame that remains remarkably lightweight, allowing you to move and carry it anywhere without fatigue.
- **Quick 1-Second Flat Folding:** Folds down completely flat in seconds with a single smooth motion, storing easily in any car trunk or closet.
- **Heavy-Duty Reinforced Fabric:** Seat and backrest are crafted from tough, high-tension striped outdoor fabric built to support weight and resist wear while looking stylish.
- **Stable Anti-Skid Rubber Feet:** Base legs are equipped with protective rubber grip caps that prevent slipping and sliding on ceramic tiles, sand, or lawn grass.`,
    descriptionAr: `عشان القعدة تحلى قدام الشواية او على البحر، الكرسي ده هو الحل. مريح، خفيف، وبيطبق معاك بسهولة عشان تاخده في اي رحلة او مصيف او حتى تحطه في البلكونة من غير ما ياخد مكان.

### ليه الكرسي ده اختيار ممتاز؟ (المميزات بتاعته):

- **تصميم مريح للظهر:** الكرسي مصمم عشان يريحك في القعدة لفترات طويلة، وفيه مسند للظهر بيخليك قاعد مرتاح ومسترخي وانت بتشوي او بتستمتع بالجو.
- **خفيف وعملي في الشيل:** الهيكل بتاعه معدن متين بس وزنه خفيف في نفس الوقت، يعني تقدر تشيله وتحركه معاك في اي مكان من غير تعب.
- **سهل التخزين والطي:** بيتلم ويتطبق في ثواني بحركة واحدة، ولما بيتقفل بيبقى رفيع ومش بياخد اي مساحة في شنطة العربية او في البيت.
- **قماش قوي ومتين:** القاعدة والظهر معمولين من قماش مقلم متين ومشدود كويس، بيستحمل الوزن ويعيش معاك، وشكله شيك وعملي.
- **ثابت على الارض:** رجلين الكرسي متغطية بقطع كاوتش من تحت عشان تثبت كويس وماتتزحلقش بيك سواء كنت قاعد على سيراميك، رمل، او نجيل.`,
    materialEn: "Lightweight Durable Metal Frame + Heavy-Duty Striped High-Tension Fabric + Rubber Anti-Skid Feet",
    materialAr: "هيكل معدني متين خفيف الوزن + قماش مقلم قوي عالي التحمل + قواعد كاوتش مانعة للانزلاق",
    foldedDimensions: "75 x 48 x 5 cm",
    openDimensions: "48 x 45 x 78 cm (Seat Height: 42 cm)",
    weight: "2.1 kg",
    weightKg: 2.1,
    whatsIncludedEn: JSON.stringify([
      "Foldable Camping Chair with Ergonomic Backrest",
      "Integrated Non-Slip Protective Rubber Foot Caps",
    ]),
    whatsIncludedAr: JSON.stringify([
      "كرسي رحلات قابل للطي بمسند ظهر مريح",
      "قواعد كاوتش سفلية مانعة للانزلاق مدمجة",
    ]),
    specsEn: JSON.stringify({
      "Back Support": "Ergonomic angled backrest for extended relaxation",
      "Frame": "High-Strength Lightweight Metal Tubular Chassis",
      "Fabric": "Reinforced Striped Outdoor Fabric (Sag & Wear Resistant)",
      "Folding Speed": "Instant 1-second ultra-flat fold",
      "Feet Caps": "Heavy-Duty Anti-Skid Rubber Base Protection",
      "Origin": "Engineered & Manufactured in Cairo, Egypt",
    }),
    specsAr: JSON.stringify({
      "مسند الظهر": "تصميم مريح يدعم الظهر لفترات جلوس طويلة",
      "الهيكل": "هيكل معدني متين وفائق الخفة لسهولة الحمل",
      "القماش": "قماش مقلم مشدود عالي التحمل ومقاوم للتمزق",
      "آلية الطي": "طي مسطح فوري بحركة واحدة سريعة",
      "القواعد": "أغطية كاوتش مطاطية مانعة للانزلاق على مختلف الأسطح",
      "بلد المنشأ": "تصنيع وهندسة في القاهرة، مصر",
    }),
  };

  const updated = await prisma.product.update({
    where: { slug: "foldable-outdoor-chair" },
    data,
  });

  console.log("✔ Successfully updated chair in database:", updated.nameAr, updated.slug);
}

updateChair()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
