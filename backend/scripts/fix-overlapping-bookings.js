// scripts/fix-overlapping-bookings.js
// Run: node scripts/fix-overlapping-bookings.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const isTimeOverlap = (start1, end1, start2, end2) => {
  const normalize = (time) => time.replace(".", ":");
  const s1 = normalize(start1);
  const e1 = normalize(end1);
  const s2 = normalize(start2);
  const e2 = normalize(end2);

  if (s1 >= s2 && s1 < e2) return true;
  if (e1 > s2 && e1 <= e2) return true;
  if (s1 <= s2 && e1 >= e2) return true;
  return false;
};

async function findOverlappingBookings() {
  console.log("🔍 Mencari peminjaman yang overlap...\n");

  const allPeminjaman = await prisma.peminjaman.findMany({
    where: {
      status_peminjaman: {
        in: ["Menunggu", "Review", "Disetujui"],
      },
    },
    include: {
      ruangan: {
        select: {
          nama_ruangan: true,
        },
      },
      users: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [{ tanggal_kegiatan: "asc" }, { jam_mulai: "asc" }],
  });

  const overlaps = [];

  // Group by tanggal dan ruangan
  const grouped = {};
  allPeminjaman.forEach((p) => {
    const dateKey = p.tanggal_kegiatan.toISOString().split("T")[0];
    const key = `${dateKey}-${p.ruangan_id}`;

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(p);
  });

  // Check overlaps within each group
  Object.entries(grouped).forEach(([key, bookings]) => {
    if (bookings.length < 2) return;

    for (let i = 0; i < bookings.length; i++) {
      for (let j = i + 1; j < bookings.length; j++) {
        const b1 = bookings[i];
        const b2 = bookings[j];

        if (
          isTimeOverlap(
            b1.jam_mulai,
            b1.jam_selesai,
            b2.jam_mulai,
            b2.jam_selesai
          )
        ) {
          overlaps.push({
            date: key.split("-").slice(0, 3).join("-"),
            ruangan: b1.ruangan.nama_ruangan,
            booking1: {
              id: b1.id.toString(),
              kegiatan: b1.nama_kegiatan,
              user: b1.users?.name,
              waktu: `${b1.jam_mulai} - ${b1.jam_selesai}`,
              status: b1.status_peminjaman,
              created: b1.created_at,
            },
            booking2: {
              id: b2.id.toString(),
              kegiatan: b2.nama_kegiatan,
              user: b2.users?.name,
              waktu: `${b2.jam_mulai} - ${b2.jam_selesai}`,
              status: b2.status_peminjaman,
              created: b2.created_at,
            },
          });
        }
      }
    }
  });

  return overlaps;
}

async function fixOverlappingBookings(overlaps) {
  console.log(`\n🔧 Ditemukan ${overlaps.length} overlap\n`);

  if (overlaps.length === 0) {
    console.log("✅ Tidak ada overlap ditemukan!");
    return;
  }

  console.log("📋 Detail Overlaps:\n");
  overlaps.forEach((overlap, idx) => {
    console.log(
      `${idx + 1}. Tanggal: ${overlap.date} | Ruangan: ${overlap.ruangan}`
    );
    console.log(`   Booking 1 (ID: ${overlap.booking1.id}):`);
    console.log(`   - Kegiatan: ${overlap.booking1.kegiatan}`);
    console.log(`   - User: ${overlap.booking1.user}`);
    console.log(`   - Waktu: ${overlap.booking1.waktu}`);
    console.log(`   - Status: ${overlap.booking1.status}`);
    console.log(`   - Created: ${overlap.booking1.created}`);
    console.log(`   Booking 2 (ID: ${overlap.booking2.id}):`);
    console.log(`   - Kegiatan: ${overlap.booking2.kegiatan}`);
    console.log(`   - User: ${overlap.booking2.user}`);
    console.log(`   - Waktu: ${overlap.booking2.waktu}`);
    console.log(`   - Status: ${overlap.booking2.status}`);
    console.log(`   - Created: ${overlap.booking2.created}`);
    console.log("");
  });

  console.log("\n⚠️  REKOMENDASI TINDAKAN:");
  console.log("1. Review manual setiap overlap");
  console.log("2. Hubungi user yang terlibat");
  console.log("3. Tentukan mana yang harus di-cancel:");
  console.log(
    "   - Pilih berdasarkan tanggal created (yang lebih baru di-cancel)"
  );
  console.log("   - Atau berdasarkan status (Menunggu di-cancel dulu)");
  console.log("4. Update status menjadi 'Ditolak' atau hapus peminjaman");

  console.log("\n💡 Contoh SQL untuk cancel booking tertentu:");
  console.log(
    `UPDATE peminjaman SET status_peminjaman = 'Ditolak', alasan_penolakan = 'Bentrok jadwal' WHERE id = <ID>;`
  );
}

async function main() {
  try {
    const overlaps = await findOverlappingBookings();
    await fixOverlappingBookings(overlaps);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
